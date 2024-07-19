import * as Yup from "yup";

// export const addUser = Yup.object({
//   name: Yup.string().min(2).max(30).required("Enter your name"),
//   email: Yup.string().email().required("Enter your email"),
//   phone: Yup.number().min(10).required("Enter your phone number"),
// });
// export const updateUser = Yup.object({
//   name: Yup.string().min(2).max(30).required("Enter your name"),
//   email: Yup.string().email().required("Enter your email"),
//   phone: Yup.number().min(10).required("Enter your phone number"),
// });
export const LoginUser = Yup.object({
  email: Yup.string().email().required("Enter your email"),
  password: Yup.string().min(6).required("Enter your password"),
});
export const RegisterUser = Yup.object({
  name: Yup.string().min(2).max(30).required("Enter your name"),
  email: Yup.string().email().required("Enter your email"),
  phone: Yup.number().min(9).required("Enter your phone number"),
  password: Yup.string().min(6).required("Enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "password must match"),
});