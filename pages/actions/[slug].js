import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import MoreStories from "@/components/more-stories";
import Header from "@/components/header";
import PostHeader from "@/components/post-header";
import SectionSeparator from "@/components/section-separator";
import Layout from "@/components/layout";
import { getActionAndMoreActions } from "@/lib/api";
import PostTitle from "@/components/post-title";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import PostImage from "@/components/post-image";
import { CategoryTag, CompletedTag, PendingTag } from "@/components/tags";
import cookies from "next-cookies";

export default function Post({ action, moreActions, preview }) {
  const router = useRouter();
  if (!router.isFallback && !action?.slug) {
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
                  {action.title} | {CMS_NAME}
                </title>
                <meta property="og:image" content={action.ogImage?.url} />
              </Head>
              <PostHeader
                title={action.title}
                neighborhood={action.neighborhood.name}
                location={action.location}
              />
              <PostImage imageUrl={action.cover?.url} title="" />
              <PostBody content={action.content} />
              <section>
                {action.year && (
                  <>
                    <h3 className="pt-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </h3>
                    <div>{action.year}</div>
                  </>
                )}
                <h3 className="pt-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </h3>
                <div>
                  {action.completed ? <CompletedTag /> : <PendingTag />}
                </div>
                {action.date && (
                  <>
                    <h3 className="pt-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Completed
                    </h3>
                    <div>{action.date}</div>
                  </>
                )}
                <h3 className="pt-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categories
                </h3>
                <div>
                  {action.categories.map((category) => (
                    <CategoryTag>{category.title}</CategoryTag>
                  ))}
                </div>
              </section>
            </article>
            <SectionSeparator />
            {moreActions.length > 0 && <MoreStories actions={moreActions} />}
          </>
        )}
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
    const data = await getActionAndMoreActions(jwt, params.slug, preview);
    const content = await markdownToHtml(data?.actions[0]?.description || "");

    return {
      props: {
        preview,
        action: {
          ...data?.actions[0],
          content,
        },
        moreActions: data?.moreActions,
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
