const initState = {
  accessToken: null,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN': {
      return {
        ...state,
        accessToken: action.payload,
      };
    }
    default:
      return state;
  }
};
