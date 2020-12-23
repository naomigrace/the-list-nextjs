import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import MoreStories from "@/components/more-stories";
import Header from "@/components/header";
import PostHeader from "@/components/post-header";
import SectionSeparator from "@/components/section-separator";
import Layout from "@/components/layout";
import { getVacationAndMoreVacations } from "@/lib/api";
import PostTitle from "@/components/post-title";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import PostImage from "@/components/post-image";
import { CategoryTag, CompletedTag, PendingTag } from "@/components/tags";

export default function Vacation({ vacation, moreVacations, preview }) {
  const router = useRouter();
  if (!router.isFallback && !vacation?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {vacation.title} | {CMS_NAME}
                </title>
                <meta property="og:image" content={vacation.ogImage.url} />
              </Head>
              <PostHeader title={vacation.title} location={vacation.location} />
              <PostImage imageUrl={vacation.cover.url} title="" />
              <PostBody content={vacation.content} />
              <section>
                {vacation.location && (
                  <>
                    <h3 className="pt-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </h3>
                    <div>{vacation.location}</div>
                  </>
                )}
                <h3 className="pt-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </h3>
                <div>
                  {vacation.completed ? <CompletedTag /> : <PendingTag />}
                </div>
                {vacation.start && (
                  <>
                    <h3 className="pt-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Begin
                    </h3>
                    <div>{vacation.start}</div>
                    <h3 className="pt-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End
                    </h3>
                    <div>{vacation.end}</div>
                  </>
                )}
              </section>
            </article>
            <SectionSeparator />
            {/* {moreVacations.length > 0 && (
              <MoreStories vacations={moreVacations} />
            )} */}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ params, preview = null }) {
  const data = await getVacationAndMoreVacations(params.slug, preview);
  const content = await markdownToHtml(data?.vacations[0]?.description || "");

  return {
    props: {
      preview,
      vacation: {
        ...data?.vacations[0],
        content,
      },
      moreVacations: data?.moreVacations,
    },
  };
}
