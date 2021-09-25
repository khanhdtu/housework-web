import { useMutation, useQuery, useQueryClient } from "react-query";
import { IFamily } from "../interfaces/IFamily";
import request from "../utils/request";
import { setCurrentFamily, getCurrentFamily } from "../utils/storage";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    (variables: { fid: string; password: string }): Promise<IFamily> =>
      request.post("auth", variables),
    {
      onSuccess: (family: IFamily) => {
        setCurrentFamily(family);
        queryClient.refetchQueries(["get-family"]);
      },
    }
  );
}

export function useCreateFamilyMutation() {
  return useMutation((variables: IFamily) => request.post("family", variables));
}

export function useGetFamilyQuery() {
  return useQuery("get-family", () => getCurrentFamily());
}
