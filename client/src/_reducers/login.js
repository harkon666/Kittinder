const LOGIN = "LOGIN";

const initialState = {
  data: [],
  isLogin: false,
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${LOGIN}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        isLogin: true,
        loading: false
      };
    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        data: action.payload,
        isLogin: false,
        error: true,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
