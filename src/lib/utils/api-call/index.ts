import toast from "react-hot-toast";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { routes } from "../routes";
import { config as apiConfig } from "../../../../config";
import { getTokens, removeTokens } from "@/app/actions";

export interface ApiParams {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, unknown>;
  data?: Record<string, unknown> | FormData;
  headers?: Record<string, string>;
  isProtected?: boolean;
  base?: boolean;
}

const apiCall = async ({
  path,
  method = "GET",
  params,
  data,
  headers = {},
  isProtected,
}: ApiParams): Promise<AxiosResponse> => {
  try {
    const { accessToken } = await getTokens();
    console.log("api call accessToken",accessToken);
    const url = `${apiConfig.apiUrl}${path}`;
    const isFormData = data instanceof FormData;
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
      headers: {
        ...{ "Content-Type": "application/ld+json", "Accept": "application/ld+json" },
        ...(isProtected ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
      },
    };

    const response = await axios(config);
    return response;
  } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<unknown>;
    if (error.response?.status === 401) {
      // await removeTokens();
      toast.error("Unauthorized. Please log in again.");

      if (typeof window !== "undefined") {
        // window.location.href = routes.ui.signIn;
      }
      return Promise.reject(new Error("Unauthorized"));
    } else {
      console.log("Unexpected API error:", error);
      return Promise.reject(axiosError);
    }
  }

  console.log("Non-Axios Error", error);
  return Promise.reject(error);
}

};

export default apiCall;
