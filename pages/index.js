import Container from "@/components/container";
import Intro from "@/components/intro";
import Layout from "@/components/layout";
import { getAllActions } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import CoverImage from "@/components/cover-image";
import ActionTable from "@/components/action-table";

export default function Index({ allActions, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>

      <Container>
        <Intro />
        <h2 className="text-xl font-bold uppercase mb-4 mt-16">ACTIONS BY</h2>

        <section className="flex-col md:flex-row flex space-y-6 md:space-y-0 md:space-x-6 items-center md:justify-between  mb-16 md:mb-12">
          <CoverImage
            title="Category"
            imageUrl="byCategory.jpg"
            href="/category"
            from="from-pink-600"
            via=""
            to="to-red-600"
          />
          <CoverImage
            title="Neighborhood"
            imageUrl="byNeighborhood.jpg"
            href="/neighborhood"
            from="from-purple-600"
            via=""
            to="to-indigo-600"
          />
          <CoverImage
            title="Map"
            imageUrl="byMap.jpg"
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
  return {
    props: { allActions: actions, preview },
  };
}
