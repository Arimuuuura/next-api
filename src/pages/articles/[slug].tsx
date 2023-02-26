import ArticleMeta from "@/components/ArticleMeta";
import Block from "@/components/Block";
import Layout from "@/components/Layout";
import { ArticleProps, Params } from "@/types/types";
import { fetchBlocksByPageId, fetchPages } from "@/utils/notion";
import { getText } from "@/utils/property";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import React from "react";
import NotionBlocks from "notion-block-renderer";

export const getStaticPaths: GetStaticPaths = async () => {
  // 存在しうる slug の一覧
  const { results } = await fetchPages({});
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text),
      },
    };
  });

  return {
    paths: paths,
    fallback: "blocking", // ISR 時データのフェッチを待つ
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  const { results } = await fetchPages({ slug: slug });
  const page = results[0];
  const pageId = page.id;
  const { results: blocks } = await fetchBlocksByPageId(pageId);

  return {
    props: {
      page: page,
      blocks: blocks,
    },
    revalidate: 10, // ISR
  };
};

const Article: NextPage<ArticleProps> = ({ page, blocks }) => {
  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>

        {/* article */}
        <div className="my-12">
          <NotionBlocks isCodeHighlighter={true} blocks={blocks} />
        </div>
      </article>
    </Layout>
  );
};

export default Article;
