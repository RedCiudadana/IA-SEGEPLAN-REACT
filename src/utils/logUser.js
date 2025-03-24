import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const logUserLogin = async (user) => {
  try {
    await addDoc(collection(db, "user_logs"), {
      email: user.email,
      uid: user.uid,
      timestamp: serverTimestamp(),
      action: "login"
    });
  } catch (error) {
    console.error("Error al registrar el log:", error);
  }
};
