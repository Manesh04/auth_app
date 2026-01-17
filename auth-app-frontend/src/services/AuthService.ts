import type RegisterData from "@/models/RegisterData";
import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";
// register user function
export const registerUser = async (signupData: RegisterData) => {
    //api call to server to save data
    const response = await apiClient.post('/auth/register', signupData);
    return response.data;
}

//login
export const LoginUser = async (loginData: LoginData) => {
    const response = await apiClient.post<LoginResponseData>(
        '/auth/login',
         loginData
        );
    return response.data;
};

//logout user
export const logoutUser = async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
};

//get current login user

//refresh token

//apis