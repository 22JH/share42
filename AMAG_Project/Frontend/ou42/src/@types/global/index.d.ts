declare module "*.gif";
declare module "*.png";
declare module "*.jpg";

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_IMAGE_URL: string;
  }
}

declare global {
  interface Window {
    kakao: any;
    NDEFReader?: any;
  }
}

declare module "bootpay-js";
