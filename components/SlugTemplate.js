import { CATEGORY_COLORS_TAILWIND, CMS_NAME } from "@/lib/constants";
import Head from "next/head";
import React from "react";
import ActionTable from "./action-table";
import Container from "./container";
import CoverImage from "./cover-image";
import Header from "./header";
import Layout from "./layout";
import Map from "./map";
import PostTitle from "./post-title";
import SectionGrid from "./section-grid";
import SectionTable from "./section-table";

export default function SlugTemplate({
  preview,
  type,
  whichType,
  actions,
  markers,
  token,
}) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>
          View {type} under {whichType}| {CMS_NAME}
        </title>
      </Head>

      <Container>
        <Header />

        <PostTitle>{whichType}</PostTitle>
        <div className="sticky top-0 py-2 -mt-6 mb-4 z-10 flex gap-x-4 tracking-widest w-full text-gray-400">
          {whichType}
          <a href="#covers" className="font-bold ml-3 mr-3">
            covers
          </a>
          <a href="#table" className="font-bold hidden md:block  mr-3">
            table
          </a>
          <a href="#map" className="font-bold  mr-3">
            map
          </a>
        </div>

        <h1
          id="covers"
          className="text-2xl font-bold tracking-widest pt-20 pb-10"
        >
          covers
        </h1>
        <SectionGrid>
          {actions.map((action) => (
            <CoverImage
              imageUrl={action.cover?.url}
              href={`/actions/[slug]`}
              as={`/actions/${action.slug}`}
              title={action.title}
              color={
                type === "category"
                  ? `bg-${CATEGORY_COLORS_TAILWIND[whichType]}`
                  : `bg-black`
              }
            />
          ))}
        </SectionGrid>

        <h1
          id="table"
          className="hidden md:block text-2xl font-bold tracking-widest pt-20 pb-10"
        >
          table
        </h1>
        <SectionTable>
          <ActionTable actions={actions} />
        </SectionTable>

        <h1 id="map" className="text-2xl font-bold tracking-widest pt-20 pb-10">
          map
        </h1>
        <Map markers={markers} token={token} />
      </Container>
    </Layout>
  );
}
