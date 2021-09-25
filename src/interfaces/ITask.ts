import { IMember } from "./IMember";

export interface ITask {
  id?: string;
  fid: string;
  content: string;
  memberId: string;
  member?: IMember;
  price?: string;
  meal?: string;
  gift?: string;
  travel?: string;
  status?: string;
}
