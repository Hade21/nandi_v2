import axios, { AxiosError } from "axios";
import { CustomError } from "../../types";

const axiosInstance = axios.create({
  baseURL: process.env.DATABASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  //   timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, response } = error;

      let errorMessage = "An error occured";

      const data = response.data as unknown as CustomError;
      console.log(`AxiosCustomError: ${data}`);
      errorMessage = data.errors.message;

      const customError = new AxiosError(errorMessage);
      customError.status = status;

      return Promise.reject(customError);
    } else if (!error.response) {
      const customError = new Error(
        "No response from server. Try to contact administrator"
      );

      return Promise.reject(customError);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
