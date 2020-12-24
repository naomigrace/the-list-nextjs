import Container from "@/components/container";
import Layout from "@/components/layout";
import { getAllCategoryTitles } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import Header from "@/components/header";
import PostTitle from "@/components/post-title";
import CoverImage from "@/components/cover-image";
import SectionGrid from "@/components/section-grid";
import cookies from "next-cookies";

export default function Index({ categories, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>View Actions by Categories | {CMS_NAME}</title>
      </Head>
      <Container>
        <Header />
        <PostTitle>Categories.</PostTitle>
        <SectionGrid>
          {categories.map((category) => (
            <CoverImage
              imageUrl={category.cover.url}
              href={`/category/[category]`}
              as={`/category/${category.slug}`}
              title={category.title}
            />
          ))}
        </SectionGrid>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ res, ...ctx }) {
  const { jwt } = cookies(ctx);
  try {
    const { categories } = (await getAllCategoryTitles(jwt)) || [];
    return {
      props: { categories },
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
