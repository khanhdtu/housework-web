import { IFamily } from "../interfaces/IFamily";

export const getCurrentFamily = (): IFamily => {
  const family = localStorage.getItem("current_family");
  if (family) {
    return JSON.parse(family) as IFamily;
  }
  return {
    id: "",
    fid: "",
    displayName: "",
    password: "",
    token: "",
  };
};

export const setCurrentFamily = (family: IFamily): void => {
  return localStorage.setItem("current_family", JSON.stringify(family));
};

export const getCurrentMemberId = (): string => {
  const currentMemberId = localStorage.getItem("current_member_id");
  if (currentMemberId) return currentMemberId;
  return "all";
};

export const setCurrentMemberId = (memberId: string) => {
  return localStorage.setItem("current_member_id", memberId);
};

export const deleteCurrentFamily = (): void => {
  return localStorage.removeItem("current_family");
};

export const getCurrentRoute = (): string => {
  const currentRoute = localStorage.getItem("current_route");
  if (currentRoute) return currentRoute;
  return "";
};

export const setCurrentRoute = (route: string) => {
  return localStorage.setItem("current_route", route);
};
