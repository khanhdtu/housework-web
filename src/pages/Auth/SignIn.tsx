import { NextPage } from "next";
import { useState } from "react";
import { Flex as Box, Image, Label } from "theme-ui";
import { useRouter } from "next/router";
import { useLoginMutation } from "../../services/auth.service";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SignIn: NextPage = () => {
  const { push } = useRouter();
  const { mutateAsync: onLogin } = useLoginMutation();
  const [fid, setFid] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => onLogin({ fid, password });

  return (
    <Box
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Label
        sx={{
          width: "fit-content",
          textDecorationLine: "underline",
          color: "primary",
          fontWeight: 900,
          fontSize: 40,
          mb: 3,
        }}
      >
        Đăng nhập
      </Label>
      <Box
        sx={{
          width: 600,
          height: 300,
          gap: 3,
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid",
          color: "primary",
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
            height: 170,
            borderRadius: 30,
          }}
        >
          <Label
            sx={{
              width: "fit-content",
              fontWeight: 900,
              fontSize: 38,
              color: "primary",
            }}
          >
            HOUSEWORK
          </Label>
          <Label sx={{ width: "fit-content", color: "primary" }}>FOR</Label>
          <Label
            sx={{ width: "fit-content", color: "primary", fontWeight: 700 }}
          >
            KID
          </Label>
          <Label sx={{ width: "fit-content", mt: 3 }}>
            Lên kế hoạch giúp trẻ làm việc nhà
          </Label>
        </Box>

        <Box
          sx={{
            width: 300,
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Input
            type="text"
            placeholder="Family ID"
            value={fid}
            iconSrc="/icons/key.svg"
            onChange={(e) => setFid(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            iconSrc={"/icons/lock.svg"}
          />
          <Button
            text="Đăng nhập"
            icon={<Image width={14} src="/icons/login.svg" />}
            onClick={handleSignIn}
          />
          <Button
            icon={<Image width={14} src="/icons/signup.svg" />}
            text="Đăng ký"
            onClick={() => push("Auth/SignUp")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
