import { auth } from "../../app/firebase";
import { config } from "../config";

// type
export interface WorkspaceType {
	facebook_admin: string;
	groups: string[];
	linked_pages: string[];
	managers: string[];
}
/**
 * Get the user workspace or null if not found
 */
export const getWorkspace = async (): Promise<WorkspaceType | null> => {
	try {
		const firebaseAuthToken = await auth.currentUser?.getIdToken();
		// get workspace

		if (firebaseAuthToken) {
			const res = await fetch(`${config.apiUrl}/api/workspace`, {
				headers: {
					"x-auth-firebase": firebaseAuthToken,
				},
			});

			if (res.status !== 200) {
				return null;
			}

			const workspaceRes = await res.json();

			return workspaceRes.workspace;
		}
	} catch (error) {
		// user not found
		return null;
	}
	return null;
};
