import { useState } from "react";
import Container from "@/components/container";
import Layout from "@/components/layout";
import { getAllActions } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import Header from "@/components/header";
import PostTitle from "@/components/post-title";
import MapGL, { Layer, Popup, Source } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import actionsToGeoJson from "@/lib/actionsToGeoJson";
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
          mapStyle="mapbox://styles/naomigracep/ckis6j99z0nm519p3ekfv34io"
          accessToken={MAPBOX_TOKEN}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          onViewportChange={setViewport}
        >
          <Source
            id="actions"
            type="geojson"
            data={{ type: "FeatureCollection", features: markers }}
          />
          <Layer
            id="points"
            type="circle"
            source="actions"
            paint={{
              "circle-radius": 20,
              "circle-color": "#000000",
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
        </MapGL>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { actions } = (await getAllActions()) || [];

  const markers =
    (await actionsToGeoJson(actions, process.env.GOOGLE_API_KEY)) || [];

  return {
    props: {
      markers,
      MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    },
  };
}
