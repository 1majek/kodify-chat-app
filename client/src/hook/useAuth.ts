import { AUTH_TOKEN } from "../shared/constants";
import { User } from "../shared/models";

export const useAuth = () => {
  const localUser = sessionStorage.getItem(AUTH_TOKEN);
  const user: User | null = localUser ? JSON.parse(localUser) : null;
  const logout = () => {
    sessionStorage.removeItem(AUTH_TOKEN);
    window.location.reload();
  };
  return { user, logout };
};
