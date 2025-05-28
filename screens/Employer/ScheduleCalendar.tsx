import { useContext } from "react";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthContext";

const ScheduleCalendarEmployee = () => {
  const { authState } = useContext(AuthContext);

  return (
    <Layout isAdmin={authState.user.isAdmin}>
      <></>
    </Layout>
  );
};

export default ScheduleCalendarEmployee;
