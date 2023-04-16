const initState = {
  arr: [],
};

export const addCityReducer = (state = initState, action) => {
  // console.log('a', action);
  switch (action.type) {
    case 'AddCity': {
      return {
        ...state,
        arr: [...state.arr, action.payload],
      };
    }
    default:
      return state;
  }
};
