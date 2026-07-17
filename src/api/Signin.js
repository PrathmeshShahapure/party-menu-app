import axios from "axios";
import Cookies from "js-cookie";

export const SigninReq = async (data) => { 
    console.log(data);
    const response = await axios.post("https://serverless-api-teal.vercel.app/api/auth/signin", data);
    return response
}