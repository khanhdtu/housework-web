import {
  Box as View,
  Flex as Box,
  Flex as Row,
  Label,
  Avatar,
  Checkbox,
  Image,
} from "theme-ui";
import { useEffect, useState } from "react";
import { IFamily } from "../interfaces/IFamily";
import CreateTask from "./CreateTask";
import { useGetTaskListQuery, useCompleteTaskMutation } from "../services";
import BackDrop from "../components/BackDrop";
import Button from "../components/Button";

interface Props {
  family?: IFamily;
  hasTask?: number;
  resetTask: () => void;
}

const Home = (props: Props): JSX.Element => {
  const { family, hasTask, resetTask } = props;
  const { data: tasks } = useGetTaskListQuery(family?.fid ?? "");
  const [currentTaskIndex, setTaskIndex] = useState(-1);
  const { mutate: onCompleteTask } = useCompleteTaskMutation();
  // const { socket, connected, error } = useSocket("http://localhost:8000");
  // console.log(socket, connected, error);
  // const { lastMessage, sendMessage } = useSocketEvent(socket, "events");

  const handleTaskCompleted = () => {
    onCompleteTask(
      {
        fid: family?.fid ?? "",
        tid: tasks?.list[currentTaskIndex].id ?? "",
      },
      {
        onSuccess: (data) => {
          if (data) {
            setTaskIndex(-1);
          }
        },
      }
    );
  };

  if (hasTask) return <CreateTask family={family} onClose={resetTask} />;
  return (
    <View>
      <Label>Danh sách công việc đang có:</Label>
      {tasks?.list.map((task, index) => (
        <Box
          key={task.id}
          sx={{
            alignItems: "center",
            border: "3px solid",
            borderColor: "secondary",
            position: "relative",
            bg: task.status == "init" ? "white" : "green_light",
            borderRadius: 30,
            p: 1,
            gap: 1,
            mt: 1,
          }}
        >
          <Avatar
            src={task.member?.avatar || "/images/default_member_bg.png"}
          />
          <Box sx={{ width: "100%", flexDirection: "column" }}>
            <Label sx={{ maxWidth: "80%" }}>{task.content}</Label>

            <Label sx={{ width: "80%", fontSize: 12, fontFamily: "unset" }}>
              Phần thưởng: {task.price && `${task.price}K`}{" "}
              {task.meal && `+ ${task.meal}`} {task.gift && `+ ${task.gift}`}{" "}
              {task.travel && `+ ${task.travel}`}
            </Label>
            <Box
              sx={{
                width: "20%",
                position: "absolute",
                flexDirection: "column",
                alignItems: "center",
                height: 40,
                right: 0,
                top: 1,
                bottom: "1px",
              }}
              onClick={() => task.status === "init" && setTaskIndex(index)}
            >
              <Checkbox checked={task.status !== "init"} onChange={(e) => e} />
              <Label
                sx={{
                  width: "fit-content",
                  color: "black",
                  fontWeight: task.status !== "init" ? 700 : 400,
                  cursor: "pointer",
                  fontSize: 11,
                }}
              >
                {task.status !== "init" ? "Đã hoàn thành" : "Chưa hoàn thành"}
              </Label>
            </Box>
          </Box>
        </Box>
      ))}
      <BackDrop hidden={currentTaskIndex == -1}>
        <Box
          sx={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              bg: "white",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: 350,
              height: 200,
              borderRadius: 10,
              gap: 2,
              p: 2,
            }}
          >
            <Label
              sx={{
                width: "fit-content",
                fontSize: 30,
                color: "primary",
                fontWeight: 700,
              }}
            >
              Xác nhận hoàn thành?
            </Label>
            <Label sx={{ width: "fit-content", fontSize: 20 }}>
              {currentTaskIndex > -1 && tasks?.list[currentTaskIndex].content}
            </Label>
            <Row sx={{ width: "100%" }}>
              <Button text="Chưa xong" onClick={() => setTaskIndex(-1)} />
              <Button
                icon={<Image src="icons/checked.svg" width={20} />}
                text="Đã xong"
                onClick={handleTaskCompleted}
              />
            </Row>
          </Box>
        </Box>
      </BackDrop>
    </View>
  );
};

export default Home;
