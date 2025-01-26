import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

const CreateAccountScreen = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    if (!userDetails.email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        password
      );

      const docRef = doc(collection(db, "users"));
      const docId = docRef.id;

      await setDoc(docRef, {
        ...userDetails,
        uid: userCredentials.user.uid,
        id: docId,
        roleId: "LrODYlSXmJtEPzzoam2w",
      });

      Alert.alert("Success", "User account created!");
      navigate("/login");
    } catch (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const handleUserDetailsChange = (value, type) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [type]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Create Account</Text>
      <View>
        <TextInput
          placeholder="Email"
          value={userDetails.email}
          onChangeText={(value) => handleUserDetailsChange(value, "email")}
          keyboardType="email-address"
          style={styles.input}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={!passwordVisible}
            style={[styles.input, styles.passwordInput, { marginBottom: 0 }]}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.label, { marginBottom: 20 }]}>
            (Password should be at least 6 characters )
          </Text>
        </View>
        <TextInput
          placeholder="First name"
          value={userDetails.firstName}
          onChangeText={(value) => handleUserDetailsChange(value, "firstName")}
          style={styles.input}
        />
        <TextInput
          placeholder="Last name"
          value={userDetails.lastName}
          onChangeText={(value) => handleUserDetailsChange(value, "lastName")}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone number"
          value={userDetails.phoneNumber}
          onChangeText={(value) =>
            handleUserDetailsChange(value, "phoneNumber")
          }
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigate("/login")}
        >
          <Text style={styles.logInButtonText}>
            Do you have an account? Log in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  eyeText: {
    color: "#999",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  logInButtonText: {
    color: "#A0A0A0",
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
});

export default CreateAccountScreen;
