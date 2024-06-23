import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const NoData = () => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="info">No Data !</Alert>
    </Stack>
  );
};

export default NoData;
