export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return [...state, action.payload];
    case "REMOVE_FROM_FAVORITES":
      return [...state.filter((el) => el.id !== action.payload)];
    case "REMOVE_ALL_FAVORITES":
      return [];

    default:
      return state;
  }
};
