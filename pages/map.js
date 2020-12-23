import { useState } from "react";
import Container from "@/components/container";
import Layout from "@/components/layout";
import { getAllMarkers } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import Header from "@/components/header";
import PostTitle from "@/components/post-title";
import MapGL, {
  FullscreenControl,
  Layer,
  Popup,
  Source,
} from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/router";

export default function Index({ markers, MAPBOX_TOKEN }) {
  const [viewport, setViewport] = useState({
    latitude: 38.889,
    longitude: -77.005,
    zoom: 12,
  });
  const [popupFeature, setPopupFeature] = useState(null);
  const [popupCoordinates, setPopupCoordinates] = useState(null);

  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>View Actions on the Map | {CMS_NAME}</title>
      </Head>

      <Container>
        <Header />
        <PostTitle>Map</PostTitle>

        <MapGL
          className="rounded-md"
          style={{ width: "100%", height: "600px" }}
          mapStyle="mapbox://styles/naomigracep/ckj15avud1i1u19o19fjvdp14"
          accessToken={MAPBOX_TOKEN}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          onViewportChange={setViewport}
        >
          <Source id="actions" type="geojson" data={markers} />
          <Layer
            id="points"
            type="circle"
            source="actions"
            paint={{
              "circle-radius": 20,
              "circle-opacity": 0.75,
              "circle-color": [
                "match",
                ["get", "category"],
                "restaurants-and-bars",
                "#7C3AED",
                "speakeasies",
                "#2563EB",
                "activities",
                "#10B981",
                "coffee-shops",
                "#F59E0B",
                "museums",
                "#EC4899",
                "#000",
              ],
            }}
            onHover={(event) => {
              setPopupCoordinates(event.lngLat);
              setPopupFeature(event.features[0].properties);
            }}
            onLeave={() => {
              setPopupCoordinates(null);
              setPopupFeature(null);
            }}
            onClick={() => {
              if (popupFeature) {
                router
                  .push(`actions/[slug]`, `actions/${popupFeature.slug}`)
                  .then(() => window.scrollTo(0, 0));
              }
            }}
          />
          {popupCoordinates && popupFeature && (
            <Popup
              longitude={popupCoordinates.lng}
              latitude={popupCoordinates.lat}
              closeButton={false}
              closeOnClick={true}
            >
              <p className="font-bold text-lg">{popupFeature.title}</p>
            </Popup>
          )}
          <FullscreenControl position="top-right" />
        </MapGL>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { actions } = (await getAllMarkers()) || [];
  const features = actions.map((action) => action.geojson);
  console.log(features);
  return {
    props: {
      markers: { type: "FeatureCollection", features },
      MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    },
  };
}
