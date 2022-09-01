import { AUTH_TOKEN } from "../shared/constants";
import { useEffect } from "react";
import { useLoginContext } from "../redux/selector";

export const useAuth = () => {
  const { user } = useLoginContext();

  const localToken = localStorage.getItem(AUTH_TOKEN);

  useEffect(() => {
    if (user?.token) {
      localStorage.setItem(AUTH_TOKEN, user.token);
    }
  }, [localToken, user?.token]);

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    window.location.reload();
  };
  return { localToken, logout };
};
