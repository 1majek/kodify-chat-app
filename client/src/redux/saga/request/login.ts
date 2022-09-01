import { LoginInput } from "./../../../shared/validators/auth";
import { ApiResponse } from "./../../../shared/models/api";
import { axiosInstance } from "../../../utils/axios";
import { User } from "../../../shared/models";

export function loginSagaRequest(loginInput: LoginInput) {
  return axiosInstance().post<ApiResponse<User>>("/api/auth/login", {
    ...loginInput,
  });
}
