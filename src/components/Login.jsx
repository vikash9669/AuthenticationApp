import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { LoginUser } from "../Schema";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
};
const Login = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginUser,

      onSubmit: (values, action) => {
        axios
          .post("http://localhost:5000/api/login", values)
          .then((res) => {
            console.log(res);
            if (res) {
              let { id, token } = res.data;
              login(id, token);
            }
            if (res.status === 200) {
              console.log("user login successfully");
              navigate("/");
            }
          })
          .catch((err) => {
            alert("Login Failed",err);
            console.log(err);
          });
      },
    });



  return (
    <div className="justify-content-center align-items-center vh-100 w-100 d-flex">
      <div className="w-50 pt-3 pb-5 px-5 border bg-shadow rounded">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Sign In </h1>

          <div className="mb-3">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            <p className="form-error">{errors.email}</p>
          </div>

          <div className="mb-2">
            <label htmlFor="name">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            <p className="form-error">{errors.password}</p>
          </div>

          <div className="d-grid">
            <button className="btn btn-primary" type="submit">
              SignIn
            </button>
          </div>
          <p className="text-end mt-2">
            Forgot <a href="password?">password?</a>{" "}
            <Link to="/register" className="mt-2">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
