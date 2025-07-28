import { getAllPosts } from "@/lib/contentful";
import PostCard from "../PostCard";
import {
  mapContentfulPostToPostCard,
  type ContentfulPost,
} from "@/lib/helpers/contentfulHelpers";

export default async function PostList() {
  const rawPosts = await getAllPosts();
  const posts = (rawPosts as unknown as ContentfulPost[]).map(
    mapContentfulPostToPostCard
  );

  return (
    <section className="mx-auto">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
}
