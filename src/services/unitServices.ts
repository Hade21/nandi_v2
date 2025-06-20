"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axiosInstance from "@/lib/axios-instance";
import { unitSchema } from "@/schema/unitSchema";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { CustomError, User } from "../../types";

interface UserSession {
  data: User;
}

export async function addUnit(formData: FormData) {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as UserSession).data.token?.accessToken;
  const data = {
    name: formData.get("name"),
    type: formData.get("type"),
    egi: formData.get("egi"),
  };

  const result = unitSchema.safeParse(data);
  if (!result.success) throw new Error(result.error.message);

  try {
    const response = await axiosInstance.post("/api/v1/units", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
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
