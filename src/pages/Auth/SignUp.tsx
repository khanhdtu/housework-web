import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Flex as View, Flex as Box, Label, Radio, Image } from "theme-ui";
import { v4 } from "uuid";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AvatarUploader from "../../components/AvatarUploader";
import { useState } from "react";
import { IFamily } from "../../interfaces/IFamily";
import { IMember } from "../../interfaces/IMember";
import { Bam } from "../../utils/bam";
import { useCreateFamilyMutation, useUploadMutation } from "../../services";

const SignUp: NextPage = () => {
  const { mutate: onCreateFamily } = useCreateFamilyMutation();
  const { mutate: onUpload } = useUploadMutation();
  const { push } = useRouter();

  const [family, setFamily] = useState<IFamily>({
    avatar: "",
    fid: "",
    password: "",
    displayName: "",
  });

  const [members, updateMembers] = useState<IMember[]>([
    {
      id: v4(),
      avatar: "",
      displayName: "",
      role: "children",
    },
  ]);

  const addNewMember = () => {
    members.push({
      id: v4(),
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

  const handleInputFamilyChanged = (value: string, key: string) => {
    if (key === "fid") {
      (family as any)[key] = Bam(value);
    } else {
      (family as any)[key] = value;
    }
    setFamily({ ...family });
  };

  const handleFamilyAvatarChanged = (payload: {
    base64: string;
    file?: File;
  }) => {
    family.avatar = payload.base64;
    setFamily({ ...family });
    if (payload.file) {
      onUpload(
        { file: payload.file },
        {
          onSuccess: (fileUrl) => {
            family.avatar = fileUrl;
            setFamily({ ...family });
          },
        }
      );
    }
  };

  const handleMemberAvatarChanged = async (
    payload: {
      base64: string;
      file?: File;
    },
    memberIndex: number
  ) => {
    members[memberIndex].avatar = payload.base64;
    updateMembers([...members]);
    if (payload.file) {
      onUpload(
        { file: payload.file },
        {
          onSuccess: (fileUrl) => {
            members[memberIndex].avatar = fileUrl;
            updateMembers([...members]);
          },
        }
      );
    }
  };

  const handleFamilyCreated = () => {
    onCreateFamily(
      { ...family, members },
      {
        onSuccess: (family) => {
          if (family) push("/");
        },
      }
    );
  };

  return (
    <View
      sx={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Label
        sx={{
          width: "fit-content",
          fontWeight: 900,
          fontSize: 40,
          color: "primary",
          textDecorationLine: "underline",
          mb: 3,
        }}
      >
        Đăng Ký Family
      </Label>
      <Box
        sx={{
          flexDirection: "column",
          width: 1000,
          minHeight: 450,
          p: 3,
          gap: 3,
        }}
      >
        <Box sx={{ gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
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
              onChange={handleFamilyAvatarChanged}
            />
            <Input
              iconSrc="/icons/key.svg"
              value={family.fid}
              placeholder="Family ID"
              onChange={(e) => handleInputFamilyChanged(e.target.value, "fid")}
            />
            <Input
              iconSrc="/icons/lock.svg"
              value={family.password}
              placeholder="Mật khẩu"
              onChange={(e) =>
                handleInputFamilyChanged(e.target.value, "password")
              }
            />
            <Input
              iconSrc="/icons/user.svg"
              value={family.displayName}
              placeholder="Tên hiển thị"
              onChange={(e) =>
                handleInputFamilyChanged(e.target.value, "displayName")
              }
            />
          </Box>
          {members.map((member, index) => (
            <Box
              key={index}
              sx={{
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid",
                borderColor: "primary",
                position: "relative",
                minWidth: 250,
                p: 2,
                gap: 1,
                borderRadius: 10,
              }}
            >
              <Image
                width={12}
                sx={{
                  position: "absolute",
                  cursor: "pointer",
                  right: 2,
                  top: 2,
                }}
                src="/icons/cancel.svg"
                onClick={() => handleRemoveMember(index)}
              />
              <AvatarUploader
                key="member_avatar"
                state="member_avatar"
                src={member.avatar || "/images/default_member_bg.png"}
                onChange={(payload) =>
                  handleMemberAvatarChanged(payload, index)
                }
              />
              <Input
                iconSrc="/icons/user.svg"
                value={member.displayName}
                placeholder="Tên thành viên"
                onChange={(e) => {
                  member.displayName = e.target.value;
                  updateMembers([...members]);
                }}
              />
              <Label>
                <Radio
                  name={`children-${index}`}
                  checked={member.role === "children"}
                  onClick={() => {
                    member.role = "children";
                    updateMembers([...members]);
                  }}
                  onChange={(e) => e}
                />
                Con cái
              </Label>
              <Label>
                <Radio
                  sx={{ outline: "none" }}
                  name={`parent-${index}`}
                  checked={member.role === "parent"}
                  onChange={(e) => e}
                  onClick={() => {
                    member.role = "parent";
                    updateMembers([...members]);
                  }}
                />
                Cha mẹ
              </Label>
            </Box>
          ))}
          <Box
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={60}
              sx={{ cursor: "pointer" }}
              src="/images/add_member.png"
              onClick={addNewMember}
            />
            <Label>Thêm thành viên</Label>
          </Box>
        </Box>
        <Box
          mt={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Button
            width={250}
            text="Tạo Family"
            icon={<Image src="/icons/add.svg" width={20} />}
            onClick={handleFamilyCreated}
          />
          <Link href="/">Đăng Nhập ?</Link>
        </Box>
      </Box>
    </View>
  );
};

export default SignUp;
