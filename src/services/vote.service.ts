import {
  query,
  getDocs,
  collection,
  updateDoc,
  where,
  addDoc,
  doc
} from "firebase/firestore";
import { db } from "./firebase.connect";

export const vote = (userId: string, matchId: string, type: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(
        collection(db, "votes"),
        where("userRef", "==", userId),
        where("matchRef", "==", matchId)
      );
      const response = await getDocs(q);
      if (response.docs.length > 0) {
        const docRef = doc(db, 'votes', response.docs[0].id);
        await updateDoc(docRef, {
          type
        });
      } else {
        await addDoc(collection(db, "votes"), {
          matchRef: matchId,
          userRef: userId,
          type
        })
      }
      resolve({
        matchRef: matchId,
        userRef: userId,
        type
      });
    } catch (error) {
      reject(error);
    }
  })
}


export const getVoteByMatchId = (matchId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(collection(db, "votes"), where("matchRef", "==", matchId));
      const response = await getDocs(q);
      const result = {};
      if (response.docs.length > 0) {
        response.docs.forEach(item => {
          result[item.data().userRef] = item.data();
        });
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}