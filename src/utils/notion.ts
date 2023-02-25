import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY as string });
const DATABASE_ID = process.env.NOTION_DATA_BASE_ID as string;

// notion への fetch
export const fetchPages = async ({ slug }: { slug?: string }) => {
  const and: any = [
    {
      property: "isPublic",
      checkbox: {
        equals: true,
      },
    },
    {
      property: "slug",
      rich_text: {
        is_not_empty: true,
      },
    },
  ];

  if (slug) {
    and.push({
      property: "slug",
      rich_text: {
        equals: slug,
      },
    });
  }

  return await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: and,
    },
    sorts: [
      {
        property: "published",
        direction: "descending", // 降順
      },
    ],
  });
};

// 記事詳細の取得
export const fetchBlocksByPageId = async (pageId: string) => {
  return await notion.blocks.children.list({ block_id: pageId });
};
