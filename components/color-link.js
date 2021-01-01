import Link from "next/link";

export default function ColorLink({ title, as, href, count }) {
  if (count === 0) {
    return null;
  }
  return (
    <Link as={as} href={href}>
      <a aria-label={title}>
        <div
          className={`px-4 py-1 mb-6 mr-6 md:mr-0 group text-center uppercase my-auto z-10 flex justify-center items-centerp-10 transition border-2 border-gray-200 hover:border-transparent duration-500 hover:shadow-md flex-1 relative rounded-md cursor-pointer `}
        >
          <h2 className=" flex flex-row  items-center text-gray-800 font-bold text-lg lg:text-xl subpixel-antialiased ">
            {title}
            <span className="ml-3 h-4  bg-gray-700 rounded-full px-2 font-normal text-xs text-white">
              {count}
            </span>
          </h2>
        </div>
      </a>
    </Link>
  );
}
