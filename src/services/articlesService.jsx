/* eslint-disable react-refresh/only-export-components */
import { httpRequest } from "~/utils/httprequest";

const token = localStorage.token;

export const newArticles = async ({ data }) => {
  try {
    const res = await httpRequest.post("article/new", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
