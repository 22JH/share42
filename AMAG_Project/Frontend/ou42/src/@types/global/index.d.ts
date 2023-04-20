declare module "*.gif";
declare module "*.png";
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_IMAGE_URL: string;
  }
}
