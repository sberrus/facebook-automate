import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/firebase";

export type LoginProps = {
	email: string;
	password: string;
};

export const firebaseSignIn = async ({ email, password }: LoginProps) => {
	try {
		const signInRes = await signInWithEmailAndPassword(auth, email, password);
		return signInRes;
	} catch (error: any) {
		throw new Error(error);
	}
};
