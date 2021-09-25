import SignIn from "./SignIn";
import { useGetFamilyQuery } from "../../services";

const Auth = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { data } = useGetFamilyQuery();
  if (data?.token) return <>{children}</>;
  return <SignIn />;
};

export default Auth;
