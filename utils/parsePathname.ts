export const parsePathname = (pathname: string) => {
  const splitedPathname = pathname.split("/");
  if (splitedPathname.length < 2) return "";
  return splitedPathname[1];
};
