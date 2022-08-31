import { LoginInput } from "./../../../shared/validators/auth";
import { ApiResponse } from "./../../../shared/models/api";
import { axiosInstance } from "../../../utils/axios";

export function loginSagaRequest(loginInput: LoginInput) {
  return axiosInstance().post<ApiResponse<string>>("/auth/login", {
    ...loginInput,
  });
}
