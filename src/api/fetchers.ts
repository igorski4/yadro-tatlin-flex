import { api } from "./api";
import { Product } from "../../models/Product";

export const fetcherGet = async (url: string) => await api.get<Product[]>(`${url}`).then((res) => res.data);

export const fetcherPost = async ({ url, data }: { url: string; data: Omit<Product, "id"> }) =>
  await api.post<Product>(`${url}`, data).then((res) => res.data);

export const fetcherDelete = async ({ url, id }: { url: string; id: number }) =>
  await api.delete<number>(`${url}/${id}`).then((res) => res.data);

export const fetcherPatch = async ({ url, data }: { url: string; data: Product }) =>
  await api.patch<Product>(`${url}/${data.id}`, data).then((res) => res.data);
