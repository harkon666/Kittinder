import { API, setAuthToken } from "../config/api";

const GET_USER = "GET_USER";
const GET_OTHER_USER = "GET_OTHER_USER";

export const thisUser = () => {
  const token = localStorage.getItem("jwToken");
  return {
    type: GET_USER,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/this_user");
      const { data } = res.data;
      return data;
    }
  };
};

export const otherUser = () => {
  const token = localStorage.getItem("jwToken");
  return {
    type: GET_OTHER_USER,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/a");
      const { data } = res.data;
      return data;
    }
  };
};
