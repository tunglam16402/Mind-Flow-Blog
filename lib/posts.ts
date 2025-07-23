interface Author {
  slug: string;
  name: string;
  avatar: string;
}

interface Post {
  slug: string;
  title: string;
  coverImage: string;
  date: string;
  commentCount: number;
  excerpt: string;
  contentHtml: string;
  authors: Author[];
}

const dummyPosts: Post[] = [
  {
    slug: "example-post",
    title: "Example Blog Post",
    coverImage: "/images/cover.jpg",
    date: "2025-07-14",
    commentCount: 3,
    excerpt: "This is a short excerpt of the post.",
    contentHtml:
      "<p>This is the full content of the blog post in HTML format.</p>",
    authors: [
      {
        slug: "john-doe",
        name: "John Doe",
        avatar: "/images/avatar.jpg",
      },
    ],
  },
];

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return dummyPosts.find((p) => p.slug === slug);
}
