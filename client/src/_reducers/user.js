const GET_USER = "GET_USER";
const GET_OTHER_USER = "GET_OTHER_USER";

const initialState = {
  data: [],
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false
      };
    case `${GET_OTHER_USER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_OTHER_USER}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_OTHER_USER}_REJECTED`:
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
