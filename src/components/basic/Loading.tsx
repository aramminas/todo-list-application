import Box from "@mui/material/Box";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";

export interface LoadingProps {
  color?: LinearProgressProps["color"];
}

const Loading = ({ color = "primary" }: LoadingProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress color={color} />
    </Box>
  );
};

export default Loading;
