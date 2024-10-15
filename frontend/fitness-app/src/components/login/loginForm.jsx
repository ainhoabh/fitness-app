import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const onSubmit = async (data) => {
    axios
      .post("http://localhost:5000/login", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        console.log("Login successful", response.data);
        sessionStorage.setItem("token", response.data.access_token);
        setLoginError("");
        navigate("/training");
        sessionStorage.setItem("username", data.username);
      })
      .catch((error) => {
        if (error.response) {
          setLoginError(error.response.data.msg);
        } else {
          setLoginError("An unexpected error occurred. Please try again.");
        }
        console.log("Login error", error);
      });
  };

  const onError = (errors) => {
    console.log("Form errors", errors);
  };

  return (
    <div>
      {token && token != "" && token != undefined ? (
        <div>
          <p>You are logged in.</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: { value: true, message: "Username is required." },
              })}
            />
            <p className="error">{errors.username?.message}</p>
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: { value: true, message: "Password is required." },
              })}
            />
            <p className="error">{errors.password?.message}</p>
          </div>

          {loginError && <p className="error">{loginError}</p>}

          <button disabled={!isDirty || !isValid}>Submit</button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
