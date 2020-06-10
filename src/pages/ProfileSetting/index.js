import React, { useContext, useState, useEffect } from "react";
import "./index.scss";

import { AppContext } from "../../context";
import UserServices from "../../service/users";
import AuthServices from "../../service/auth";

export default function ProfileSettingPage() {
  const { user } = useContext(AppContext);
  const userId = user._id;

  const [values, setValues] = useState({});
  const [previewLink, setPreviewLink] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const field = Object.keys(values)[0];
  const value = Object.values(values)[0];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const link = URL.createObjectURL(file);
    setPreviewLink(link);
    const formData = new FormData();
    formData.append("files", file);
    const uploadResult = await AuthServices.handleUpload(formData);
    setValues({ ...values, avatar: uploadResult.data.data[0] });
  };

  const HandleChange = async () => {
    await UserServices.handleProfileChange({ userId, field, value });
    window.location.reload(false);
  };

  return (
    <div className="profile-setting-page page mt-70">
      <div className="profile-container">
        {/* !!!!can be changed */}
        <div className="title">
          <h2>My Profile Setting</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          {Object.entries(user).map(([key, value]) => {
            return (
              key !== "_id" &&
              key !== "friends" &&
              key !== "__v" &&
              key !== "password" && (
                <div className="info-block" key={key}>
                  <label> {`My ${key}`}</label>
                  {key === "avatar" ? (
                    <div className="input-block">
                      <div className="file-block">
                        <input type="file" onChange={handleFileUpload} />
                        {previewLink ? (
                          <img src={previewLink} alt="preview" />
                        ) : (
                          <img src={value} alt="avatar" />
                        )}
                      </div>
                      <button onClick={HandleChange}>Upload</button>
                    </div>
                  ) : key === "age" ? (
                    <div className="input-block">
                      <input
                        type="number"
                        placeholder={value}
                        name={key}
                        onChange={handleInputChange}
                      />
                      <button onClick={HandleChange}>Change</button>
                    </div>
                  ) : key === "phone" ? (
                    <div className="input-block">
                      <input
                        type="tel"
                        placeholder={value}
                        name={key}
                        onChange={handleInputChange}
                      />
                      <button onClick={HandleChange}>Change</button>
                    </div>
                  ) : (
                    <div className="input-block">
                      <input
                        type="text"
                        placeholder={value}
                        name={key}
                        onChange={handleInputChange}
                      />
                      <button onClick={HandleChange}>Change</button>
                    </div>
                  )}
                </div>
              )
            );
          })}
        </form>
      </div>
    </div>
  );
}
