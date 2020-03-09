import { API } from "../config/api";

const LOGIN = "LOGIN";

export const login = (email, password) => {
  return {
    type: LOGIN,
    payload: async () => {
      const res = await API.post("/login", {
        email,
        password
      });
      const data = res.data;
      const token = `Bearer ${data.token}`;
      if (data.message === "success") {
        localStorage.setItem("jwToken", token);
        API.defaults.headers.common["Authorization"] = token;
        return data;
      } else {
        return data;
      }
    }
  };
};
