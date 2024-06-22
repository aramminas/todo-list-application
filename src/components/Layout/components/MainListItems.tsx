import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

import { routeItems } from "@/components/Layout/routeMap";

type MainListItemsProps = {
  pathname: string;
};

const MainListItems = ({ pathname }: MainListItemsProps) => (
  <List component="nav">
    {routeItems.map((item) => (
      <ListItemButton
        key={item.name}
        to={item.path}
        component={Link}
        selected={item.path === pathname}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    ))}
  </List>
);

export default MainListItems;
