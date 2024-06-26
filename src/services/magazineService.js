import { httpRequest } from "~/utils/httprequest";

export const addMagazine = async ({ data }) => {
  try {
    const res = await httpRequest.post(`magazine/add-magazine`, data, {
      headers: { authorization: "Bearer " + localStorage.token },
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const getAllMagazine = async ({ page, perPage, title, type }) => {
  try {
    const res = await httpRequest.get(`magazine/get-all-magazine`, {
      params: {
        title,
        page,
        per_page: perPage,
        type,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getMagazinePublish = async ({
  page,
  perPage,
  title,
  type,
  publishingYear,
}) => {
  try {
    const res = await httpRequest.get(`magazine/get-magazine/publish`, {
      params: {
        type,
        page,
        title,
        publishingYear,
        per_page: perPage,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getMagazineUnpublished = async () => {
  try {
    const res = await httpRequest.get(`magazine/get-magazine/unpublished`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getMagazineById = async ({ id }) => {
  try {
    const res = await httpRequest.get(`magazine/get-magazine/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const editMagazine = async ({ data, id }) => {
  try {
    const res = await httpRequest.put(`magazine/edit-magazine/${id}`, data, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteMagazine = async ({ id }) => {
  try {
    const res = await httpRequest.delete(`magazine/delete-magazine/${id}`, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
