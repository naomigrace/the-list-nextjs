import Container from "@/components/container";
import Layout from "@/components/layout";
import { getActionsByNeighborhood, getAllNeighborhoodNames } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import ActionTable from "@/components/action-table";
import Header from "@/components/header";
import PostTitle from "@/components/post-title";
import cookies from "next-cookies";

export default function Index({ neighborhood, actions, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>
          View Actions under {neighborhood}| {CMS_NAME}
        </title>
      </Head>

      <Container>
        <Header />
        <PostTitle>{neighborhood}</PostTitle>
        <section className="flex-col md:flex-row flex space-y-6 md:space-y-0 md:space-x-6 items-center md:justify-between mt-16 mb-16 md:mb-12">
          <ActionTable actions={actions} />
        </section>
      </Container>
    </Layout>
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

    return {
      props: {
        preview,
        neighborhood: params.neighborhood,
        actions,
      },
    };
  } catch (e) {
    console.log("ERROR", e);
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return {
    props: {},
  };
}
