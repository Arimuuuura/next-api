import axios from "axios";

export const httpMethodType = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

export const requestHttp = async ({
  method,
  url,
  baseURL,
  headers,
  params,
  data,
}) => {
  const config = {
    method: method,
    url: url,
    baseURL: baseURL,
    headers: headers,
    params: params,
    data: data,
  };

  const response = await axios.request(config).catch((e) => {
    console.log(e);
    throw e;
  });

  return {
    status: response.status,
    data: response.data,
  };
};
