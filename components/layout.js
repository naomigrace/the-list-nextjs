import { handleLogout } from "@/lib/auth";
import UserContext from "@/lib/context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Avatar from "./avatar";
import Meta from "./meta";

export default function Layout({ preview, children, className }) {
  const router = useRouter();
  const { username, setUsername } = useContext(UserContext);

  return (
    <>
      <Meta />
      <div className="min-h-screen px-4 pb-12">
        {username && (
          <div className="fixed top-0 right-0 p-4 z-50">
            <div className="relative inline-block text-left">
              <div className="flex flex-row gap-x-2">
                <Link href="/actions/new" passHref>
                  <div
                    className={`flex items-center w-14 h-14 justify-center z-50 rounded-full ring-2  bg-gray-700 ring-gray-50 cursor-pointer text-white`}
                  >
                    <span className="text-3xl -mt-1">+</span>
                  </div>
                </Link>
                <Avatar
                  onClick={() => {
                    handleLogout(setUsername, router);
                  }}
                  username={username}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
        <main>{children}</main>
      </div>
    </>
  );
}
