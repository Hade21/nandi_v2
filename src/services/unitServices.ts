"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axiosInstance from "@/lib/axios-instance";
import { unitSchema } from "@/schema/unitSchema";
import axios, { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { CustomError, User } from "../../types";

interface UserSession {
  data: User;
}

function handleError(error: unknown) {
  console.log(`Error server side: ${error}`);
  if (axios.isCancel(error)) {
    return Promise.reject("Request canceled due to timeout");
  }
  if (error instanceof AxiosError) {
    console.log(`Axios Error: ${(error.config, error.stack, error.response)}`);
    const errorData: CustomError = error.response?.data;
    return Promise.reject(errorData.message);
  } else {
    return Promise.reject("An unknown error occurred. Please try again later.");
  }
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
    return handleError(error);
  }
}

export async function updateUnit(formData: FormData) {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as UserSession).data.token?.accessToken;
  const data = {
    name: formData.get("name"),
    type: formData.get("type"),
    egi: formData.get("egi"),
    id: formData.get("id"),
  };

  const result = unitSchema.safeParse(data);
  if (!result.success) throw new Error(result.error.message);

  try {
    const response = await axiosInstance.put(`/api/v1/units/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
}

export async function getUnit(id: string) {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as UserSession).data.token?.accessToken;

  try {
    const response = await axiosInstance.get(`/api/v1/units/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getAllUnit() {
  try {
    const response = await fetch("https://hade21.xyz/api/v1/units");
    return response.json();
  } catch (error) {
    return handleError(error);
  }
}
