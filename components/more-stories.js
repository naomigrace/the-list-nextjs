import PostPreview from "./post-preview";

export default function MoreStories({ actions }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {actions.map((action) => (
          <PostPreview
            key={action.slug}
            title={action.title}
            coverImage={action.cover}
            location={action.location}
            neighborhood={action.neighborhood}
            slug={action.slug}
          />
        ))}
      </div>
    </section>
  );
}
