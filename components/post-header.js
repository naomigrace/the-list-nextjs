import PostTitle from "../components/post-title";

export default function PostHeader({ title, location, neighborhood, date }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <h2 className="md:text-xl lg:text-2xl text-gray-900 font-bold">
        {location}
      </h2>
      <h2 className="md:text-xl lg:text-2xl text-gray-500 mb-10">
        {neighborhood}
      </h2>
    </>
  );
}
