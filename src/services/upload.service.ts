import { useMutation } from "react-query";
import request from "../utils/request";

export function useUploadMutation() {
  return useMutation((variables: { file: File }): Promise<string> => {
    const formData = new FormData();
    formData.append("file", variables.file);
    return request.post("family/files", formData);
  });
}
