import { Client } from "@notionhq/client";
console.log(process.env.NOTION_KEY);

const notion = new Client({ auth: process.env.NOTION_KEY as string });
const DATABASE_ID = process.env.NOTION_DATA_BASE_ID as string;

// notion への fetch
export const fetchPages = async () => {
  return await notion.databases.query({
    database_id: DATABASE_ID,
  });
};
