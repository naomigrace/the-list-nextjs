export default function PostImage({ title, imageUrl }) {
  const getImageUrl = `${
    imageUrl.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""
  }${imageUrl}`;
  return (
    <div className={`sm:mx-0 max-w-full relative`}>
      <img src={getImageUrl} alt={title} className="rounded-3xl" />
    </div>
  );
}
