import Meta from "./meta";

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen px-4">
        <main>{children}</main>
      </div>
    </>
  );
}
