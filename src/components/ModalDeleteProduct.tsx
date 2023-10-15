import { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Product } from "../../models/Product";
import { fetcherDelete } from "../api/fetchers";
import { useProducts } from "../hooks/useProducts";
import { CircularProgress } from "@mui/material";
import ModalApp from "../ui/ModalApp";
import { updateData } from "../utils/swr";

type ModalDeleteProductProps = {
  open: boolean;
  product?: Product;
  handleClose: () => void;
};

const ModalDeleteProduct: FC<ModalDeleteProductProps> = ({ open, product, handleClose }) => {
  const { data, mutate } = useProducts();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteProduct = async () => {
    setIsLoading(true);

    if (product) {
      const deleteProductId = await fetcherDelete({ url: "/products", id: product?.id });
      updateData({ data, deleteProductId, mutate });
    }

    setIsLoading(false);
    handleClose();
  };

  return (
    <ModalApp open={open} onClose={handleClose} aria-labelledby="modal-delete-title">
      <>
        <Typography id="modal-delete-title" variant="h6" component="h2" mb={3} textAlign={"center"}>
          {"Do you want to remove the product "}
          <Typography id="modal-delete-title" variant="h6" component="span" color={"primary.main"}>
            {product?.name}
          </Typography>
        </Typography>

        <Stack direction={"row"} columnGap={1}>
          <Button onClick={handleClose} variant="outlined" size={"large"} sx={{ flex: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} variant="contained" size={"large"} sx={{ flex: 1 }}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
          </Button>
        </Stack>
      </>
    </ModalApp>
  );
};

export default ModalDeleteProduct;
