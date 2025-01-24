import firebase from 'firebase/compat/app';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const getUserData = async (uid) => {
  try {
    const usersCollection = collection(db, 'users');
    const snapshot = await getDocs(usersCollection);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (data.length > 0) {
      return data; 
    } else {
      console.error('No user documents found!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

