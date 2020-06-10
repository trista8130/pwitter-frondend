import axios from "axios";
import getAPIUrl from "../constants/apiUrl";

const url = getAPIUrl();
const token = window.localStorage.getItem("token");
const handleRegister = (values) => {
  return axios.post(`${url}/auth/register`, values);
};

const handleLogin = ({ phone, password }) => {
  return axios.post(`${url}/auth/login`, { phone, password });
};

const handleUpload = (files) => {
  return axios.post(`${url}/files/images`, files);
};



const AuthServices = {
  handleRegister,
  handleLogin,
  handleUpload,
};

export default AuthServices;
