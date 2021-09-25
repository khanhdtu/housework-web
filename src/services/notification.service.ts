import { useQuery } from "react-query";
import { INotification } from "../interfaces/INotification";
import { IResponseList } from "../interfaces/IResponseList";
import request from "../utils/request";
import { getCurrentFamily } from "../utils/storage";

export function useGetNotificationQuery() {
  return useQuery(
    "get-notification-list",
    (): Promise<IResponseList<INotification>> =>
      request.get(`notification?fid=${getCurrentFamily().fid}`)
  );
}
