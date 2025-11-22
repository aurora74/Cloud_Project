import { useEffect, useState } from "react";
import axios from "./axios-config";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const useAuth = () => {
  const [isLogin] = useState<boolean | null>(null);

  //   useEffect(() => {
  //     setIsLogin(!!authorizationUtil.getAuthorization());
  //   }, []);

  return { isLogin };
};

export const useAdminAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  //   useEffect(() => {
  //     setIsLogin(!!authorizationUtil.getIsAdmin());
  //   }, []);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLogin(!!token); // Kiểm tra token để cập nhật trạng thái đăng nhập
  }, []);
  return { isLogin };
};

export const handleUserAuthentication = async (
  username: string,
  password: string
) => {
  try {
    // Form data payload
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);
    formData.append("scope", "");
    formData.append("client_id", "string");
    formData.append("client_secret", "string");

    // Axios POST request

    const response = await axios.post(
      `${backendUrl}/api/user/auth`,
      formData,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const token = response.data.access_token;

    localStorage.setItem("authToken", token);

    console.log("Response:", response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data.detail : error.detail
    );
    throw new Error(error.response.data.detail);
  }
};
