import ArticleMeta from "@/components/ArticleMeta";
import Layout from "@/components/Layout";
import { ArticleProps, Params } from "@/types/types";
import { fetchBlocksByPageId, fetchPages } from "@/utils/notion";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import NotionBlocks from "notion-block-renderer";
import Head from "next/head";
import { getText } from "@/utils/property";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
  };
};

const Article: NextPage<ArticleProps> = ({ page, blocks }) => {
  return (
    <Layout>
      <Head>
        <title>{getText(page.properties.name.title)}</title>
      </Head>
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
