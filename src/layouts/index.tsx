import { Box, Flex, Avatar, Image, Label } from "theme-ui";
import { useRouter } from "next/router";
import { QueryClient, useQueryClient } from "react-query";
import Button from "../components/Button";
import Auth from "../pages/Auth";
import { useEffect, useState } from "react";
import {
  getCurrentRoute,
  setCurrentRoute,
  setCurrentMemberId as _setCurrentMemberId,
  getCurrentMemberId,
} from "../utils/storage";
import { useGetFamilyQuery, useGetPayrollListQuery } from "../services";

interface Props {
  children: React.ReactNode;
  onCreateTask?: () => void;
}

const Layout = (props: Props): JSX.Element => {
  const { data: family } = useGetFamilyQuery();
  const { data: payrolls } = useGetPayrollListQuery();
  const [currentRoute, setRoute] = useState("");
  const [currentMemberId, setCurrentMemberId] = useState("");
  const { onCreateTask } = props;
  const { push, pathname, replace } = useRouter();
  const queryClient = useQueryClient();

  const _unpaidPayrolls = () => {
    return payrolls?.list.filter((payroll) => payroll.status === "review");
  };

  useEffect(() => {
    setRoute(getCurrentRoute());
    setCurrentMemberId(getCurrentMemberId());
    const interval = setInterval(
      () => queryClient.refetchQueries(["get-payroll-list"]),
      60000
    );
    return () => clearInterval(interval);
  }, []);

  const handleRouteChanged = (route: string, memberId?: string) => {
    setCurrentRoute(route);
    setRoute(route);
    if (memberId) {
      _setCurrentMemberId(memberId); // keep in local storage
      setCurrentMemberId(memberId);
    }
    if (pathname === "/") {
      queryClient.refetchQueries(["get-task-list"]);
    }
    push(route);
  };

  return (
    <Auth>
      <Flex
        sx={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          bg: "beige",
        }}
      >
        <Box
          sx={{
            width: 500,
            height: "85%",
            border: "1px solid",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            p: 1,
          }}
        >
          <Flex sx={{ height: 32, gap: 1, position: "relative" }}>
            <Avatar
              sx={{
                cursor: "pointer",
                borderColor: currentMemberId === "all" && "green",
              }}
              src={family?.avatar || "/images/default_family_bg.png"}
              onClick={() => handleRouteChanged("/", "all")}
            />
            {family?.members?.map((member) => (
              <Avatar
                key={member.id}
                src={member.avatar || "/images/default_member_bg.png"}
                sx={{
                  cursor: "pointer",
                  borderColor: currentMemberId === member.id && "green",
                }}
                onClick={() => handleRouteChanged("/", member.id)}
              />
            ))}
            {pathname === "/" && (
              <Box sx={{ position: "absolute", right: 0 }}>
                <Button
                  icon={<Image src="/icons/broom.svg" width={20} />}
                  height={32}
                  text="Tạo công việc"
                  onClick={onCreateTask}
                />
              </Box>
            )}
          </Flex>
          {/* Container */}
          <Box mt={2} p={3}>
            {props.children}
          </Box>
        </Box>
        {/* Footer */}
        <Flex
          sx={{
            width: 500,
            height: 40,
            borderLeft: "1px solid",
            borderRight: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          <Flex
            sx={{
              width: "33.33%",
              alignItems: "center",
              justifyContent: "center",
              bg: "silver",
              gap: 1,
            }}
          >
            <Image width={20} src="/icons/bell.svg" />
            <Label
              sx={{
                width: "fit-content",
                cursor: "pointer",
                color: currentRoute === "/Notifications" && "primary",
                ":hover": { color: "primary" },
              }}
              onClick={() => handleRouteChanged("/Notifications")}
            >
              Thông Báo
            </Label>
          </Flex>
          <Flex
            sx={{
              width: "33.33%",
              alignItems: "center",
              justifyContent: "center",
              bg: "silver",
              gap: 1,
            }}
          >
            <Image width={20} src="/icons/cash.svg" />
            <Label
              sx={{
                width: "fit-content",
                cursor: "pointer",
                color: currentRoute === "/Payroll" && "primary",
                ":hover": { color: "primary" },
              }}
              onClick={() => handleRouteChanged("/Payroll")}
            >
              Trả Công
            </Label>
            {_unpaidPayrolls()?.length ? (
              <Label
                sx={{
                  width: "fit-content",
                }}
              >
                (
                <span style={{ color: "red", fontSize: 16, fontWeight: 900 }}>
                  {_unpaidPayrolls()?.length}
                </span>
                )
              </Label>
            ) : (
              ""
            )}
          </Flex>
          <Flex
            sx={{
              width: "33.33%",
              alignItems: "center",
              justifyContent: "center",
              bg: "silver",
              gap: 1,
            }}
          >
            <Image width={20} src="/icons/settings.svg" />
            <Label
              sx={{
                width: "fit-content",
                cursor: "pointer",
                color: currentRoute === "/Settings" && "primary",
                ":hover": { color: "primary" },
              }}
              onClick={() => handleRouteChanged("/Settings")}
            >
              Cài Đặt
            </Label>
          </Flex>
        </Flex>
      </Flex>
    </Auth>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  setTimeout(() => {
    queryClient.refetchQueries(["get-payroll-list"]);
  }, 10000);
};

export default Layout;
