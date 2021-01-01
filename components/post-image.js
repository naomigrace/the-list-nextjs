import { getImageUrl } from "@/lib/imageUrl";

export default function PostImage({ title, imageUrl }) {
  return (
    <div className={`sm:mx-0 max-w-full relative`}>
      <img src={getImageUrl(imageUrl)} alt={title} className="rounded-3xl" />
    </div>
  );
}
