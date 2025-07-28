import { createClient, Entry, EntryCollection } from "contentful";
import type {
  ContentfulCategory,
  ContentfulPost,
} from "./helpers/contentfulHelpers";

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getAllPosts(): Promise<Entry<ContentfulPost>[]> {
  const res: EntryCollection<ContentfulPost> =
    await contentfulClient.getEntries<ContentfulPost>({
      content_type: "posts",
      order: ["-sys.createdAt"],
      include: 2,
    });

  return res.items;
}

export async function getPostBySlug(
  slug: string
): Promise<Entry<ContentfulPost> | null> {
  const res: EntryCollection<ContentfulPost> =
    await contentfulClient.getEntries<ContentfulPost>({
      content_type: "posts",
      ...{ "fields.slug": slug },
      limit: 1,
      include: 2,
    });

  return res.items.length > 0 ? res.items[0] : null;
}

export async function getAllCategories(): Promise<Entry<ContentfulCategory>[]> {
  const res: EntryCollection<ContentfulCategory> =
    await contentfulClient.getEntries<ContentfulCategory>({
      content_type: "category",
      ...{ order: ["fields.title"] },
    });

  return res.items;
}

async function getCategoryEntryBySlug(
  slug: string
): Promise<Entry<ContentfulCategory> | null> {
  const res: EntryCollection<ContentfulCategory> =
    await contentfulClient.getEntries<ContentfulCategory>({
      content_type: "category",
      limit: 1,
      ...{ "fields.slug": slug },
    });

  return res.items[0] ?? null;
}

export async function getPostsByCategorySlug(
  slug: string
): Promise<Entry<ContentfulPost>[]> {
  const category = await getCategoryEntryBySlug(slug);
  if (!category) return [];

  const res: EntryCollection<ContentfulPost> =
    await contentfulClient.getEntries<ContentfulPost>({
      content_type: "posts",
      order: ["-sys.createdAt"],
      include: 2,
      ...{
        "fields.categories.sys.id": category.sys.id,
      },
    });

  return res.items;
}
