import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export type LoginProps = {
	email: string;
	password: string;
};

export const firebaseSignIn = async ({ email, password }: LoginProps) => {
	const auth = getAuth();
	try {
		const signInRes = await signInWithEmailAndPassword(auth, email, password);
		return signInRes;
	} catch (error: any) {
		throw new Error(error);
	}
};
