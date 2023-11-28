import { publicInstance, privateInstance } from "../instance";
import { LoginData, SignUpData, ResponseLogin, ResponseSignUp, ResponseUpdateUser } from "@/types/users";

const userApi = {
  loginUser: (credentials: LoginData) => publicInstance.post<ResponseLogin>("/users/login", credentials),
  signUpUser: (data: SignUpData) => publicInstance.post<ResponseSignUp>("/users", data),
  getUserProfile: (_id: number) => privateInstance.get<ResponseUpdateUser>(`/users/${_id}`),
  updateUserProfile: (_id: number, data: SignUpData) => privateInstance.put<ResponseUpdateUser>(`/users/${_id}`, data),
};

export default userApi;
