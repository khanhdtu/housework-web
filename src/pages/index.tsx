import BaseLayout from "../layouts";
import HomePage from "./Home";
import { useState } from "react";
import { useGetFamilyQuery } from "../services";

const IndexPage = (): JSX.Element => {
  const { data: family } = useGetFamilyQuery();
  const [task, createTask] = useState<number>(0);
  return (
    <BaseLayout onCreateTask={() => createTask(new Date().getTime())}>
      <HomePage
        family={family}
        hasTask={task}
        resetTask={() => createTask(0)}
      />
    </BaseLayout>
  );
};

export default IndexPage;
