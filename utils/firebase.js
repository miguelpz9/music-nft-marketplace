import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  //INFORMATION HIDDEN FOR SECURITY
});

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
