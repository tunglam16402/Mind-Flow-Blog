/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient, Entry } from "contentful";
import type { ContentfulPost } from "./helpers/contentfulHelpers";

// Khởi tạo client với biến môi trường từ .env.local
export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Lấy toàn bộ bài viết
export async function getAllPosts(): Promise<Entry<ContentfulPost>[]> {
  const res = await contentfulClient.getEntries<ContentfulPost>({
    content_type: "posts",
    order: ["-sys.createdAt"],
    include: 2,
  } as any);

  return res.items;
}

export async function getPostBySlug(
  slug: string
): Promise<Entry<ContentfulPost> | null> {
  const res = await contentfulClient.getEntries<ContentfulPost>({
    content_type: "posts",
    "fields.slug": slug,
    limit: 1,
    include: 2,
  } as any);

  return res.items.length > 0 ? res.items[0] : null;
}
