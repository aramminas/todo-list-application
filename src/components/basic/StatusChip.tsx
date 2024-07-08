import Chip from "@mui/material/Chip";
import { getStatusColor } from "@/helpers";
import { TodoStatus } from "@/components/types";

interface StatusChipProps {
  status?: TodoStatus;
}

const StatusChip = ({ status }: StatusChipProps) => {
  return <Chip label={status} color={getStatusColor(status)} />;
};

export default StatusChip;
