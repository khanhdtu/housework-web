import { Box, Flex, Input, InputProps, Image, ImageProps } from "theme-ui";

export interface Props extends InputProps {
  width?: string | number;
  height?: string | number;
  value: string;
  borderRadius?: string | number;
  borderColor?: string;
  iconSrc?: string;
  // onValueChange: (value: string) => void;
}

export default (props: Props): JSX.Element => {
  const {
    width = "100%",
    height = "auto",
    value,
    iconSrc,
    borderRadius,
    borderColor,
    onChange,
  } = props;
  return (
    <Flex sx={{ width, height, position: "relative", alignItems: "center" }}>
      {iconSrc && (
        <Box sx={{ position: "absolute", width: 20, height: 20, left: 3 }}>
          <Image src={iconSrc} />
        </Box>
      )}
      <Input
        {...props}
        sx={{
          borderRadius: borderRadius ?? 20,
          borderColor: borderColor ?? "primary",
          "::placeholder": { opacity: 0.5 },
          ":focus": { borderColor: "primary" },
          ":hover": { borderColor: "primary" },
          pl: iconSrc ? "40px" : 3,
          outline: "none",
        }}
        value={value}
        onChange={onChange}
      />
    </Flex>
  );
};
