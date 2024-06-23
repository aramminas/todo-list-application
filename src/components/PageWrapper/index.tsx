import { ReactNode } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MainTitle from "@/components/basic/MainTitle";

interface PageWrapperProps {
  title: string;
  children: ReactNode;
  actionButton?: ReactNode;
}

const PageWrapper = ({ children, title, actionButton }: PageWrapperProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 240,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <MainTitle text={title} />
            {!!actionButton && actionButton}
          </Box>
          <Divider variant="fullWidth" component="hr" sx={{ marginY: 2 }} />
          <Box sx={{ marginY: 2 }}>{children}</Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PageWrapper;
