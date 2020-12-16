import Container from "@/components/container";
import Layout from "@/components/layout";
import { getActionsByCategory, getAllCategoryTitles } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import ActionTable from "@/components/action-table";
import Header from "@/components/header";
import PostTitle from "@/components/post-title";

export default function Index({ category, actions, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>View Actions on the Map | {CMS_NAME}</title>
      </Head>

      <Container>
        <Header />
        <PostTitle>Map</PostTitle>
        <p>Coming soon.</p>
      </Container>
    </Layout>
  );
}
