"use server";

import axios from "axios";
import { formSchema } from "../schema/formSchema";

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
    const response = await axios.post(
      `${process.env.DATABASE_URL!}/api/v1/auth/register`,
      body
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
