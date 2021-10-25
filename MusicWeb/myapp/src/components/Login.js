import React from 'react';
import axios from 'axios';
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import "../css/LoginAndRegister.css";
import AppContext from './AppContext';
export default function Login() {
  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState({
    name: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const onChageHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      const option = {
        method: "post",
        url: "/api/auth/login",
        data: userInput
      };
      const response = await axios(option);
      const { token } = response.data.data;
      const user = {
        name: response.data.data.name,
        img: response.data.data.img,
      }
      localStorage.setItem("token", token);
      dispatch({ type: "CURRENT_USER", payload: { user } });
      history.push("/");
      alert("Đăng nhập thành công!!!");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <form className="Form" onSubmit={onSubmitHandle} method="POST">
      <div className="Form-heading">
        <h4>Login</h4>
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
        <input type="text" className="form-control"
          id="name"
          name="name"
          placeholder="Nhập tên user"
          value={userInput.name}
          onChange={onChageHandle}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" className="form-control"
          id="password"
          name="password"
          placeholder="Nhập mật khẩu của bạn"
          value={userInput.password}
          onChange={onChageHandle}
        />
      </div>
      <button type="submit" className="btn btn-primary">Đăng nhập</button>
    </form>
  )
}
