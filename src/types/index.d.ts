/**  WORKSPACE TYPES */
export interface WorkspaceType {
	facebook_admin: string;
	linked_groups: GroupType[];
	linked_pages: PageType[];
	managers: string[];
}

// admin pages fetch response
export interface PageResType {
	ok: boolean;
	pages: PageType[];
}

// Group data type
export interface GroupType {
	name: string;
	id: string;
	picture: {
		data: {
			height: number;
			width: number;
			is_silhouette: boolean;
			url: string;
		};
	};
}

// Page data type
export interface PageType {
	id: string;
	name: string;
	picture: {
		data: {
			height: number;
			width: number;
			is_silhouette: boolean;
			url: string;
		};
	};
}

/** LOGIN TYPES */
export type LoginProps = {
	email: string;
	password: string;
};
