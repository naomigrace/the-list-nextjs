import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  title,
  coverImage,
  location,
  neighborhood,
  slug,
}) {
  return (
    <div className="max-w-sm">
      <div className="mb-3">
        <CoverImage slug={slug} title={title} imageUrl={coverImage?.url} />
      </div>
      <h3 className="text-3xl mb-2 leading-snug">
        <Link as={`/actions/${slug}`} href="/actions/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <p className="text-lg leading-relaxed mb-2">{location}</p>
      <p className="text-lg leading-relaxed mb-4">{neighborhood.name}</p>
    </div>
  );
}
