import { publicInstance, privateInstance } from "../instance";
import {
  LoginData,
  SignUpData,
  ResponseLogin,
  ResponseSignUp,
  ResponseUpdateUser,
  ResponseEmailDuplicateCheck,
  RequestUpdateUser,
} from "@/types/users";

const userApi = {
  emailDuplicateCheck: (email: string) =>
    publicInstance.get<ResponseEmailDuplicateCheck>(`/users/email?email=${email}`),
  loginUser: (credentials: LoginData) => publicInstance.post<ResponseLogin>("/users/login", credentials),
  signUpUser: (data: SignUpData) => publicInstance.post<ResponseSignUp>("/users", data),
  getUserProfile: (_id: number) => privateInstance.get<ResponseUpdateUser>(`/users/${_id}`),
  updateUserProfile: (_id: number, data: RequestUpdateUser) =>
    privateInstance.patch<ResponseUpdateUser>(`/users/${_id}`, data),
};

export default userApi;
