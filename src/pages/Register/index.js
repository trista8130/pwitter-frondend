import React, { useState } from "react";
import classnames from "classnames";

import "./index.scss";
import registerFormInputs from "./formInputs";
import SelectDropDown from "../../components/SelectDropDown";
import AuthServices from "../../service/auth";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage({ history }) {
  const [values, setValues] = useState({});
  const [previewLink, setPreviewLink] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSelectUpdate = (e) => {
    const value = e.target.value;
    setValues({ ...values, gender: value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    const link = URL.createObjectURL(file);

    setPreviewLink(link);
    const formData = new FormData();
    formData.append("files", file);

    // const uploadResult = await AuthServices.handleUpload(formData);
    const uploadResult = await axios.post(
      "http://localhost:3005/files/images",
      formData
    );

    setValues({ ...values, avatar: uploadResult.data.data });
  };
  // console.log(values);
  const handleSubmit = async () => {
    try {
      const registerResult = await AuthServices.handleRegister(values);

      const { phone, password } = values;

      if (registerResult.data.success) {
        const loginResult = await AuthServices.handleLogin({ phone, password });
        console.log(loginResult);
        if (loginResult.data.success) {
          const token = loginResult.data.data;
          const userId = loginResult.data.data._id;
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("userId", userId);
          history.push("/");
          window.location.reload();
        } else {
          alert("Something went wrong during login!");
        }
      } else {
        alert("Something went wrong during register!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-page page">
      <h1>Pwitter</h1>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={(e) => e.preventDefault()} className="register-form">
          {registerFormInputs.map((input) => {
            const { type, key } = input;
            const placeholderText = "Enter your " + key + " here";
            return (
              <div
                key={key}
                className={classnames("input-container", {
                  isHalfWidth: key === "age" || key === "gender",
                })}
              >
                {type === "file" ? (
                  <div className="file-upload">
                    <input
                      type="file"
                      placeholder={placeholderText}
                      onChange={handleFileUpload}
                    />
                    <img src={previewLink} alt="preview" />
                  </div>
                ) : type === "select" ? (
                  <SelectDropDown handleSelect={handleSelectUpdate} />
                ) : (
                  <input
                    onChange={handleInputChange}
                    name={key}
                    type={type}
                    placeholder={placeholderText}
                  />
                )}
              </div>
            );
          })}
          <button onClick={handleSubmit}>Register</button>
        </form>
        <Link to="/login">Already have an account. Sign in here.</Link>
      </div>
    </div>
  );
}
