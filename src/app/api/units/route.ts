import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { CustomError } from "../../../../types";

export async function GET() {
  try {
    const response = await fetch("https://hade21.xyz/api/v1/units");
    return response.json();
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      const errorData: CustomError = error.response?.data;
      return new NextResponse(JSON.stringify({ message: errorData.message }), {
        status: error.status,
      });
    }
  }
}
