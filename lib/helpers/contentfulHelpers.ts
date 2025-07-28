import type { EntrySkeletonType } from "contentful";
import { Document } from "@contentful/rich-text-types";

// Category type raw  Contentful
export interface ContentfulCategory extends EntrySkeletonType {
  contentTypeId: "category";
  fields: {
    slug: string;
    title: string;
    description?: string;
    image?: {
      fields?: {
        file?: {
          url?: string;
        };
      };
    };
  };
}

// Tag type raw  Contentful
interface ContentfulTag extends EntrySkeletonType {
  contentTypeId: "tag";
  fields: {
    slug: string;
    name: string;
    type?: string;
    category?: ContentfulCategory;
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
  contentTypeId: "posts";
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
    categories: ContentfulCategory[];
    tags?: ContentfulTag[];
  };
}

// Author type mapping
export interface Author {
  slug: string;
  name: string;
  avatar: string;
}

export interface Category {
  slug: string;
  title: string;
  description?: string;
  image?: string;
}

export interface Tag {
  slug: string;
  name: string;
  type?: string;
  category?: Category;
}

export interface PostCard {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  commentCount: number;
  coverImage: string;
  authors: Author[];
  categories: Category[];
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

  const categories: Category[] = post.fields.categories?.map((cat) => {
    const imageUrl = cat.fields.image?.fields?.file?.url;
    return {
      slug: cat.fields.slug,
      title: cat.fields.title,
      description: cat.fields.description,
      image: resolveAssetUrl(imageUrl),
    };
  });

  const tags: Tag[] | undefined = post.fields.tags?.map((tag) => {
    const category = tag.fields.category;
    const mappedCategory: Category | undefined = category
      ? {
          slug: category.fields.slug,
          title: category.fields.title,
          description: category.fields.description,
          image: resolveAssetUrl(category.fields.image?.fields?.file?.url),
        }
      : undefined;
    return {
      slug: tag.fields.slug,
      name: tag.fields.name,
      type: tag.fields.type,
      category: mappedCategory,
    };
  });

  return {
    slug: post.fields.slug,
    title: post.fields.title,
    excerpt: post.fields.excerpt,
    date: post.fields.date,
    commentCount: post.fields.commentCount ?? 0,
    coverImage,
    authors,
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

function mapCategory(category: ContentfulCategory): Category {
  return {
    slug: category.fields.slug,
    title: category.fields.title,
    description: category.fields.description,
    image: resolveAssetUrl(category.fields.image?.fields?.file?.url),
  };
}

export function mapContentfulCategoryToCategory(
  category: ContentfulCategory
): Category {
  return mapCategory(category);
}
