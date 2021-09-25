import { useState } from "react";
import {
  Flex as Box,
  Flex as Row,
  Label,
  Radio,
  Textarea,
  Image,
  Avatar,
} from "theme-ui";
import Button from "../components/Button";
import Input from "../components/Input";
import { IFamily } from "../interfaces/IFamily";
import { ITask } from "../interfaces/ITask";
import { useCreateTaskMutation } from "../services";

interface Props {
  family?: IFamily;
  onClose: () => void;
}

const CreateTask = (props: Props): JSX.Element => {
  const { family, onClose } = props;
  const [task, setTask] = useState<ITask>({
    fid: family?.fid ?? "",
    content: "",
    price: "",
    gift: "",
    meal: "",
    travel: "",
    memberId:
      (family?.members &&
        family.members.filter((mem) => mem.role === "children")[0].id) ||
      "",
  });
  const { mutate: onCreateTask } = useCreateTaskMutation();

  const handleValueChanged = (value: string, key: string) => {
    (task as any)[key] = value;
    setTask({ ...task });
  };

  const handleTaskCreated = () => {
    onCreateTask(task, {
      onSuccess: (data) => {
        if (data) {
          onClose();
        }
      },
    });
  };

  return (
    <Box sx={{ flexDirection: "column", gap: 2 }}>
      <Textarea
        value={task.content}
        placeholder="Nội dung công việc"
        onChange={(e) => handleValueChanged(e.target.value, "content")}
      />

      <Box
        sx={{
          flexDirection: "column",
          border: "1px solid",
          borderColor: "primary",
          borderRadius: 5,
          p: 2,
          mt: 2,
          gap: 2,
        }}
      >
        <Label
          sx={{
            mt: -3,
            bg: "white",
            width: "fit-content",
            p: 1,
            border: "1px solid",
            borderColor: "primary",
            borderRadius: 5,
          }}
        >
          Phần thưởng
        </Label>
        <Row sx={{ alignItems: "center" }}>
          <Input
            type="number"
            iconSrc="/icons/cash.svg"
            width={300}
            value={task.price?.toString() ?? ""}
            placeholder="20"
            onChange={(e) => handleValueChanged(e.target.value, "price")}
          />
          <Label sx={{ fontWeight: 700, ml: 1 }}>K</Label>
        </Row>
        <Row sx={{ alignItems: "center" }}>
          <Input
            iconSrc="/icons/travel.svg"
            width="100%"
            value={task.travel ?? ""}
            placeholder="Du lịch Phú Quốc"
            onChange={(e) => handleValueChanged(e.target.value, "travel")}
          />
        </Row>
        <Row sx={{ alignItems: "center" }}>
          <Input
            iconSrc="/icons/meal.svg"
            width="100%"
            value={task.meal ?? ""}
            placeholder="Bữa ăn Buffet"
            onChange={(e) => handleValueChanged(e.target.value, "meal")}
          />
        </Row>
        <Row sx={{ alignItems: "center" }}>
          <Input
            iconSrc="/icons/gift.svg"
            width="100%"
            value={task.gift ?? ""}
            placeholder="Giày đá bóng"
            onChange={(e) => handleValueChanged(e.target.value, "gift")}
          />
        </Row>
      </Box>
      <Box
        sx={{
          flexDirection: "column",
          border: "1px solid",
          borderColor: "primary",
          borderRadius: 5,
          p: 2,
          mt: 2,
        }}
      >
        <Label
          sx={{
            mt: -3,
            bg: "white",
            width: "fit-content",
            p: 1,
            border: "1px solid",
            borderColor: "primary",
            borderRadius: 5,
          }}
        >
          Phân công cho
        </Label>

        <Box
          sx={{
            gap: 3,
            mt: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {family?.members
            ?.filter((member) => member.role === "children")
            .map((member, index) => (
              <Box
                key={`member-${index}`}
                sx={{ flexDirection: "column", alignItems: "center" }}
              >
                <Row
                  sx={{
                    minWidth: 100,
                    maxWidth: 150,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    sx={{ width: 60, height: 60 }}
                    src={member.avatar || "/images/default_member_bg.png"}
                  />
                  <Row
                    sx={{ flexDirection: "column", cursor: "pointer" }}
                    onClick={() => handleValueChanged(member.id, "memberId")}
                  >
                    <Label sx={{ width: "fit-content", cursor: "pointer" }}>
                      {member.displayName}
                    </Label>
                    <Radio
                      name={member.displayName}
                      checked={task.memberId === member.id}
                      onChange={(e) => e}
                    />
                  </Row>
                </Row>
              </Box>
            ))}
        </Box>
      </Box>

      <Box>
        <Button text="Hủy" onClick={onClose} />
        <Button
          icon={<Image src="/icons/add.svg" width={20} />}
          text="Tạo công việc"
          onClick={handleTaskCreated}
        />
      </Box>
    </Box>
  );
};

export default CreateTask;
