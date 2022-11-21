import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase.connect";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
            photoURL: user.photoURL
        });
    }
    return user;
};

const logInWithEmailAndPassword = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        return user;
};

const logout = () => {
    signOut(auth);
};

export {
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
};