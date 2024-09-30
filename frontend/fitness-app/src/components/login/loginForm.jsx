import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data) => {
    axios
      .post("http://localhost:5000/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log("Login successful", response.data);
        sessionStorage.setItem("token", response.data.access_token);
        setLoginError("");
        navigate("/schedule");
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
      <h1>FITNESS APP</h1>
      {token && token != "" && token != undefined ? (
        "You are logged in with this token: " + token
      ) : (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: { value: true, message: "Email is required." },
                // pattern: {
                //   value:
                //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                //   message: "Invalid email format",
                // },
              })}
            />
            <p className="error">{errors.email?.message}</p>
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

      <DevTool control={control} />
    </div>
  );
};

export default LoginForm;
