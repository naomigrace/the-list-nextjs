import Link from "next/link";

export default function CoverImage({
  title,
  imageUrl,
  as,
  href,
  color = "bg-purple-600",
}) {
  let getImageUrl = null;
  if (imageUrl) {
    getImageUrl = getImageUrl = `${
      imageUrl.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""
    }${imageUrl}`;
  }

  if (href) {
    return (
      <Link as={as} href={href} className="inline-block">
        <a aria-label={title}>
          <div
            style={{
              maxHeight: "14rem",
            }}
            className={`z-0 h-full max-h-52 transition duration-500 bg-black hover:${color} flex-1 sm:mx-0 max-w-xs relative rounded-xl cursor-pointer hover:shadow-lg`}
          >
            <div className="absolute inset-0 px-2 leading-tight text-center my-auto z-10 flex justify-center items-center">
              <h2 className="text-white font-bold text-2xl lg:text-3xl xl:text-4xl subpixel-antialiased ">
                {title}
              </h2>
            </div>
            {getImageUrl ? (
              <img
                src={getImageUrl}
                alt={title}
                className="rounded-xl opacity-25 w-full h-full object-cover"
              />
            ) : (
              <div className="rounded-xl opacity-25 w-full h-full bg-purple-800" />
            )}
          </div>
        </a>
      </Link>
    );
  }
  return <img src={getImageUrl} alt={title} className="rounded-xl" />;
}
