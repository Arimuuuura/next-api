import { fetchRequest as notionFetchRequest } from "@/api/components/notionApi";

export async function getPostsData() {
  const { notionData } = await notionFetchRequest();
  const result = notionData.map(({ id, created_time, properties }) => {
    return {
      id,
      created_time,
      date: properties.date.date.start,
      title: properties.Title.title[0].text.content,
      content: properties.body.rich_text[0].text.content,
    };
  });
  return { notionData: result };
}
