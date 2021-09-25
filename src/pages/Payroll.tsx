import {
  Box as View,
  Flex as Box,
  Flex as Row,
  Label,
  Avatar,
  Checkbox,
  Image,
} from "theme-ui";
import BaseLayout from "../layouts";
import { useState } from "react";
import Button from "../components/Button";
import BackDrop from "../components/BackDrop";
import {
  useGetFamilyQuery,
  useGetPayrollListQuery,
  useConfirmPayrollMutation,
} from "../services";

const Payroll = (): JSX.Element => {
  const [currentTaskIndex, setTaskIndex] = useState(-1);
  const { data: payrolls } = useGetPayrollListQuery();
  const { mutate: onConfirm } = useConfirmPayrollMutation();
  return (
    <BaseLayout onCreateTask={() => 1}>
      <View>
        {payrolls?.list.map((payroll, index) => (
          <Box
            key={payroll.id}
            sx={{
              alignItems: "center",
              border: "3px solid",
              borderColor: "secondary",
              position: "relative",
              bg: payroll.status === "review" ? "white" : "green_light",
              borderRadius: 30,
              p: 1,
              gap: 1,
              mt: 1,
            }}
          >
            <Avatar
              src={payroll.member?.avatar || "/images/default_member_bg.png"}
            />
            <Box sx={{ width: "100%", flexDirection: "column" }}>
              <Label sx={{ maxWidth: "80%" }}>{payroll.content}</Label>

              <Label
                sx={{ maxWidth: "80%", fontSize: 12, fontFamily: "unset" }}
              >
                Phần thưởng: {payroll.price && `${payroll.price}K`}{" "}
                {payroll.meal && `+ ${payroll.meal}`}{" "}
                {payroll.gift && `+ ${payroll.gift}`}{" "}
                {payroll.travel && `+ ${payroll.travel}`}
              </Label>
              {payroll.status === "review" && (
                <>
                  <Box
                    sx={{
                      width: "20%",
                      position: "absolute",
                      flexDirection: "column",
                      alignItems: "center",
                      bottom: "1px",
                      cursor: "pointer",
                      height: 40,
                      right: 0,
                    }}
                    onClick={() => setTaskIndex(index)}
                  >
                    <Image width={20} src="/icons/deposit.svg" />
                    <Label
                      sx={{
                        cursor: "pointer",
                        width: "fit-content",
                        fontSize: 12,
                      }}
                    >
                      Thanh Toán
                    </Label>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bg: "red",
                    }}
                  />
                </>
              )}
              {payroll.status === "done" && (
                <Box
                  sx={{
                    width: "20%",
                    position: "absolute",
                    flexDirection: "column",
                    alignItems: "center",
                    bottom: "1px",
                    height: 40,
                    right: 0,
                  }}
                >
                  <Checkbox checked onChange={(e) => e} />
                  <Label sx={{ width: "fit-content", fontSize: 12 }}>
                    Đã thanh toán
                  </Label>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </View>
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
              Xác nhận trả thưởng
            </Label>
            <Label sx={{ width: "fit-content", fontSize: 20 }}>
              {currentTaskIndex > -1 &&
                payrolls?.list[currentTaskIndex].content}
            </Label>
            <Label sx={{ width: "fit-content" }}>
              Phần thưởng:{" "}
              {currentTaskIndex > -1 &&
                `${payrolls?.list[currentTaskIndex]?.price}K`}{" "}
              {payrolls?.list[currentTaskIndex]?.meal &&
                `+ ${payrolls?.list[currentTaskIndex].meal}`}{" "}
              {payrolls?.list[currentTaskIndex]?.gift &&
                `+ ${payrolls?.list[currentTaskIndex].gift}`}{" "}
              {payrolls?.list[currentTaskIndex]?.travel &&
                `+ ${payrolls?.list[currentTaskIndex]?.travel}`}
            </Label>
            <Row sx={{ width: "100%" }}>
              <Button text="Vẫn chưa" onClick={() => setTaskIndex(-1)} />
              <Button
                icon={<Image src="icons/checked.svg" width={20} />}
                text="Đã xong"
                onClick={() =>
                  onConfirm(
                    {
                      fid: payrolls?.list[currentTaskIndex]?.fid || "",
                      tid: payrolls?.list[currentTaskIndex]?.id || "",
                    },
                    {
                      onSuccess: (data) => {
                        if (data) {
                          setTaskIndex(-1);
                        }
                      },
                    }
                  )
                }
              />
            </Row>
          </Box>
        </Box>
      </BackDrop>
    </BaseLayout>
  );
};

export default Payroll;
