import PostList from "@/components/blog/PostList";
import React from "react";

const LatestPostSection = () => {
  return (
    <section>
      <header className="gap-4 mt-6">
        <h1 className="heading uppercase">New Updates</h1>
        <p className="text-2xl side-text mt-2">-- 14 July 2025</p>
      </header>
      <PostList />
    </section>
  );
};

export default LatestPostSection;
