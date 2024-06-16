import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { MatchModel } from "../interface/match.model";
import { db } from "./firebase.connect";

const getVotesByMatchIds = async (userId: string, matchIds: string[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = {};
      const votes = await getDocs(
        query(collection(db, "votes"),
          where("userRef", "==", userId)));
      if (votes.docs.length > 0) {
        votes.docs.forEach(item => {
          result[item.data().matchRef] = item.data();
        });
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}

export const getMatches = (userId: string): Promise<MatchModel[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(collection(db, "matches"));
      const response = await getDocs(q);
      const matches: MatchModel[] = [];
      const pastMatchIds = [];
      response.docs.forEach(res => {
        const match = { ...res.data(), id: res.id } as unknown as MatchModel;
        matches.push(match);
        pastMatchIds.push(match.id);
      });
      const pastMatch = await getVotesByMatchIds(userId, pastMatchIds);
      resolve(matches.map(match => ({ ...match, selected: pastMatch[match.id] && pastMatch[match.id].type })));
    } catch (error) {
      reject(error);
    }
  })
}

export const getMatch = (matchId: string): Promise<MatchModel> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await getDoc(doc(db, "matches", matchId));
      if (!result.exists()) {
        reject({ message: 'Not Found' });
        return;
      }
      resolve({ ...result.data(), id: result.id } as unknown as MatchModel);
    } catch (error) {
      reject(error);
    }
  })
}

export const addMatch = (match: MatchModel) => {
  return new Promise(async (resolve, reject) => {
    try {
      await addDoc(collection(db, "matches"), {
        ...match
      });
      resolve({})
    } catch (error) {
      reject(error);
    }
  })
}

export const updateMatch = (id: string, match: MatchModel) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, 'matches', id);
      await updateDoc(docRef, {
        ...match
      });
      resolve({})
    } catch (error) {
      reject(error);
    }
  })
}

export const deleteMatch = async (id: string) => {
  await deleteDoc(doc(db, "matches", id));
}