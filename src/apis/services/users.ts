import { publicInstance, privateInstance } from "../instance";
import {
  LoginData,
  SignUpData,
  ResponseLogin,
  ResponseSignUp,
  ResponseUpdateUser,
  ResponseEmailDuplicateCheck,
} from "@/types/users";

const userApi = {
  emailDuplicateCheck: (email: string) =>
    publicInstance.get<ResponseEmailDuplicateCheck>(`/users/email?email=${email}`),
  loginUser: (credentials: LoginData) => publicInstance.post<ResponseLogin>("/users/login", credentials),
  signUpUser: (data: SignUpData) => publicInstance.post<ResponseSignUp>("/users", data),
  getUserProfile: (_id: number) => privateInstance.get<ResponseUpdateUser>(`/users/${_id}`),
  updateUserProfile: (_id: number, data: SignUpData) => privateInstance.put<ResponseUpdateUser>(`/users/${_id}`, data),
};

export default userApi;
