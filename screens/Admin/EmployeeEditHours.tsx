import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthContext";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet } from "react-native";

type UserClocking = {
  userId: string;
  startTime: Timestamp;
  endTime: Timestamp;
};

const EmployeeEditHours = () => {
  const { id, colckingId } = useParams();
  const [clockingData, setClockingData] = useState<UserClocking | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState<"startTime" | "endTime">(
    "startTime"
  );

  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetClockingValues = async () => {
      const result = await getDoc(doc(db, "user-clocked", colckingId));

      setClockingData(result.data() as UserClocking);
    };

    handleGetClockingValues();
  }, [colckingId]);

  const showDatePicker = (type: "startTime" | "endTime") => {
    setPickerType(type);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setClockingData((prevData) => ({
      ...prevData,
      [pickerType]: Timestamp.fromDate(date),
    }));

    hideDatePicker();
  };

  const handleSave = async () => {
    let docRef = doc(collection(db, "user-clocked"), colckingId);
    try {
      await setDoc(docRef, clockingData, { merge: true });

      navigate(`/employee-edit/${id}`);
    } catch (error) {
      console.error("Error saving clocking data change:", error);
      throw error;
    }
  };

  return (
    <Layout isAdmin={authState.user.isAdmin}>
      <View style={styles.container}>
        <View style={{ marginBottom: 50 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => showDatePicker("startTime")}
          >
            <View style={styles.timeDisplay}>
              <Text style={styles.timeLabel}>Start Time:</Text>
              <Text style={styles.timeValue}>
                {clockingData?.startTime
                  ? moment(clockingData.startTime.toDate()).format(
                      "DD/MM/YYYY HH:mm"
                    )
                  : "Not selected"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => showDatePicker("endTime")}
          >
            <View style={styles.timeDisplay}>
              <Text style={styles.timeLabel}>End Time:</Text>
              <Text style={styles.timeValue}>
                {clockingData?.endTime
                  ? moment(clockingData.endTime.toDate()).format(
                      "DD/MM/YYYY HH:mm"
                    )
                  : "Not selected"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
  },
  timeDisplay: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    width: "100%",
    justifyContent: "space-between",
    color: "#fff",
  },
  timeLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  timeValue: {
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#0066FF",
    padding: 5,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#0066FF",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    bottom: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
export default EmployeeEditHours;
