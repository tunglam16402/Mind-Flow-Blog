import Image from "next/image";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import styles from "./style.module.css";

interface Author {
  slug: string;
  name: string;
  avatar: string;
}

interface Category {
  title: string;
  slug: string;
}

interface PostCardProps {
  slug: string;
  coverImage: string;
  date: string;
  commentCount: number;
  title: string;
  excerpt: string;
  authors: Author[];
  categories: Category[];
}

export default function PostCard({
  slug,
  coverImage,
  date,
  commentCount,
  title,
  excerpt,
  authors,
  categories,
}: PostCardProps) {
  console.log(categories);
  return (
    <article className="rounded-2xl overflow-hidden bg-white mt-2 p-4 flex flex-col h-full">
      <div className="relative">
        <Link href={`/blog/${slug}`}>
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        </Link>
        <div className="absolute top-2 cursor-pointer left-2 bg-white/80 hover:bg-white backdrop-blur-md px-3 py-1 rounded-lg z-10">
          <Link
            href={`/categories/${categories[0].slug}`}
            className="text-sm md:text-lg"
          >
            {categories[0].title}
          </Link>
        </div>
      </div>

      <div className="flex items-center side-text mt-5 gap-8">
        <div className="flex items-center gap-2">
          <CiCalendarDate className="w-5 h-5" />
          <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
        </div>
        <div className="flex items-center gap-2">
          <FaRegComment className="w-5 h-5" />
          <span>{commentCount} comments</span>
        </div>
      </div>

      <h2 className="title-heading mt-5">
        <Link
          href={`/blog/${slug}`}
          className="hover:text-gray-600 transition-colors duration-300"
        >
          {title}
        </Link>
      </h2>

      <p className="my-3 side-text">{excerpt}</p>

      <div className="mt-auto pt-4 border-t border-gray-300 flex items-center justify-between">
        <div className="flex gap-4">
          {authors.map((author) => (
            <Link
              key={author.slug}
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2"
            >
              <Image
                src={author.avatar || "/images/authors/avatar_placeholder.jpg"}
                alt={author.name}
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
              <span className="side-text">{author.name}</span>
            </Link>
          ))}
        </div>
        <Link href={`/blog/${slug}`} className={styles.button}>
          Read more <FaArrowRight />
        </Link>
      </div>
    </article>
  );
}
