let initialState = {
  loading: true,
  data: undefined,
  error: undefined,
};

export const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CUSTOMER_START":
      return {
        ...state,
        loading: true,
      };

    case "GET_CUSTOMER_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GET_CUSTOMER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "DELETE_CUSTOMER":
      return {
        ...state,
        data: state.data.filter((q) => q.id !== action.payload),
      };

    default:
      return state;
  }
};
