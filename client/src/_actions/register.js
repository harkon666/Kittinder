import { API } from "../config/api";

const REGISTER = "REGISTER";

export const register = (
  breeder,
  email,
  password,
  phone,
  address,
  is_admin,
  name,
  gender,
  species_id,
  age_id
) => {
  return {
    type: REGISTER,
    payload: async () => {
      const res = await API.post("/register", {
        breeder,
        email,
        password,
        phone,
        address,
        is_admin,
        name,
        gender,
        species_id,
        age_id
      });
      const data = res.data;
      const token = `Bearer ${data.token}`;
      localStorage.setItem("jwToken", token);
      API.defaults.headers.common["Authorization"] = token;
      return data;
    }
  };
};
