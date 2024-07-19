import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { RegisterUser } from "../Schema";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const { values, errors, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterUser,

    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/api/register", values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log("user registered successfully");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="justify-content-center align-items-center vh-100 w-100 d-flex">
      <div className="w-50 pt-3 pb-5 px-5 border bg-shadow rounded">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center">Sign Up </h1>
          <div className="mb-3 ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control "
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            <p className="form-error" style={{ color: "red" }}>
              {errors.name}
            </p>
          </div>
          <div className="mb-2">
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
            <p className="form-error" style={{ color: "red" }}>
              {errors.email}
            </p>
          </div>
          <div className="mb-2">
            <label htmlFor="name">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control"
              placeholder="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            <p className="form-error" style={{ color: "red" }}>
              {errors.phone}
            </p>
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
            <p className="form-error" style={{ color: "red" }}>
              {errors.password}
            </p>
          </div>
          <div className="mb-2">
            <label htmlFor="name">Confirm Password</label>
            <input
              type="text"
              name="confirm_password"
              id="confirm_password"
              className="form-control"
              placeholder="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            <p className="form-error" style={{ color: "red" }}>
              {errors.confirm_password}
            </p>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
          <p className="text-end mt-2">
            Already Registerd{" "}
            <Link to="/login" className="mt-2">
              SignIn
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
