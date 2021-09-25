import { IMember } from "./IMember";

export interface IFamily {
  id?: string;
  fid: string;
  password: string;
  displayName: string;
  avatar?: string;
  members?: IMember[];
  token?: string;
}
