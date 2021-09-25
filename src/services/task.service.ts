import { useMutation, useQuery, useQueryClient } from "react-query";
import { IResponseList } from "../interfaces/IResponseList";
import { ITask } from "../interfaces/ITask";
import { getCurrentFamily, getCurrentMemberId } from "../utils/storage";
import request from "../utils/request";

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    (variables: ITask): Promise<ITask> => request.post("tasks", variables),
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.refetchQueries(["get-task-list"]);
        }
      },
    }
  );
}

export function useGetTaskListQuery(fid: string) {
  return useQuery(
    ["get-task-list", fid],
    (): Promise<IResponseList<ITask>> =>
      request.get(`tasks?fid=${fid}&memberId=${getCurrentMemberId()}`)
  );
}

export function useCompleteTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    (variables: { fid: string; tid: string }): Promise<ITask> =>
      request.put("tasks", variables),
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.refetchQueries(["get-task-list"]);
          queryClient.refetchQueries(["get-payroll-list"]);
        }
      },
    }
  );
}

export function useGetPayrollListQuery() {
  return useQuery(
    ["get-payroll-list"],
    (): Promise<IResponseList<ITask>> =>
      request.get(
        `tasks/payrolls?fid=${
          getCurrentFamily().fid
        }&memberId=${getCurrentMemberId()}`
      )
  );
}

export function useConfirmPayrollMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    (variables: { fid: string; tid: string }): Promise<ITask> =>
      request.put("tasks/payrolls", variables),
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.refetchQueries(["get-payroll-list"]);
        }
      },
    }
  );
}
