import Container from "@/components/container";
import Layout from "@/components/layout";
import { getAllVacationTitles } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import Header from "@/components/header";
import PostTitle from "@/components/post-title";
import CoverImage from "@/components/cover-image";
import SectionGrid from "@/components/section-grid";
import cookies from "next-cookies";

export default function Index({ vacations, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>Vacations| {CMS_NAME}</title>
      </Head>
      <Container>
        <Header />
        <PostTitle>Vacations.</PostTitle>
        <SectionGrid>
          {vacations.map((vacation) => (
            <CoverImage
              imageUrl={vacation.cover.url}
              href={`vacations/[vacation]`}
              as={`vacations/${vacation.slug}`}
              title={vacation.title}
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
    const { vacations } = (await getAllVacationTitles(jwt)) || [];
    return {
      props: { vacations },
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
