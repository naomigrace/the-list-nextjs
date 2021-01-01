export default function PostImage({ title, imageUrl }) {
  let getImageUrl = null;
  if (imageUrl) {
    getImageUrl = `${
      imageUrl.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""
    }${imageUrl}`;
  }

  return (
    <div className={`sm:mx-0 max-w-full relative`}>
      {imageUrl ? (
        <img src={getImageUrl} alt={title} className="rounded-3xl" />
      ) : (
        <div className="rounded-3xl bg-purple-800" />
      )}
    </div>
  );
}
