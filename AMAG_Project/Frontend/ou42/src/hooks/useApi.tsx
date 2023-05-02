import axios from "axios";
import { useGetUserToken } from "./useGetToken";

export function useApi(method: string, url: string, option: any = null) {
  return () => {
    return axios({
      method: method,
      url: url,
      ...option,
    });
  };
}

export async function useMultiPartApi(
  method: string,
  url: string,
  data: FormData
) {
  const userToken = useGetUserToken()!;
  return () => {
    return fetch(url, {
      method,
      body: data,
      headers: {
        Authorization: `Bearer ${JSON.parse(userToken)}`,
      },
    });
  };
}
