import axios from "axios";

export function useApi(method: string, url: string, option: any = null) {
  return () => {
    return axios({
      method: method,
      url: url,
      ...option,
    });
  };
}
