import moment from "moment";
import {
  query,
  getDocs,
  collection
} from "firebase/firestore";
import { db } from "./firebase.connect";
import { TeamModel } from "../interface/team.model";

export const getTeams = (): Promise<TeamModel[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(collection(db, "teams"));
      const response = await getDocs(q);
      resolve(response.docs.map(team => ({ ...team.data(), id: team.id } as unknown as TeamModel)));
    } catch (error) {
      reject(error);
    }
  })
}