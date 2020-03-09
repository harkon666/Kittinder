const GET_PET = "GET_PET";
const UPDATE_PET = "UPDATE_PET";
const THIS_PET = "THIS_PET";

const initialState = {
  data: [],
  allPet: [],
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${THIS_PET}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${THIS_PET}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${THIS_PET}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false
      };
    case `${UPDATE_PET}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${UPDATE_PET}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${UPDATE_PET}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false
      };
    case `${GET_PET}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_PET}_FULFILLED`:
      return {
        ...state,
        allPet: action.payload,
        loading: false
      };
    case `${GET_PET}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
