import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import TimerOffOutlinedIcon from "@mui/icons-material/TimerOffOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import Todos from "@/pages/Todos";
import Completed from "@/pages/Completed";
import Pending from "@/pages/Pending";
import Overdue from "@/pages/Overdue";
import History from "@/pages/History";
import Trash from "@/pages/Trash";

import { RouteItems } from "@/types";
import React from "react";

export const routeItems: RouteItems = [
  {
    path: "/",
    name: "Todos",
    index: true,
    icon: <ListAltIcon />,
    element: <Todos />,
  },
  {
    path: "/completed",
    name: "Completed",
    icon: <AssignmentTurnedInOutlinedIcon />,
    element: <Completed />,
  },
  {
    path: "/pending",
    name: "Pending",
    icon: <PendingActionsIcon />,
    element: <Pending />,
  },
  {
    path: "/overdue",
    name: "Overdue",
    icon: <TimerOffOutlinedIcon />,
    element: <Overdue />,
  },
  {
    path: "/history",
    name: "History",
    icon: <ContentPasteSearchIcon />,
    element: <History />,
  },
  {
    path: "/trash",
    name: "Trash",
    icon: <DeleteForeverOutlinedIcon />,
    element: <Trash />,
  },
];
