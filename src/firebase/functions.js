import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  collection,
  setDoc,
  getDocs,
  doc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { uploadBytes, ref } from "firebase/storage";
import { auth, googleProvider, db, storage } from "./config";

export const uploadFile = async (file, name, folderName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const profileRef = ref(storage, `/${folderName}/${name}`);
      uploadBytes(profileRef, file).then(() => resolve());
    } catch (error) {
      reject(error);
    }
  });
};

export const createUser = async (username, pfp) => {
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
          timestamp: serverTimestamp(),
        };

        // Set the new article document in the specified path
        await setDoc(userRef, newUser);
        await uploadFile(pfp, auth.currentUser.uid, "profilePictures");
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
      createUserWithEmailAndPassword(auth, email, password).then(
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
