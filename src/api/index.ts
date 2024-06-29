import { Methods } from "@/api/types";

const apiUrl = process.env.API_URL;

export const fetcherPost = async (
  path: string,
  data: { [ket: string]: string | number } | {} = {},
) => {
  const jsonData = JSON.stringify(data);
  let options = {
    method: Methods.POST,
    body: jsonData,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${apiUrl}/${path}`, options);

  return await response.json();
};

export const fetcherGet = async (path: string, query: string = "") => {
  const response = await fetch(`${apiUrl}/${path}${query}`, { method: Methods.GET });
  return await response.json();
};

export const fetcherDelete = async (path: string, id?: string | number) => {
  const response = await fetch(`${apiUrl}/${path}/${id || "0"}`, { method: Methods.DELETE });
  return await response.json();
};

export const fetcherPut = async (path: string, data: { id?: string } = {}) => {
  const jsonData = JSON.stringify(data);
  const options = {
    method: Methods.PUT,
    body: jsonData,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${apiUrl}/${path}/${data?.id || "0"}`, options);
  return await response.json();
};
