import { Flex as View, Flex as Box, Label, Radio, Image } from "theme-ui";
import { useRouter } from "next/router";
import BaseLayout from "../layouts";
import Input from "../components/Input";
import Button from "../components/Button";
import AvatarUploader from "../components/AvatarUploader";
import { useState } from "react";
import { IFamily } from "../interfaces/IFamily";
import { IMember } from "../interfaces/IMember";
import { useGetFamilyQuery } from "../services";
import { deleteCurrentFamily } from "../utils/storage";

const Settings = () => {
  const { data: family } = useGetFamilyQuery();
  const { push } = useRouter();
  const [members, updateMembers] = useState<IMember[]>([
    {
      id: "",
      avatar: "",
      displayName: "",
      role: "children",
    },
  ]);

  const addNewMember = () => {
    members.push({
      id: "",
      avatar: "",
      displayName: "",
      role: "children",
    });
    updateMembers([...members]);
  };

  const handleRemoveMember = (index: number) => {
    members.splice(index, 1);
    updateMembers([...members]);
  };

  const handleLoggedOut = () => {
    deleteCurrentFamily();
    push("/");
  };

  return (
    <BaseLayout>
      <View
        sx={{
          flexDirection: "column",
          gap: 1,
          height: "100%",
        }}
      >
        <Box
          sx={{
            minWidth: 250,
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid",
            borderColor: "primary",
            p: 2,
            gap: 1,
            borderRadius: 10,
          }}
        >
          <AvatarUploader
            key="family_avatar"
            state="family_avatar"
            src={family?.avatar || "/images/default_family_bg.png"}
            onChange={(payload) => payload}
          />
          <Input
            iconSrc="/icons/key.svg"
            value={family?.fid ?? ""}
            placeholder="Family ID"
            onChange={(e) => e}
          />
          <Input
            type="password"
            iconSrc="/icons/lock.svg"
            value={family?.password ?? ""}
            placeholder="Password"
            onChange={(e) => e}
          />
          <Input
            iconSrc="/icons/user.svg"
            value={family?.displayName ?? ""}
            placeholder="Tên hiển thị"
            onChange={(e) => e}
          />
        </Box>
        <Box mt={3}>
          <Button text="Đăng xuất" onClick={handleLoggedOut} />
        </Box>
      </View>
    </BaseLayout>
  );
};

export default Settings;
