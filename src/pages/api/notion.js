import axios from "axios";

const fetchRequest = async () => {
  const payload = {
    method: "post",
    url: "",
    baseURL: `${process.env.NEXT_PUBLIC_NOTION_API_BASE_URL}/${process.env.NEXT_PUBLIC_NOTION_API_DATA_BASE_ID}/query`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTION_API_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2021-08-16",
    },
    params: {},
    data: {},
  };

  const { status, data } = await axios.request(payload).catch((e) => {
    throw e;
  });

  return data.results;
};

export default async function handler(req, res) {
  res.status(200).json({ notionData: await fetchRequest() });
}
