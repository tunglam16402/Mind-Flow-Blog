import { getPostBySlug } from "@/lib/contentful";
import {
  ContentfulPost,
  mapContentfulPostToDetailPost,
} from "@/lib/helpers/contentfulHelpers";
import PostDetail from "@/components/blog/PostDetail";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { slug } = await props.params;

  const rawPost = await getPostBySlug(slug);
  if (!rawPost) return notFound();

  const post = mapContentfulPostToDetailPost(
    rawPost as unknown as ContentfulPost
  );

  return <PostDetail post={post} />;
}

