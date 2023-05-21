
import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "Username must be at least 5 characters")
      .max(12, "Username must be less than 12 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(3, "Password must be at least 6 characters")
      .max(25, "Password exceeds maximum length")
      .required("Password is required"),
  });
  