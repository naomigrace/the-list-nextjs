import React, { useState } from "react";
import Container from "@/components/container";
import Layout from "@/components/layout";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";
import Header from "@/components/header";
import PostTitle from "@/components/post-title";
import cookies from "next-cookies";
import {
  getAllCategoryTitles,
  getAllNeighborhoodNames,
  createAction,
} from "@/lib/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function NewAction({ jwt, neighborhoods, categories }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const dataWithoutEmptyValues = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v != "")
      );
      dataWithoutEmptyValues["completed"] =
        dataWithoutEmptyValues["completed"] === "true" ? true : false;
      const success = await createAction(jwt, dataWithoutEmptyValues);
      console.log(success);
      if (success && success.createAction && success.createAction.action.id) {
        alert("Action created successfully.");
        router.push("/");
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Layout>
      <Head>
        <title>Add New Action | {CMS_NAME}</title>
      </Head>
      <Container>
        <Header />
        <PostTitle>New Action</PostTitle>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-2 mt-6">
            <label>Title *</label>
            <input
              name="title"
              type="text"
              className="border-2 rounded-xl lg:w-96"
              ref={register({ required: true })}
            />
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <label>Date</label>
            <input
              name="date"
              type="date"
              className="border-2 rounded-xl lg:w-96"
              ref={register}
            />
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <label>Categories</label>
            <select
              name="categories"
              className="border-2 rounded-xl lg:w-96"
              multiple
              ref={register({ required: true })}
            >
              {categories.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <label>Location (address)</label>
            <input
              name="location"
              type="text"
              className="border-2 rounded-xl lg:w-96"
              ref={register}
            />
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <label>Neighborhood</label>
            <select
              name="neighborhood"
              className="border-2 rounded-xl lg:w-96"
              ref={register}
            >
              {neighborhoods.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-y-2 mt-6  ">
            <label>Description</label>
            <textarea
              name="description"
              className="border-2 rounded-xl lg:w-96"
              rows="3"
              ref={register}
            />
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <label>Completed</label>
            <select
              name="completed"
              className="border-2 rounded-xl lg:w-96"
              ref={register}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-6 px-6 py-4 text-xl bg-gray-900 text-white rounded-xl"
          >
            {loading ? "Adding..." : "Add New Action"}
          </button>
        </form>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ res, ...ctx }) {
  const { jwt } = cookies(ctx);
  try {
    const { neighborhoods } = (await getAllNeighborhoodNames(jwt)) || [];
    const { categories } = (await getAllCategoryTitles(jwt)) || [];

    return {
      props: { neighborhoods, categories, jwt },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
