/* eslint-disable react-refresh/only-export-components */
import { httpRequest } from "~/utils/httprequest";

const token = localStorage.token;

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

export const getCurrentUser = async () => {
  try {
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

export const getUser = async () => {
  try {
    const res = await httpRequest.get(`user/get-user`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const editUser = async ({ id, data }) => {
  try {
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
