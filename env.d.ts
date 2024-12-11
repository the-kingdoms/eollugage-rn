declare module "@env" {
  export const PRESIGNED_URL_SERVER: string;
  export const BASE_URL: string;
  export const SERVER_URL: string;
}

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.png";
