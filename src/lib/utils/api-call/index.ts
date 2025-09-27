import toast from "react-hot-toast";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { config as apiConfig } from "../../../../config";
import { getTokens } from "@/app/actions";

export interface ApiParams {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, unknown>;
  data?: Record<string, unknown> | FormData;
  headers?: Record<string, string>;
  isProtected?: boolean;
  base?: boolean;
}

const apiCall = async ({
  endpoint,
  method = "GET",
  params,
  data,
  headers = {},
  isProtected,
}: ApiParams): Promise<AxiosResponse> => {
  try {
    const { accessToken } = await getTokens();
    const url = `${apiConfig.apiUrl}${endpoint}`;
    // const isFormData = data instanceof FormData;
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
      toast.error("Unauthorized. Please log in again.");

      if (typeof window !== "undefined") {
        // window.location.href = routes.ui.signIn;
      }
      return Promise.reject(new Error("Unauthorized"));
    } else {
      return Promise.reject(axiosError);
    }
  }

  return Promise.reject(error);
}

};

export default apiCall;
