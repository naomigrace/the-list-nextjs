import Link from "next/link";

export default function ColorLink({
  title,
  as,
  href,
  from = "from-blue-400",
  via = "via-green-500",
  to = "to-purple-500",
}) {
  return (
    <Link as={as} href={href}>
      <a aria-label={title}>
        <div
          className={`px-4 py-1 mb-6 mr-6 md:mr-0 group text-center uppercase my-auto z-10 flex justify-center items-centerp-10 transition border-2 border-gray-200 hover:border-transparent duration-500 hover:shadow-md flex-1 relative rounded-md cursor-pointer `}
        >
          <h2 className="text-gray-800 font-bold text-lg lg:text-xl subpixel-antialiased ">
            {title}
          </h2>
        </div>
      </a>
    </Link>
  );
}
