import { API, setAuthToken } from "../config/api";

const MATCH = "MATCH";
const UPDATE_MATCH = "UPDATE_MATCH";
const MATCHES = "MATCHES";

export const match = (pet_id, pet_id_liked, status) => {
  const token = localStorage.getItem("jwToken");
  return {
    type: MATCH,
    payload: async () => {
      setAuthToken(token);
      const res = await API.post("/match", {
        pet_id,
        pet_id_liked,
        status
      });
      const { data } = res.data;
      return data;
    }
  };
};

export const updateMatch = (pet_id, pet_id_liked, status) => {
  const token = localStorage.getItem("jwToken");
  return {
    type: UPDATE_MATCH,
    payload: async () => {
      setAuthToken(token);
      const res = await API.put("/match", {
        pet_id,
        pet_id_liked,
        status
      });
      const { data } = res.data;
      return data;
    }
  };
};

export const matched = id => {
  const token = localStorage.getItem("jwToken");
  return {
    type: MATCHES,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get(`/matches?pet_id=${id}`);
      const { data } = res.data;
      return data;
    }
  };
};
