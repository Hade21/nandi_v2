"use server";

import axiosInstance from "@/lib/axios-instance";
import { AxiosError } from "axios";
import { CustomError } from "../../types/types";
import { registerSchema } from "../schema/userSchema";

export async function register(formData: FormData) {
  const data = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = registerSchema.safeParse(data);

  if (!result.success) throw new Error(result.error.message);

  if (data.password !== data.confirmPassword)
    throw new Error("Passwords do not match");

  const { firstname, lastname, ...values } = data;

  const body = {
    firstName: firstname,
    lastName: lastname,
    ...values,
  };

  try {
    const response = await axiosInstance.post("/api/v1/auth/register", body);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      const errorData: CustomError = error.response?.data;
      return Promise.reject(errorData.message);
    } else {
      return Promise.reject(
        "An unknown error occurred. Please try again later."
      );
    }
  }
}
