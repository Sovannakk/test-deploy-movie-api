// lib/axios-instance.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export const axiosBackInstance: AxiosInstance = axios.create({
  baseURL: "http://34.87.39.167:9082/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBackInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    try {
      let session;
      if (typeof window === "undefined") {
        session = await getServerSession(authOptions);
      } else {
        session = await getSession();
      }

      if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    } catch (error) {
      console.warn("Failed to get session:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
