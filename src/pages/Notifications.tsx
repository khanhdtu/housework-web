import { Box as View, Flex as Box, Label } from "theme-ui";
import BaseLayout from "../layouts";
import { useGetNotificationQuery } from "../services";

const Notifications = () => {
  const { data } = useGetNotificationQuery();
  const _friendlyDate = (timestamp: number) => {
    const datetime = new Date(timestamp);
    const date = datetime.getDate();
    const month = datetime.getMonth() + 1;
    return `${date >= 10 ? date : `0${date}`}-${
      month >= 10 ? month : `0${month}`
    }-${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}`;
  };
  return (
    <BaseLayout>
      <Box sx={{ flexDirection: "column", gap: 1 }}>
        {data?.list.map((notification) => (
          <Label
            key={notification.id}
            dangerouslySetInnerHTML={{
              __html: `<span>[${_friendlyDate(
                notification.taskCreatedAt
              )}] <span style="color: orange">${notification.task}</span> ${
                notification.message
              } <span style="color: orange">${
                notification.member
              }</span></span>`,
            }}
          />
        ))}
      </Box>
    </BaseLayout>
  );
};

export default Notifications;
