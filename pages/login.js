import React, { useContext, useState } from "react";
import Container from "@/components/container";
import Header from "@/components/header";
import Layout from "@/components/layout";
import Head from "next/head";
import UserContext from "@/lib/context";
import { handleLoginSubmit } from "@/lib/auth";
import { useRouter } from "next/router";

export default function Login({}) {
  const router = useRouter();
  const [whichUser, setWhichUser] = useState("");
  const [pass, setPass] = useState("");
  const { setUsername } = useContext(UserContext);

  return (
    <Layout className="bg-gray-100">
      <Head>
        <title>Login</title>
      </Head>

      <Container>
        <Header />
        <div className="max-w-md w-full py-12 px-6 mx-auto">
          <h1 className="mb-2 text-center font-bold text-3xl">Login</h1>
          <p className="mb-6 text-center text-gray-900">Hello there!</p>
          <div className="flex gap-x-2 justify-center">
            <div
              onClick={() => setWhichUser("lambda")}
              className={`inline-block rounded-full ring-2 ring-gray-50 ${
                whichUser === "lambda"
                  ? "bg-gray-800 hover:bg-gray-900"
                  : "bg-purple-500 hover:bg-purple-600"
              } cursor-pointer p-4 text-white font-bold`}
            >
              NG
            </div>
            <div
              onClick={() => setWhichUser("function")}
              className={`inline-block rounded-full ring-2 ring-gray-50 ${
                whichUser === "function"
                  ? "bg-gray-800 hover:bg-gray-900"
                  : "bg-green-500 hover:bg-green-600"
              } cursor-pointer p-4 text-white font-bold`}
            >
              NR
            </div>
          </div>
          <form
            className="mt-5"
            onSubmit={(e) =>
              handleLoginSubmit(e, setUsername, whichUser, pass, router)
            }
          >
            <div className="rounded-md shadow-sm">
              <div className="-mt-px relative">
                <input
                  aria-label="Password"
                  name="password"
                  type="password"
                  required
                  className="border-gray-300 placeholder-gray-500 appearance-none  relative block w-full px-3 py-4 border text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="relative block w-full py-4 px-3 border border-transparent rounded-md text-white font-semibold bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 focus:outline-none focus:shadow-outline sm:text-sm"
              >
                <span className="absolute left-0 inset-y pl-3">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Log in
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Layout>
  );
}
