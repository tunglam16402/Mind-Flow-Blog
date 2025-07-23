/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/contentful";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className=" mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">Latest Blog Posts</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {posts.map((post: any) => {
          const { title, slug, excerpt, coverImage, date } = post.fields;
          const imageUrl = coverImage?.fields?.file?.url;

          return (
            <article key={post.sys.id} className="group">
              <Link href={`/blog/${slug}`}>
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                  {imageUrl && (
                    <Image
                      src={`https:${imageUrl}`}
                      alt={coverImage.fields.title || ""}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <h2 className="text-2xl font-semibold mb-2 group-hover:underline">
                  {title}
                </h2>
                <p className="text-sm side-text mb-1">
                  {new Date(date).toLocaleDateString()}
                </p>
                <p className="side-text">{excerpt}</p>
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
