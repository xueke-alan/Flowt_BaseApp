/**
 * getActiveRule
 * */

export const getActiveRule = (routerPrefix: string) => {
  return (location: { pathname: string }) => location.pathname.startsWith(routerPrefix);
};
