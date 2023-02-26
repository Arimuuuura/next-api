import type { GetServerSideProps, NextPage } from "next";
import Layout from "@/components/Layout";
import { siteConfig } from "site.config";
import Card from "@/components/Card";
import { fetchPages } from "@/utils/notion";
import { IndexProps, PageType } from "@/types/types";
import Head from "next/head";
import { getMultiSelect } from "@/utils/property";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async () => {
  const { results } = await fetchPages({});
  return {
    props: {
      pages: results ? results : [],
    },
  };
};

const duplicationOfTags = (pages: PageType[]) => {
  const tagList: string[] = [];
  pages.map((page: PageType) => {
    tagList.push(...getMultiSelect(page.properties.tags.multi_select));
  });
  return tagList.filter(
    (tag: string, index: number) => tagList.indexOf(tag) === index
  );
};

const Tags: NextPage<IndexProps> = ({ pages }) => {
  return (
    <Layout>
      <Head>
        <title>Tags</title>
      </Head>
      <div className="pt-12 w-full">
        <h1 className="text-5xl mb-8">Tags</h1>
        <div className="grid md:gap-6 sm:gap-1 mt-10 md:grid-cols-3 sm:grid-cols-2 w-full my-12 mx-2">
          {duplicationOfTags(pages).map((tag, index) => (
            <Link key={index} href={`/tags/${tag}`}>
              <p className="text-gray-500 hover:text-gray-600">{`#${tag}`}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tags;
