import { FC, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Product } from "../../models/Product";
import { useForm } from "react-hook-form";
import FormTextField from "./inputs/FormTextField";
import FormCheckbox from "./inputs/FormCheckbox";
import FormDatePicker from "./inputs/FormDatePicker";
import { fetcherPatch, fetcherPost } from "../api/fetchers";
import { useProducts } from "../hooks/useProducts";
import { CircularProgress } from "@mui/material";
import ModalApp from "../ui/ModalApp";

type ModalEditProductProps = {
  open: boolean;
  product?: Product;
  handleClose: () => void;
};

export type TypeFormInput = Omit<Product, "id">;

const ModalEditProduct: FC<ModalEditProductProps> = ({ open, product, handleClose }) => {
  const { data, mutate } = useProducts();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<TypeFormInput>({});

  const onSubmit = handleSubmit(async (formData) => {
    setIsLoading(true);

    if (product) {
      const putProducts = await fetcherPatch({
        url: "/products",
        data: {
          ...product,
          availability: formData.availability,
          customer: formData.customer,
        },
      });

      if (data) {
        mutate([...data, putProducts]);
      } else {
        mutate([putProducts]);
      }
    } else {
      const newProducts = await fetcherPost({
        url: "/products",
        data: {
          ...formData,
        },
      });

      if (data) {
        mutate([...data, newProducts]);
      } else {
        mutate([newProducts]);
      }
    }
    setIsLoading(false);

    setTimeout(reset);
    handleClose();
  });

  const handleCancel = () => {
    reset();
    handleClose();
  };

  return (
    <ModalApp open={open} onClose={handleCancel} aria-labelledby="modal-edit-title">
      <>
        <form onSubmit={onSubmit}>
          <Stack rowGap={2} mb={4}>
            <FormTextField
              name="name"
              control={control}
              label="Name"
              disabled={Boolean(product)}
              product={product}
              isRequired
            />
            <FormTextField
              name="weight"
              control={control}
              label="Weight"
              disabled={Boolean(product)}
              product={product}
              isRequired
            />
            <FormDatePicker
              name="order_date"
              control={control}
              label="Order date"
              disabled={Boolean(product)}
              product={product}
              isRequired
            />
            <FormCheckbox name="availability" control={control} label="Availability" product={product} />
            <FormTextField name="customer" control={control} label="Customer" product={product} isRequired />
          </Stack>
        </form>
        <Stack direction={"row"} columnGap={1}>
          <Button onClick={handleCancel} variant="outlined" size={"large"} sx={{ flex: 1 }}>
            Cancel
          </Button>
          <Button onClick={onSubmit} variant="contained" size={"large"} sx={{ flex: 1 }}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : product ? "Change" : "Create"}
          </Button>
        </Stack>
      </>
    </ModalApp>
  );
};

export default ModalEditProduct;
