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
        <title>
          View Actions under {category}| {CMS_NAME}
        </title>
      </Head>

      <Container>
        <Header />
        <PostTitle>{category}</PostTitle>
        <section className="flex-col md:flex-row flex space-y-6 md:space-y-0 md:space-x-6 items-center md:justify-between mt-16 mb-16 md:mb-12">
          <ActionTable actions={actions} />
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const { actions } = await getActionsByCategory(params.category, preview);

  return {
    props: {
      preview,
      category: params.category,
      actions,
    },
  };
}

export async function getStaticPaths() {
  const { categories } = await getAllCategoryTitles();
  return {
    paths: categories?.map((category) => `/category/${category.slug}`) || [],
    fallback: true,
  };
}