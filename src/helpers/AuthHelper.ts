import { FacebookAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// types
import { LoginProps } from "../types";

/**
 * Sign in with email and password
 * @param param0
 * @returns
 */
export const firebaseSignIn = async ({ email, password }: LoginProps) => {
	const auth = getAuth();
	try {
		const signInRes = await signInWithEmailAndPassword(auth, email, password);
		return signInRes;
	} catch (error: any) {
		throw new Error(error);
	}
};

/**
 * Sign in with fafcebook provider
 */
export const firebaseSignInWithFacebook = async () => {
	const auth = getAuth();
	const provider = new FacebookAuthProvider();
	try {
		return await signInWithPopup(auth, provider);
	} catch (error) {
		console.log(error);
	}
};
