import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY as string });
const DATABASE_ID = process.env.NOTION_DATA_BASE_ID as string;

// notion への fetch
export const fetchPages = async ({
  slug,
  tag,
}: {
  slug?: string;
  tag?: string;
}) => {
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

  if (tag) {
    and.push({
      property: "tags",
      multi_select: {
        contains: tag,
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
  const data = [];
  let cursor = undefined;
  while (true) {
    const { results, next_cursor }: any = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });
    data.push(...results);
    if (!next_cursor) break;
    cursor = next_cursor;
  }
  return { results: data };
};
