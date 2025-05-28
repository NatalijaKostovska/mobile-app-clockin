import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
} from "firebase/firestore";

// Add data to a collection
export const addItem = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    throw error.message;
  }
};

// Get all items from a collection
export const getItems = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(query(collection(db, collectionName)));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error.message;
  }
};

// Get all items from a collection
export const getItemsQuery = async (queryRef) => {
  try {
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error.message;
  }
};

// Update an item
export const updateItem = async (collectionName, id, updatedData) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, updatedData);
  } catch (error) {
    throw error.message;
  }
};

// Delete an item
export const deleteItem = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error.message;
  }
};
