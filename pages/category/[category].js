import { getActionsByCategory } from "@/lib/api";
import cookies from "next-cookies";
import SlugTemplate from "@/components/SlugTemplate";

export default function CategoryInnerSlug({
  category,
  actions,
  markers,
  preview,
  MAPBOX_TOKEN,
}) {
  return (
    <SlugTemplate
      preview={preview}
      actions={actions}
      type="category"
      whichType={category}
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
  const { actions } = await getActionsByCategory(jwt, params.category, preview);
  const features = actions.map((action) => action.geojson);

  try {
    return {
      props: {
        preview,
        category: params.category,
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
