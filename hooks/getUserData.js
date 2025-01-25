import firebase from 'firebase/compat/app';
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from '../firebase/firebaseConfig';

export const getUserData = async (uid) => {
    try {

        const docQuery = query(collection(db, "users"), where("uid", '==', uid));

        const querySnapshot = await getDocs(docQuery);
        const data = querySnapshot.docs.find(doc => doc.data().uid === uid).data();
        if (data) {
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

