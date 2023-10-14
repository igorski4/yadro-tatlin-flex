import { FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box maxWidth={"xl"} height={"calc(100vh - 48px)"} sx={{ px: isMobile ? 2 : 3, py: 3, display: "flex" }}>
      {children}
    </Box>
  );
};

export default Layout;
