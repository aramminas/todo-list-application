import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export interface AlertBlockProps {
  message: string | null;
}

const AlertBlock = ({ message = null }: AlertBlockProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default AlertBlock;
