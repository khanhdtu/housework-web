import { ReactNode } from "react";
import { Box } from "theme-ui";

interface IBackdropProps {
  hidden: boolean;
  children: ReactNode;
}

export const Backdrop = (props: IBackdropProps): JSX.Element => {
  if (props.hidden) return <></>;
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bg: "#000",
          opacity: 0.5,
          position: "absolute",
          zIndex: 1,
        }}
      />
      <Box
        sx={{ position: "relative", width: "100%", height: "100%", zIndex: 2 }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default Backdrop;
