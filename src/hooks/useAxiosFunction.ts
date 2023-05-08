import { AxiosInstance, AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

interface IHookConfigurations {
  axiosInstance: AxiosInstance;
  method: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  requestConfig?: AxiosRequestConfig;
}

export const useAxiosFunction = <T = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController>();

  const fetchData = async (configs: IHookConfigurations) => {
    const { axiosInstance, method, url, requestConfig } = configs;

    try {
      setLoading(true);

      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });

      setData(res.data);
    } catch (err: any) {
      if (err.name !== "CanceledError") {
        console.log("error", err);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(controller);

    //cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  return { data, error, loading, fetchData };
};
