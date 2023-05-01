export const useGetUserToken = () => {
  if (localStorage?.getItem("token")) {
    return localStorage.getItem("token");
  } else return null;
};

export function useGetAdminToken() {
  return;
}
