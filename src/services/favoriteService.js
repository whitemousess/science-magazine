/* eslint-disable react-refresh/only-export-components */
import { httpRequest } from "~/utils/httprequest";

export const addFavorite = async ({ articleId }) => {
  try {
    const token = await localStorage.token;
    const res = await httpRequest.post(`favorite/add-favorite/${articleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getMyFavorite = async ({ page, perPage }) => {
  try {
    const token = await localStorage.token;
    const res = await httpRequest.get(
      "favorite/get-my-favorite",
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

export const removeFavorite = async ({ id }) => {
  try {
    const token = await localStorage.token;
    const res = await httpRequest.delete(`favorite/remove-favorite/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
