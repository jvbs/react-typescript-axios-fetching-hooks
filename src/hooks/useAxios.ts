import { AxiosInstance, AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

interface IHookConfigurations {
  axiosInstance: AxiosInstance;
  method: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  requestConfig?: AxiosRequestConfig;
}

export const useAxios = <T = unknown>(configs: IHookConfigurations) => {
  const { axiosInstance, method, url, requestConfig } = configs;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<number>(0);

  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method](url, {
          ...requestConfig,
          signal,
        });
        console.log(res);
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

    fetchData();

    return () => controller.abort();

    // eslint-disable-next-line
  }, [reload]);

  return { data, error, loading, refetch };
};
