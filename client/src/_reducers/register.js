const REGISTER = "REGISTER";
const initialState = {
  data: [],
  isLogin: false,
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${REGISTER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${REGISTER}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        isLogin: true,
        loading: false
      };
    case `${REGISTER}_REJECTED`:
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
