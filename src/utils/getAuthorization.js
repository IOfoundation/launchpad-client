export const getAuthorization = state => {
  const userAuth = sessionStorage.getItem('userAuth');

  if (userAuth) {
    return userAuth;
  } else if (state.user.authorization) {
    return state.user.authorization;
  }
  return '';
};
