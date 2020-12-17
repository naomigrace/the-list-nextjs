import Container from "@/components/container";
import Intro from "@/components/intro";
import Layout from "@/components/layout";
import { getAllActions, getHomepageImages } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import CoverImage from "@/components/cover-image";
import ActionTable from "@/components/action-table";

export default function Index({ allActions, images, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>

      <Container>
        <Intro />
        <h2 className="text-xl font-bold uppercase mb-4 mt-16">ACTIONS BY</h2>

        <section className="grid gap-4 grid-cols-3 mb-16 md:mb-12">
          <CoverImage
            title="Category"
            imageUrl={images.category}
            href="/category"
            from="from-pink-600"
            via=""
            to="to-red-600"
          />
          <CoverImage
            title="Neighborhood"
            imageUrl={images.neighborhood}
            href="/neighborhood"
            from="from-purple-600"
            via=""
            to="to-indigo-600"
          />
          <CoverImage
            title="Map"
            imageUrl={images.map}
            href="/map"
            from="from-blue-600"
            via=""
            to="to-teal-500"
          />
        </section>

        <h2 className="text-xl font-bold uppercase mb-5">All Actions</h2>
        <section>
          <ActionTable actions={allActions} />
        </section>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ preview = null }) {
  const { actions } = (await getAllActions(preview)) || [];
  const { homepage } = (await getHomepageImages()) || [];
  return {
    props: {
      allActions: actions,
      images: {
        category: homepage.category.formats.small.url,
        neighborhood: homepage.neighborhood.formats.small.url,
        map: homepage.map.formats.small.url,
      },
      preview,
    },
  };
}
