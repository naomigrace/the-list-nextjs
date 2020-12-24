import Container from "@/components/container";
import Layout from "@/components/layout";
import { getActionsByNeighborhood, getAllNeighborhoodNames } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import ActionTable from "@/components/action-table";
import Header from "@/components/header";
import PostTitle from "@/components/post-title";
import cookies from "next-cookies";
import CoverImage from "@/components/cover-image";
import SectionGrid from "@/components/section-grid";
import SlugTemplate from "@/components/SlugTemplate";

export default function NeighborhoodInnerSlug({
  neighborhood,
  actions,
  preview,
  markers,
  MAPBOX_TOKEN,
}) {
  return (
    <SlugTemplate
      preview={preview}
      actions={actions}
      type="neighborhood"
      whichType={neighborhood}
      markers={markers}
      token={MAPBOX_TOKEN}
    />
  );
}

export async function getServerSideProps({
  params,
  preview = null,
  res,
  ...ctx
}) {
  const { jwt } = cookies(ctx);
  try {
    const { actions } = await getActionsByNeighborhood(
      jwt,
      params.neighborhood,
      preview
    );
    const features = actions.map((action) => action.geojson);

    return {
      props: {
        preview,
        neighborhood: params.neighborhood,
        actions,
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
