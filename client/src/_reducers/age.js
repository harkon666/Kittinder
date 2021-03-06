const GET_AGES = "GET_AGES";

const initialState = {
  data: [],
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_AGES}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_AGES}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_AGES}_REJECTED`:
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
