import { requestHttp, httpMethodType } from "@/api/driver/httpDriver";

export const fetchRequest = async () => {
  const payload = {
    method: httpMethodType.GET,
    url: "/hello",
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {},
    params: {},
    data: {},
  };

  const { status, data } = await requestHttp(payload).catch((e) => {
    throw e;
  });

  return data;
};
