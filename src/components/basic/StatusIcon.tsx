import ListAltIcon from "@mui/icons-material/ListAlt";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import TimerOffOutlinedIcon from "@mui/icons-material/TimerOffOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { TodoStatus } from "@/components/types";

interface StatusChipProps {
  status: string;
}

const StatusIcon = ({ status }: StatusChipProps) => {
  switch (status) {
    case TodoStatus.Pending:
      return <HourglassEmptyIcon />;
    case TodoStatus.Completed:
      return <FactCheckOutlinedIcon />;
    case TodoStatus.Overdue:
      return <TimerOffOutlinedIcon />;
    case TodoStatus.Removed:
      return <DeleteForeverOutlinedIcon />;
    default:
      return <ListAltIcon />;
  }
};

export default StatusIcon;
