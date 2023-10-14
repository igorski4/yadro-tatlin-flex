import { FC } from "react";
import Typography from "@mui/material/Typography";
import { Message } from "react-hook-form";

type ErrorTextProps = {
  error?: Message;
};

const ErrorText: FC<ErrorTextProps> = ({ error }) => {
  return (
    <>
      {error && (
        <Typography mt={"3px"} ml={"14px"} fontSize={12} letterSpacing={0.4} lineHeight={"20px"} color={"error.main"}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default ErrorText;
