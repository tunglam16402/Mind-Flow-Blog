import type { EntrySkeletonType } from "contentful";
import { Document } from "@contentful/rich-text-types";

// Category type raw từ Contentful
interface ContentfulCategory extends EntrySkeletonType {
  contentTypeId: "category";
  fields: {
    slug: string;
    title: string;
    description?: string;
  };
}

// Tag type raw từ Contentful
interface ContentfulTag extends EntrySkeletonType {
  contentTypeId: "tag";
  fields: {
    slug: string;
    name: string;
    type?: string;
  };
}

// Author raw type
interface ContentfulAuthor extends EntrySkeletonType {
  contentTypeId: "author";
  fields: {
    slug: string;
    name: string;
    avatar?: {
      fields?: {
        file?: {
          url?: string;
        };
      };
    };
  };
}

export interface ContentfulPost extends EntrySkeletonType {
  contentTypeId: "post";
  fields: {
    slug: string;
    coverImage?: {
      fields?: {
        file?: {
          url?: string;
        };
      };
    };
    date: string;
    content: Document;
    commentCount?: number;
    title: string;
    excerpt: string;
    authors?: ContentfulAuthor[];
    primaryCategory: ContentfulCategory;
    categories?: ContentfulCategory[];
    tags?: ContentfulTag[];
  };
}

// Author type sau khi map
export interface Author {
  slug: string;
  name: string;
  avatar: string;
}

export interface Category {
  slug: string;
  title: string;
  description?: string;
}

export interface Tag {
  slug: string;
  name: string;
  type?: string;
}

export interface PostCard {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  commentCount: number;
  coverImage: string;
  authors: Author[];
  primaryCategory: Category;
  categories?: Category[];
  tags?: Tag[];
}

export interface DetailPost extends PostCard {
  content: Document;
}

// Helper mapping

function resolveAssetUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("http")) return url;
  return "";
}

function extractBaseFields(post: ContentfulPost): PostCard {
  const rawCoverImage = post.fields.coverImage?.fields?.file?.url;
  const coverImage = resolveAssetUrl(rawCoverImage);

  const authors: Author[] = (post.fields.authors || []).map((author) => {
    const avatarUrl = author.fields.avatar?.fields?.file?.url;
    return {
      slug: author.fields.slug,
      name: author.fields.name,
      avatar: resolveAssetUrl(avatarUrl),
    };
  });

  const primaryCategory: Category = {
    slug: post.fields.primaryCategory.fields.slug,
    title: post.fields.primaryCategory.fields.title,
    description: post.fields.primaryCategory.fields.description,
  };

  const categories: Category[] | undefined = post.fields.categories?.map(
    (cat) => ({
      slug: cat.fields.slug,
      title: cat.fields.title,
      description: cat.fields.description,
    })
  );

  const tags: Tag[] | undefined = post.fields.tags?.map((tag) => ({
    slug: tag.fields.slug,
    name: tag.fields.name,
    type: tag.fields.type,
  }));

  return {
    slug: post.fields.slug,
    title: post.fields.title,
    excerpt: post.fields.excerpt,
    date: post.fields.date,
    commentCount: post.fields.commentCount ?? 0,
    coverImage,
    authors,
    primaryCategory,
    categories,
    tags,
  };
}

export function mapContentfulPostToPostCard(post: ContentfulPost): PostCard {
  return extractBaseFields(post);
}

export function mapContentfulPostToDetailPost(
  post: ContentfulPost
): DetailPost {
  return {
    ...extractBaseFields(post),
    content: post.fields.content,
  };
}
