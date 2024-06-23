import Typography, { TypographyOwnProps } from "@mui/material/Typography";

interface MainTitleProps {
  text: string;
  variant?: TypographyOwnProps["variant"];
}

const MainTitle = ({ text, variant = "h4" }: MainTitleProps) => {
  return (
    <Typography
      variant={variant}
      sx={{
        fontFamily: "Monospace",
        fontStyle: "oblique",
        fontWeight: "bold",
      }}
    >
      {text}
    </Typography>
  );
};

export default MainTitle;
