import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useHistory } from "react-router";
import "../css/LoginAndRegister.css";
export default function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const formData = new FormData()
      formData.append("img", data.img[0]);
      formData.append("name", data.name);
      formData.append("password", data.password);
      const option = {
        method: "POST",
        url: "/api/auth/register",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      };
      await axios(option);
      history.push("/login");
      alert("Đăng ký tài khoản thành công!!!");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <form className="Form" onSubmit={handleSubmit(onSubmit)} method="POST" encType="multipart/form-data">
      <div className="Form-heading">
        <h4>Register</h4>
      </div>
      {
        errorMessage && (Array.isArray(errorMessage) ? (errorMessage.map((err) => (
          <div className="error-message">Error: {err}</div>

        )))
          : (
            <div className="error-message">Error: {errorMessage}</div>
          ))
      }
      <div className="form-group">
        <label htmlFor="name">Tên User</label>
        <input type="text" className="form-control" id="name" name="name" placeholder="Nhập tên user"
          {...register("name")}
    
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" className="form-control" id="password" name="password" placeholder="Nhập mật khẩu của bạn"
   
          {...register("password")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlFile1">Upload ảnh đại diện</label>
        <input type="file"
          className="form-control-file"
          id="file"
          name="img"
          {...register("img")}
        />
      </div>
      <button type="submit" className="btn btn-primary">Đăng ký</button>
    </form>
  )
}
