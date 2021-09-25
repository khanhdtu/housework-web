import { ReactNode } from "react";
import { Button, ImageProps } from "theme-ui";

export interface Props {
  width?: string | number;
  height?: string | number;
  text?: string;
  icon?: ImageProps;
  onClick?: () => void;
  borderColor?: string;
  borderWidth?: number;
  color?: string;
  children?: ReactNode;
}

export default (props: Props): JSX.Element => {
  const {
    width = "100%",
    height = "auto",
    text,
    icon,
    color = "black",
    borderColor = "primary",
    borderWidth = 1,
    onClick,
    children,
  } = props;
  return (
    <Button
      sx={{
        width,
        height,
        bg: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid",
        borderColor: borderColor,
        color: color,
        borderWidth: borderWidth,
        borderRadius: 20,
        gap: 1,
        cursor: "pointer",
        ":hover": {
          color: "primary",
          borderColor: "primary",
        },
      }}
      onClick={onClick}
    >
      {icon && icon}
      {text || children}
    </Button>
  );
};
