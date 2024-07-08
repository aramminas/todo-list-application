import Typography, { TypographyOwnProps } from "@mui/material/Typography";

interface MainTitleProps {
  text: string;
  variant?: TypographyOwnProps["variant"];
  fontSize?: string | number;
}

const MainTitle = ({ text, variant = "h4", fontSize }: MainTitleProps) => {
  const sxStyles: TypographyOwnProps["sx"] = {
    fontFamily: "Monospace",
    fontStyle: "oblique",
    fontWeight: "bold",
  };

  if (fontSize) {
    sxStyles.fontSize = fontSize;
  }

  return (
    <Typography variant={variant} sx={sxStyles}>
      {text}
    </Typography>
  );
};

export default MainTitle;
