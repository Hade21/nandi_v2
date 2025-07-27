import axios from "axios";

const url = process.env.BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Timeout - Increase backend speed or timeout");
    } else if (error.message.includes("stream has been aborted")) {
      console.error("Stream killed - Check network/memory limits");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
