import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Connection: "keep-alive",
  },
  transitional: {
    clarifyTimeoutError: true,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Timeout - Increase backend speed or timeout");
    } else if (error.message.includes("stream has aborted")) {
      console.error("Stream killed - Check network/memory limits");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
