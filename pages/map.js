import Container from "@/components/container";
import Layout from "@/components/layout";
import { getAllMarkers } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import Header from "@/components/header";
import PostTitle from "@/components/post-title";
import "mapbox-gl/dist/mapbox-gl.css";
import cookies from "next-cookies";
import Map from "@/components/map";

export default function Index({ markers, MAPBOX_TOKEN }) {
  return (
    <Layout>
      <Head>
        <title>View Actions on the Map | {CMS_NAME}</title>
      </Head>

      <Container>
        <Header />
        <PostTitle>Map</PostTitle>
        <Map markers={markers} token={MAPBOX_TOKEN} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ res, ...ctx }) {
  const { jwt } = cookies(ctx);
  try {
    const { actions } = (await getAllMarkers(jwt)) || [];
    const features = actions.map((action) => action.geojson);
    return {
      props: {
        markers: { type: "FeatureCollection", features },
        MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
