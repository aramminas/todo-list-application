import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";

interface EllipsisTooltipProps {
  text: string;
  width: string | number;
}

function EllipsisTooltip({ text, width }: EllipsisTooltipProps) {
  return (
    <Tooltip TransitionComponent={Zoom} title={text} placement="top-start" arrow>
      <Box component="div" style={{ width: width, whiteSpace: "nowrap" }}>
        <Box
          component="div"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {text}
        </Box>
      </Box>
    </Tooltip>
  );
}

export default EllipsisTooltip;
