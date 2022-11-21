import {
    query,
    getDocs,
    collection,
    where
  } from "firebase/firestore";
  import { db } from "./firebase.connect";
import { getVoteByMatchId } from "./vote.service";
  
  export const getUser = (uid: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(collection(db, "users"), where('uid', '==', uid));
        const response = await getDocs(q);
        if (response.docs.length !== 0) {
            return resolve({
                ...response.docs[0].data(),
                id: response.docs[0].id
            })
        }
        return null;
      } catch (error) {
        reject(error);
      }
    })
  }

  export const getUsersReportByMatch = (matchId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(collection(db, "users"));
        const response = await getDocs(q);
        const voteObj = await getVoteByMatchId(matchId);
        const result = response.docs.map(item => ({
          ...item.data(),
          selected: voteObj[item.id] ? voteObj[item.id].type : undefined
        }));
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }