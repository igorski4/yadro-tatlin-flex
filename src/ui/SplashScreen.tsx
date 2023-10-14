import { FC } from "react";
import Layout from "../layout/Layout";
import CircularProgress from "@mui/material/CircularProgress";

const SplashScreen: FC = () => {
  return (
    <Layout>
      <CircularProgress sx={{ alignSelf: "center", mx: "auto" }} />
    </Layout>
  );
};

export default SplashScreen;
