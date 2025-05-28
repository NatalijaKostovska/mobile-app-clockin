import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Layout from "../../components/Layout";
import { Calendar } from "react-native-calendars";
import {
  collection,
  DocumentReference,
  getDoc,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { User } from "firebase/auth";
import { getItemsQuery } from "../../firebase/firestoreUtils";

const ScheduleCalendar = () => {
  const [workingUsers, setWorkingUsers] = useState<User[]>([]);
  const { authState } = useContext(AuthContext);

  const handleGetWorkers = async (date: string) => {
    const pickedDate = new Date(date);
    const startDay = Timestamp.fromDate(
      new Date(
        pickedDate.getFullYear(),
        pickedDate.getMonth(),
        pickedDate.getDate(),
        0,
        0,
        0
      )
    );
    const endDay = Timestamp.fromDate(
      new Date(
        pickedDate.getFullYear(),
        pickedDate.getMonth(),
        pickedDate.getDate(),
        23,
        59,
        59,
        999
      )
    );

    const q = query(
      collection(db, "scheduled-shifts"),
      where("date", ">=", startDay),
      where("date", "<=", endDay)
    );
    const docs = await getItemsQuery(q);

    if (docs?.[0]?.workersIds?.length) {
      docs[0].workersIds?.forEach(async (userRef: DocumentReference) => {
        const user = await getDoc(userRef);

        setWorkingUsers((prevData) => ({ ...prevData, user }));
      });
    }
  };

  return (
    <Layout isAdmin={authState.user.isAdmin}>
      <Calendar
        onDayPress={(date) => {
          handleGetWorkers(date.dateString);
        }}
      />

      {/* 
      Tuka trebe da se provere dali workingUsers ima denot.
      Ako ima working users da se prikazat i da ima opcija da gi izbrise nekoi od smena
      i isto taka da moze da dodade nekoj ako trebe plus.
      Ako nema working users da ima kopce za da moze da dodade user.
      Tuka ke ni trebe i lista od useri i posle toa da gi koristime tie podatoci,
      trebe da se razmisle dali da stavime redux ili zustand za da mozime da gi cuvame tie podatoci
      bidejki segde gi koristime i imame potreba od niv. 
      */}
    </Layout>
  );
};

export default ScheduleCalendar;
