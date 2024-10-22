const showTabScreenInfo = new Set(["home", "manage", "mypage"]);

export const isBottomTabShowScreen = (pathname: string) => {
  if (showTabScreenInfo.has(pathname)) return true;
  return false;
};
