// firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../app/firebase";

// type
export interface WorkspaceType {
	facebook_admin: string;
	groups: string[];
	pages: string[];
	managers: string[];
}

/**
 * Get user workspace data
 */
export const getWorkspace = async (email: string) => {
	const usersRef = doc(db, "users", email);

	try {
		// get user workspace
		const userRes = await getDoc(usersRef);
		const userData = userRes.data();
		const userWorkspace = userData?.workspace;

		// get workspace data
		const workspaceRef = doc(db, "workspaces", userWorkspace);
		const workspaceData = await getDoc(workspaceRef);

		return workspaceData.data();
	} catch (error) {
		console.log(error);
	}
};
