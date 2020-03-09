import { API } from "../config/api";

const GET_SPECIES = "GET_SPECIES";

export const getSpecies = () => {
  return {
    type: GET_SPECIES,
    payload: async () => {
      const res = await API.get("/species");
      const { data } = res.data;
      return data;
    }
  };
};
