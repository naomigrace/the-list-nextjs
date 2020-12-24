import Container from "@/components/container";
import Layout from "@/components/layout";
import { getAllNeighborhoodNames } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import ColorLink from "@/components/color-link";
import Header from "@/components/header";
import PostTitle from "@/components/post-title";
import cookies from "next-cookies";

export default function Index({ neighborhoods, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>View Actions by Neighborhood | {CMS_NAME}</title>
      </Head>
      <Container>
        <Header />
        <PostTitle>Neighborhoods.</PostTitle>
        <section className="flex flex-wrap  items-center md:justify-between mt-16 mb-16 md:mb-12">
          {neighborhoods.map((n) => (
            <ColorLink
              key={n.name}
              href={`neighborhood/[neighborhood]`}
              as={`neighborhood/${n.slug}`}
              title={n.name}
            />
          ))}
        </section>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ res, ...ctx }) {
  const { jwt } = cookies(ctx);
  try {
    const { neighborhoods } = (await getAllNeighborhoodNames(jwt)) || [];
    return {
      props: { neighborhoods },
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
