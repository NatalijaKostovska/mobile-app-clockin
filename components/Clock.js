import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Clock = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const isDisabled = authState.user.userClockId ? true : false;
  const [currentTime, setCurrentTime] = React.useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const saveClockInInfo = async (docId) => {
    const userId = authState.user.id;
    const docRef = doc(collection(db, "users"), userId);
    try {
      await updateDoc(docRef, {
        userClockId: docId,
      });
      setAuthState({
        ...authState,
        user: { ...authState.user, userClockId: docId },
      });
    } catch (error) {
      console.error("Error clocking in:", error);
      throw error;
    }
  };

  const handleClockIn = async () => {
    const userId = authState.user.id;

    const clockInTime = Timestamp.fromDate(new Date());
    let docRef = doc(collection(db, "user-clocked"));
    try {
      await setDoc(
        docRef,
        {
          userId: userId,
          startTime: clockInTime,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error clocking in:", error);
      throw error;
    }
    const docId = docRef.id;
    await saveClockInInfo(docId);
  };

  const handleClockOut = async () => {
    const clockOutTime = Timestamp.fromDate(new Date());
    const docRef = doc(
      collection(db, "user-clocked"),
      authState.user.userClockId
    );
    try {
      await updateDoc(
        docRef,
        {
          endTime: clockOutTime,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error clocking out:", error);
      throw error;
    }
    await saveClockInInfo(null);
  };

  const handleBrakePress = async (breakType) => {
    const pressTime = Timestamp.fromDate(new Date());
    const docRef = doc(
      collection(db, "user-clocked"),
      authState.user.userClockId
    );
    try {
      await updateDoc(
        docRef,
        {
          [breakType]: pressTime,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error pressing break:", error);
      throw error;
    }
  };

  return (
    <View>
      <Text style={styles.header}>Clock In/Out</Text>
      <Text style={styles.time}>{currentTime}</Text>
      <TouchableOpacity
        style={[
          styles.button,
          styles.primaryButton,
          isDisabled && { opacity: 0.5 },
        ]}
        onPress={() => handleClockIn()}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>
          {isDisabled ? "Have a nice work day!" : "Clock In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => handleBrakePress("startBreak")}
        disabled={!isDisabled}
      >
        <Text style={styles.buttonText}>Start Break</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => handleBrakePress("endBreak")}
        disabled={!isDisabled}
      >
        <Text style={styles.buttonText}>End Break</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={() => handleClockOut()}
        disabled={!isDisabled}
      >
        <Text style={[styles.buttonText, !isDisabled && { opacity: 0.5 }]}>
          Clock Out
        </Text>
      </TouchableOpacity>

      <Text style={styles.warningText}>
        You're not scheduled to work. Are you sure you want to clock in?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  time: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: "#0066FF", // Blue button
  },
  secondaryButton: {
    backgroundColor: "#1E1E1E", // Dark gray button
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  warningText: {
    color: "#A0A0A0", // Light gray text
    textAlign: "center",
    marginTop: 15,
    fontSize: 14,
  },
  footerButton: {
    backgroundColor: "#0066FF",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  footerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Clock;
