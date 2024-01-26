export const setAccessToken = (token) => {
    return {
      type: 'SET_ACCESS_TOKEN',
      payload: token,
    };
  };