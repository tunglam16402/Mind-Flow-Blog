"use client";

import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, type Node } from "@contentful/rich-text-types";
import { type DetailPost } from "@/lib/helpers/contentfulHelpers";
import styles from "./style.module.css";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { FaTags } from "react-icons/fa";

interface PostDetailProps {
  post: DetailPost;
}

//render options for Contentful rich text images
const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
      const fields = node?.data?.target?.fields;
      if (!fields) return null;

      const file = fields.file;
      const title = fields.title || "Image";
      const url = file?.url;
      const details = file?.details;

      if (!url) return null;

      const src = url.startsWith("http") ? url : `https:${url}`;
      const width = details?.image?.width || 800;
      const height = details?.image?.height || 600;

      return (
        <div className="my-6">
          <Image
            src={src}
            alt={title}
            width={width}
            height={height}
            className="rounded-md w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
      );
    },
  },
};

export default function PostDetail({ post }: PostDetailProps) {
  const {
    title,
    date,
    coverImage,
    content,
    authors,
    commentCount,
    excerpt,
    primaryCategory,
    categories,
    tags,
  } = post;
  console.log(tags);
  return (
    <article>
      {coverImage && (
        <div className="relative w-full h-[500px] md:h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10 z-10" />
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="max-w-7xl wrapper mx-auto">
        <div className="text-lg side-text mt-6 flex items-center gap-2 md:text-2xl md:gap-4 flex-wrap">
          <div>
            <Link
              href={`/category/${primaryCategory.slug}`}
              className="font-semibold hover:underline"
            >
              {primaryCategory.title}
            </Link>
          </div>
          <span>|</span>
          {authors.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {authors.map((author) => (
                <div key={author.slug} className="flex items-center gap-2">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                  <span>{author.name}</span>
                </div>
              ))}
            </div>
          )}
          <span>|</span>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>|</span>
          <span>{commentCount} comments</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-bold">{title}</h1>

        <div className="mt-8 bg-gray-200 rounded-lg px-4 py-4 gap-2 text-primary text-lg">
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <BiCategory />

              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${primaryCategory.slug}/${category.slug}`}
                  className="bg-color-white px-4 py-1 rounded-full primary-hover "
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <FaTags />

              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/category/${primaryCategory.slug}/${tag.slug}`}
                  className="bg-color-white px-4 py-1 rounded-full primary-hover"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {excerpt && (
          <p className="text-3xl md:text-5xl mt-6 text-primary font-semibold">
            {excerpt}
          </p>
        )}

        <div className={styles.content}>
          {content ? (
            documentToReactComponents(content, renderOptions)
          ) : (
            <p>No content available.</p>
          )}
        </div>
      </div>
    </article>
  );
}
