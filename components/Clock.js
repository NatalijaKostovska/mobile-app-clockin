import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Clock = () => {
  const { authState } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };
  
  const handleClockIn = async () => {
    const userId = authState.user.id;
    const clockInTime = new Date().toISOString();
    const today = getToday(); 
    const docId = `${userId}_${today}`; 
  
    try {
      const docRef = doc(db, "user-clocked", docId); 
  
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        console.log("Clock-in record already exists for today!");
        return; 
      }
  
      await setDoc(
        docRef,
        {
          userId: userId,
          date: today,
          startTime: clockInTime,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error clocking in:", error);
      throw error;
    }
  };
  
  const handleClockOut = async () => {
    const userId = authState.user.id;
    const clockOutTime = new Date().toISOString();
    const today = getToday();
    const docId = `${userId}_${today}`; 
    try {
      const docRef = doc(db, "user-clocked", docId);
  
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        await setDoc(
          docRef,
          {
            endTime: clockOutTime,
          },
          { merge: true }
        );
        console.log("Clock-out recorded successfully!");
      } else {
        console.error("No clock-in record found for today!");
      }
    } catch (error) {
      console.error("Error clocking out:", error);
      throw error;
    }
  };

    return (
    <View>
      <Text style={styles.header}>Clock In/Out</Text>
      <Text style={styles.time}>{currentTime}</Text>

      <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => handleClockIn()}>
      <Text style={styles.buttonText}>Clock In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
      <Text style={styles.buttonText}>Start Break</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
      <Text style={styles.buttonText}>End Break</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => handleClockOut()}>
      <Text style={styles.buttonText}>Clock Out</Text>
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
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
      },
      time: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
      },
      button: {
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 15,
      },
      primaryButton: {
        backgroundColor: '#0066FF', // Blue button
      },
      secondaryButton: {
        backgroundColor: '#1E1E1E', // Dark gray button
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      warningText: {
        color: '#A0A0A0', // Light gray text
        textAlign: 'center',
        marginTop: 15,
        fontSize: 14,
      },
      footerButton: {
        backgroundColor: '#0066FF',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
      },
      footerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default Clock;