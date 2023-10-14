import useSWR from "swr";
import { fetcherGet } from "../api/fetchers";
import { Product } from "../../models/Product";

export const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR<Product[]>("/products", fetcherGet);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
