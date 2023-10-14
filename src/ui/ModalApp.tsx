import { Box, Modal, ModalOwnProps, useMediaQuery, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

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

const ModalApp: FC<ModalOwnProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    style.width = 340;
    style.p = 1.5;
  } else {
    style.width = 500;
    style.p = 3;
  }

  return (
    <Modal {...props}>
      <Box sx={style}>{props.children}</Box>
    </Modal>
  );
};

export default ModalApp;
