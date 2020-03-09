const MATCH = "MATCH";
const UPDATE_MATCH = "UPDATE_MATCH";
const MATCHES = "MATCHES";

const initialState = {
  data: [],
  matches: [],
  matched: [],
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${MATCH}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${MATCH}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${MATCH}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false
      };
    case `${UPDATE_MATCH}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${UPDATE_MATCH}_FULFILLED`:
      return {
        ...state,
        matches: action.payload,
        loading: false
      };
    case `${UPDATE_MATCH}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false
      };
    case `${MATCHES}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${MATCHES}_FULFILLED`:
      return {
        ...state,
        matched: action.payload,
        loading: false
      };
    case `${MATCHES}_REJECTED`:
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
