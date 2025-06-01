"use server";

import { AxiosError } from "axios";
import { formSchema } from "../schema/formSchema";
import axiosInstance from "@/lib/axios-instance";

export async function submitForm(formData: FormData) {
  const data = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = formSchema.safeParse(data);

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

    console.log(`success: ${response}`);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      console.log(error.status);
      const customError = new AxiosError(error.message);
      customError.status = error.status;
      return Promise.reject(customError);
    }
  }
}
