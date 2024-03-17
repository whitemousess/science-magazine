/* eslint-disable react-refresh/only-export-components */
import { httpRequest } from "~/utils/httprequest";

export const newArticles = async ({ data }) => {
  try {
    const token = await localStorage.token;
    const res = await httpRequest.post("article/new", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getAllArticles = async ({ page, perPage, fullName }) => {
  try {
    const res = await httpRequest.get("article/get-all", {
      params: { page, per_page: perPage, fullName },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getFeaturedArticle = async () => {
  try {
    const res = await httpRequest.get("article/get-featured-article");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getDetailArticles = async ({ id }) => {
  try {
    const res = await httpRequest.get(`article/get-article/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getMyArticles = async ({ page, perPage }) => {
  try {
    const token = await localStorage.token;
    const res = await httpRequest.get(
      "article/get-my-articles",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      {
        params: { page, per_Page: perPage },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteArticles = async ({ id }) => {
  try {
    const token = await localStorage.token;
    const res = await httpRequest.delete(`article/delete-article/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const editArticles = async ({ id, data }) => {
  try {
    const token = await localStorage.token;
    const res = await httpRequest.put(`article/edit-article/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error)
  }
};
