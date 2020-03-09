import { API } from "../config/api";

const GET_AGES = "GET_AGES";

export const getAges = () => {
  return {
    type: GET_AGES,
    payload: async () => {
      const res = await API.get("/ages");
      const { data } = res.data;
      return data;
    }
  };
};
