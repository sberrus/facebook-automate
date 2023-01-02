import { auth } from "../../app/firebase";
import { PageResType, WorkspaceType } from "../../types";
import { GroupResType } from "../../types/workspace";
import { config } from "../config";

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

/**
 * Add page to workspace pages collection
 */
export const addPageToWorkspace = async (pageID: string) => {
	try {
		const firebaseAuthToken = await auth.currentUser?.getIdToken();

		/**
		 * INTEGRATE ADD PAGE FUNCTIONALITY
		 */
		if (firebaseAuthToken) {
			const res = await fetch(`${config.apiUrl}/api/workspace/page`, {
				method: "POST",
				headers: {
					"x-auth-firebase": firebaseAuthToken,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					page_id: pageID,
				}),
			});

			if (res.status !== 200) {
				return null;
			}
		}
	} catch (error) {
		// user not found
		console.log(error);
		return null;
	}
};

/**
 * Get the collection of facebook pages managed by admin
 */
export const getAdminPages = async () => {
	// get firebase token
	const firebaseAuthToken = await auth.currentUser?.getIdToken();
	// check if token is received
	if (firebaseAuthToken) {
		const res = await fetch(`${config.apiUrl}/api/workspace/pages`, {
			headers: { "x-auth-firebase": firebaseAuthToken },
		});
		// if not 200
		if (res.status !== 200) {
			return;
		}

		// handle res
		const pages: PageResType = await res.json();
		return pages.pages;
	}
};

/**
 * Delete pages from workspace pages
 * @param pageID facebook page id
 */
export const deletePage = async (pageID: string) => {
	try {
		const firebaseAuthToken = await auth.currentUser?.getIdToken();
		if (firebaseAuthToken) {
			const res = await fetch(`${config.apiUrl}/api/workspace/page`, {
				method: "DELETE",
				headers: {
					"x-auth-firebase": firebaseAuthToken,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					page_id: pageID,
				}),
			});

			if (res.status !== 200) {
				return null;
			}
		}
	} catch (error) {
		// user not found
		console.log(error);
		return null;
	}
};

/**
 * Get the list of groups managed by admin
 */
export const getOwnGroups = async () => {
	// get firebase token
	const firebaseAuthToken = await auth.currentUser?.getIdToken();
	// check if token is received
	if (firebaseAuthToken) {
		try {
			const res = await fetch(`${config.apiUrl}/api/groups`, {
				headers: { "x-auth-firebase": firebaseAuthToken },
			});
			// if not 200
			if (res.status !== 200) {
				return;
			}

			// handle res
			const groups: GroupResType = await res.json();
			return groups.groups;
		} catch (error) {
			console.log(error);
		}
	}
};

/**
 * Given a group id, retrieve its data if valid.
 * @param groupUrl
 */
export const checkExternalGroup = async (groupUrl: string) => {
	// get firebase token
	const firebaseAuthToken = await auth.currentUser?.getIdToken();
	// check if group is valid
	if (firebaseAuthToken) {
		try {
			const httpRes = await fetch(`${config.apiUrl}/api/groups/external?url=${groupUrl}`, {
				headers: { "x-auth-firebase": firebaseAuthToken },
			});

			if (httpRes.status !== 200) {
				return null;
			}

			const res = httpRes.json();
			return res;
		} catch (error) {
			console.log(error);
		}
	}
};
