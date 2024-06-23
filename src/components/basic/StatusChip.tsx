import Chip from "@mui/material/Chip";
import { getStatusColor } from "@/helpers";

interface StatusChipProps {
  status: string;
}

const StatusChip = ({ status }: StatusChipProps) => {
  return <Chip label={status} color={getStatusColor(status)} />;
};

export default StatusChip;
