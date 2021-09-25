export interface IMember {
  id: string;
  displayName: string;
  avatar?: string;
  role: "parent" | "children";
}
