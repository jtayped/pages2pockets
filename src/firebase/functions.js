import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, setDoc, getDoc, getDocs, doc } from "firebase/firestore";
import { auth, googleProvider } from "./config";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (username, mainSchoolID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = doc(db, "/users", auth.currentUser.uid);

      const userCollection = collection(db, "/users");
      const q = query(userCollection, where("username", "==", username));
      const usersWithUsername = await getDocs(q);

      if (!usersWithUsername.empty) {
        reject("Username taken!");
      } else {
        const newUser = {
          username: username,
          mainSchoolID: mainSchoolID,
          timestamp: serverTimestamp(),
        };

        // Set the new article document in the specified path
        await setDoc(userRef, newUser);
        resolve("User Created!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const signUp = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => resolve(userCredentials)
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const signInWithGoogle = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      signInWithPopup(auth, googleProvider).then((userCredentials) =>
        resolve(userCredentials)
      );
    } catch (error) {
      reject(error);
    }
  });
};
