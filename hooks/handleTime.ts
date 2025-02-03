import { collection, query, where } from "firebase/firestore";
import { getItemsQuery } from "../firebase/firestoreUtils";
import { db } from "../firebase/firebaseConfig";
import moment from "moment";

export const handleTimeCalculation = async (userId: string, month: number) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), month, 1, 0, 0, 0);
  const startOfNextMonth = new Date(now.getFullYear(), month + 1, 1, 0, 0, 0);

  const employeeClocks = await getItemsQuery(
    query(
      collection(db, "user-clocked"),
      where("userId", "==", userId),
      where("startTime", ">=", startOfMonth),
      where("startTime", "<", startOfNextMonth)
    )
  );

  let totalMinutes = 0;
  employeeClocks.map(
    (item) =>
      (totalMinutes += moment(item.endTime.toDate()).diff(
        moment(item.startTime.toDate()),
        "minutes"
      ))
  );

  return { employeeClocks, totalHours: Math.ceil((totalMinutes / 60) * 4) / 4 };
};
