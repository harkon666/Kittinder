import { API, setAuthToken } from "../config/api";

const GET_PET = "GET_PET";
const UPDATE_PET = "UPDATE_PET";
const THIS_PET = "THIS_PET";

export const thisPet = () => {
  const token = localStorage.getItem("jwToken");
  return {
    type: THIS_PET,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/this_pet");
      const { data } = res.data;
      return data;
    }
  };
};

export const updatePet = (pet_id, name, gender, age_id, about) => {
  const token = localStorage.getItem("jwToken");
  return {
    type: UPDATE_PET,
    payload: async () => {
      setAuthToken(token);
      const res = await API.put(`/pet/${pet_id}`, {
        name,
        gender,
        age_id,
        about
      });
      const { data } = res.data;
      return data;
    }
  };
};

export const getPets = () => {
  const token = localStorage.getItem("jwToken");
  return {
    type: GET_PET,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("/pets");
      const { data } = res.data;
      return data;
    }
  };
};
