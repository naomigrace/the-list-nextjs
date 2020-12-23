import Link from "next/link";

export default function CoverImage({
  title,
  imageUrl,
  as,
  href,
  from = "from-blue-400",
  via = "via-green-500",
  to = "to-purple-500",
}) {
  const getImageUrl = `${
    imageUrl.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""
  }${imageUrl}`;

  if (href) {
    return (
      <Link as={as} href={href} className="inline-block">
        <a aria-label={title}>
          <div
            style={{
              maxHeight: "14rem",
            }}
            className={`h-full max-h-52 transition duration-500 bg-black hover:bg-purple-600 flex-1 sm:mx-0 max-w-xs relative rounded-xl cursor-pointer hover:shadow-lg`}
          >
            <div className="absolute inset-0 px-2 leading-tight text-center my-auto z-10 flex justify-center items-center">
              <h2 className="text-white font-bold text-2xl lg:text-3xl xl:text-4xl subpixel-antialiased ">
                {title}
              </h2>
            </div>

            <img
              src={getImageUrl}
              alt={title}
              className="rounded-xl opacity-25 w-full h-full object-cover"
            />
          </div>
        </a>
      </Link>
    );
  }
  return <img src={getImageUrl} alt={title} className="rounded-xl" />;
}
