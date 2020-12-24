import Container from "@/components/container";
import Intro from "@/components/intro";
import Layout from "@/components/layout";
import { getAllActions, getHomepageImages } from "@/lib/api";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import CoverImage from "@/components/cover-image";
import SectionGrid from "@/components/section-grid";
import cookies from "next-cookies";

export default function Index({ allActions, images, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>

      <Container>
        <Intro />
        <SectionGrid>
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
          <CoverImage
            title="Vacations"
            imageUrl={images.vacations}
            href="/vacations"
            from="from-blue-600"
            via=""
            to="to-teal-500"
          />
        </SectionGrid>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ preview = null, res, ...ctx }) {
  const { jwt } = cookies(ctx);

  try {
    const { actions } = (await getAllActions(jwt)) || [];
    const { homepage } = (await getHomepageImages(jwt)) || [];
    return {
      props: {
        allActions: actions,
        images: {
          category: homepage.category.formats.small.url,
          neighborhood: homepage.neighborhood.formats.small.url,
          map: homepage.map.formats.small.url,
          vacations: homepage.vacations.formats.small.url,
        },
        preview,
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
