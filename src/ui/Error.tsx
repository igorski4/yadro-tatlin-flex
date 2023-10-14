import { FC } from "react";
import Layout from "../layout/Layout";
import { Box, Typography } from "@mui/material";

const Error: FC = () => {
  return (
    <Layout>
      <Box sx={{ alignSelf: "center", textAlign: "center", width: "100%" }}>
        <Typography variant="h4" color="error" gutterBottom>
          Oops, something went wrong!
        </Typography>
        <Typography variant="body1">Please try again later.</Typography>
      </Box>
    </Layout>
  );
};

export default Error;
