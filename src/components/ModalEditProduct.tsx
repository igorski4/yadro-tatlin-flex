import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Product } from "../../models/Product";
import { useForm } from "react-hook-form";
import FormTextField from "./inputs/FormTextField";
import FormCheckbox from "./inputs/FormCheckbox";
import FormDatePicker from "./inputs/FormDatePicker";
import { fetcherPatch, fetcherPost } from "../api/fetchers";
import { useProducts } from "../hooks/useProducts";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";

type ModalEditProductProps = {
  open: boolean;
  product?: Product;
  handleClose: () => void;
};

export type TypeFormInput = Omit<Product, "id">;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1.5px solid #15151E",
  borderRadius: 1,
  boxShadow: 16,
  p: 3,
};

const ModalEditProduct: FC<ModalEditProductProps> = ({ open, product, handleClose }) => {
  const { data, mutate } = useProducts();
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    style.width = 340;
    style.p = 1.5;
  } else {
    style.width = 500;
    style.p = 3;
  }

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
    <Modal open={open} onClose={handleCancel} aria-labelledby="modal-edit-title">
      <Box sx={style}>
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
      </Box>
    </Modal>
  );
};

export default ModalEditProduct;