import { useAppSelector } from "../../hook/useRedux";

export const useLoginContext = () =>
  useAppSelector((state) => state.loginContext);
