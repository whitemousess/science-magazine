/* eslint-disable react-refresh/only-export-components */
import { httpRequest } from "~/utils/httprequest";

export const addComment = async ({ articleId, data }) => {
  try {
    const token = await localStorage.token;
    const res = await httpRequest.post(
      `comment/add-comment/${articleId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getCommentArticle = async ({ articleId, page, perPage }) => {
  try {
    const res = await httpRequest.get(`comment/get-comment-article/${articleId}`, {
      params: { page, per_Page: perPage },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const removeFavorite = async ({ id }) => {
  try {
    const token = await localStorage.token;
    const res = await httpRequest.delete(`comment/remove-comment/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
