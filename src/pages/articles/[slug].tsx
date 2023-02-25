import ArticleMeta from "@/components/ArticleMeta";
import Layout from "@/components/Layout";
import React from "react";

const Article = () => {
  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta />
        </div>

        {/* article */}
        <div className="my-12">article</div>
      </article>
    </Layout>
  );
};

export default Article;
