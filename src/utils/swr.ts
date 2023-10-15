import { KeyedMutator } from "swr";
import { Product } from "../../models/Product";

type updateDataProps = {
  data?: Product[];
  postProduct?: Product;
  patchProduct?: Product;
  deleteProductId?: number;
  mutate: KeyedMutator<Product[]>;
};

export const updateData = ({ data, postProduct, patchProduct, deleteProductId, mutate }: updateDataProps): void => {
  if (!data?.length) {
    if (postProduct) mutate([postProduct]);
    return;
  }

  if (postProduct) {
    const updateData = [...data, postProduct];
    mutate(updateData);
    return;
  }

  if (patchProduct) {
    const updateData = data.map((el) => {
      if (el.id === patchProduct.id) return patchProduct;
      return el;
    });
    mutate(updateData);
    return;
  }

  if (deleteProductId) {
    const updateData = data.filter((e) => e.id !== deleteProductId);
    mutate(updateData);
  }
};
