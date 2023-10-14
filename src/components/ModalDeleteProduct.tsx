import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Product } from "../../models/Product";
import { fetcherDelete } from "../api/fetchers";
import { useProducts } from "../hooks/useProducts";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";

type ModalDeleteProductProps = {
  open: boolean;
  product?: Product;
  handleClose: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1.5px solid #15151E",
  borderRadius: 1,
  boxShadow: 16,
  p: 3,
};

const ModalDeleteProduct: FC<ModalDeleteProductProps> = ({ open, product, handleClose }) => {
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

  const handleDeleteProduct = () => {
    setIsLoading(true);

    if (product && data) {
      fetcherDelete({ url: "/products", id: product.id });
      const afterDeleteData = data.filter((e) => e.id !== product.id);
      mutate([...afterDeleteData], { revalidate: false });
      handleClose();
    }
    setIsLoading(false);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-delete-title">
      <Box sx={style}>
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
      </Box>
    </Modal>
  );
};

export default ModalDeleteProduct;
