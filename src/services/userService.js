/* eslint-disable react-refresh/only-export-components */
import { httpRequest } from "~/utils/httprequest";

export const login = ({ data }) => {
  try {
    const res = httpRequest.post("user/login", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const Register = ({ data }) => {
  try {
    const res = httpRequest.post("user/register", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addActor = async ({ data }) => {
  try {
    const res = httpRequest.post("user/add-actor", data, {
      headers: { Authorization: "Bearer " + localStorage.token },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = await window.localStorage.getItem("token");

    const res = await httpRequest.get("user/current-user", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async ({ id }) => {
  try {
    const token = await window.localStorage.getItem("token");
    const res = await httpRequest.get(`user/get-user/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async ({ page, perPage, fullName }) => {
  try {
    const token = await window.localStorage.getItem("token");

    const res = await httpRequest.get(`user/get-user`, {
      headers: {
        authorization: "Bearer " + token,
      },
      params: {
        page,
        per_page: perPage,
        fullName,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getActor = async ({ page, perPage, fullName }) => {
  try {
    const token = await window.localStorage.getItem("token");

    const res = await httpRequest.get(`user/get-actor`, {
      headers: {
        authorization: "Bearer " + token,
      },
      params: {
        page,
        per_page: perPage,
        fullName,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const editUser = async ({ id, data }) => {
  try {
    const token = await window.localStorage.getItem("token");
    const res = await httpRequest.put(`user/edit-user/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async ({ id }) => {
  try {
    const token = await window.localStorage.getItem("token");
    const res = await httpRequest.delete(`user/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteActor = async ({ id }) => {
  try {
    const token = await window.localStorage.getItem("token");
    const res = await httpRequest.delete(`user/delete/actor/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
