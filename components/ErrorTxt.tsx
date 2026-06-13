import { Typography } from "@mui/material";

type ErrorProps = {
  msg: string;
};

export const Errortxt = ({ msg }: ErrorProps) => {
  return <Typography sx={{ color: "red", fontSize: "12px" }}>{msg}</Typography>;
};
