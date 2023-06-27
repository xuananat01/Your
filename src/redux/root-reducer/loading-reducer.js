const initState = {
  isLoading: false,
};

export const SET_LOADING = (state = initState, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    default:
      return state;
  }
};
