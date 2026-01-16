import type RegisterData from "@/models/RegisterData";
import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
// register user function
export const registerUser =async(signupData: RegisterData)=>{
    //api call to server to save data
    const response = await apiClient.post('/auth/register', signupData);
    return response.data;
}

//login
export const LoginUser=async(loginData:LoginData)=>{
    const response=await apiClient.post('/auth/login',loginData);
    return response.data;
}

//get current login user

//refresh token

//apis