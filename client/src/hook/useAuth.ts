import { AUTH_TOKEN } from "../shared/constants";
import { useEffect } from "react";
import { useLoginContext } from "../redux/selector";

export const useAuth = () => {
  const { token } = useLoginContext();

  const localToken = localStorage.getItem(AUTH_TOKEN);

  useEffect(() => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
    }
  }, [localToken, token]);

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    window.location.reload();
  };
  return { localToken, logout };
};
