import { PostCard } from "@/components/blog";
import { getPostsByCategorySlug, getAllCategories } from "@/lib/contentful";
import {
  ContentfulPost,
  mapContentfulPostToPostCard,
} from "@/lib/helpers/contentfulHelpers";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const rawPosts = await getPostsByCategorySlug(slug);

  if (!rawPosts || rawPosts.length === 0) {
    return notFound();
  }

  const posts = rawPosts.map((entry) =>
    mapContentfulPostToPostCard(entry as unknown as ContentfulPost)
  );

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{slug} posts</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
}

// Bổ sung generateStaticParams dùng getAllCategories
export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({
    slug: category.fields.slug,
  }));
}
