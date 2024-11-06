export const getStoreId = (pathname: string) => {
  const splitedPathname = pathname.split("/");
  if (splitedPathname.length < 2) return "";
  return splitedPathname[1];
};

export const getPathnameExceptStoreId = (pathname: string) => {
  const splitedPathname = pathname.split("/");
  if (splitedPathname.length > 2) return splitedPathname.slice(2).join("");
  return "";
};
