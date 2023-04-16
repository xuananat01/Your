const initState = {
  temp: [],
};

export const addTemp = (state = initState, action) => {
  switch (action.type) {
    case 'AddTemp': {
      return {
        ...state,
        temp: [...state, action.payoad],
      };
    }
    default:
      return state;
  }
};
