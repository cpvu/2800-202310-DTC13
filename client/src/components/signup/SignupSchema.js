
import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "Username must be at least 5 characters")
      .max(12, "Username must be less than 12 characters")
      .required("Username is required"),
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(25, "Password exceeds maximum length")
      .required("Password is required"),
  });
  