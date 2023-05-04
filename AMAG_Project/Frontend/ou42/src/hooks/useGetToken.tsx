export const useGetUserToken = () => {
  const loginInfo = localStorage.getItem("loginInfo");
  if (loginInfo) {
    return JSON.parse(loginInfo).token;
  }
};

export function useGetAdminToken() {
  return;
}
