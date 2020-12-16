import Container from "@/components/container";
import Layout from "@/components/layout";
import { getAllCategoryTitles } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import Header from "@/components/header";
import PostTitle from "@/components/post-title";
import CoverImage from "@/components/cover-image";

export default function Index({ categories, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>View Actions by Categories | {CMS_NAME}</title>
      </Head>
      <Container>
        <Header />
        <PostTitle>Categories.</PostTitle>
        <section className="flex-col md:flex-row flex space-y-6 md:space-y-0 md:space-x-6 items-center md:justify-between mt-16 mb-16 md:mb-12">
          {categories.map((category) => (
            <CoverImage
              imageUrl={category.cover.url}
              href={`category/[category]`}
              as={`category/${category.slug}`}
              title={category.title}
            />
          ))}
        </section>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { categories } = (await getAllCategoryTitles()) || [];
  return {
    props: { categories },
  };
}
