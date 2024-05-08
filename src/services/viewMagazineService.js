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
