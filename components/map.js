import { useRouter } from "next/router";
import React, { useState } from "react";
import MapGL, {
  FullscreenControl,
  Layer,
  Popup,
  Source,
} from "@urbica/react-map-gl";

export default function Map({ token, markers }) {
  const [viewport, setViewport] = useState({
    latitude: 38.889,
    longitude: -77.005,
    zoom: 11,
  });
  const [popupFeature, setPopupFeature] = useState(null);
  const [popupCoordinates, setPopupCoordinates] = useState(null);

  const router = useRouter();

  return (
    <MapGL
      className="rounded-md"
      style={{ width: "100%", height: "600px" }}
      mapStyle="mapbox://styles/naomigracep/ckj15avud1i1u19o19fjvdp14"
      accessToken={token}
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
              .push(`/actions/[slug]`, `/actions/${popupFeature.slug}`)
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
  );
}
