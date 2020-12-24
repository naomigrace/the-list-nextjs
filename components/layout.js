import { handleLogout } from "@/lib/auth";
import UserContext from "@/lib/context";
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
          <div className="fixed top-0 right-0 p-4">
            <div className="relative inline-block text-left">
              <div>
                <Avatar
                  onClick={() => {
                    console.log("CLICKED");
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
