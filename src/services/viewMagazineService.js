import { httpRequest } from "~/utils/httprequest";

export const addViewMagazine = async ({ data }) => {
  try {
    const magazineId = { magazineId: data, monthYear: new Date() };
    const res = await httpRequest.put(
      `view-magazine/add-view-user`,
      magazineId,
      {
        headers: { Authorization: "Bearer " + localStorage.token },
      }
    );

    return res;
  } catch (error) {
    return error;
  }
};

export const getTopView = async () => {
  try {
    const res = await httpRequest.get(`view-magazine/top-view`);

    return res;
  } catch (error) {
    return error;
  }
};
