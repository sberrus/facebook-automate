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

export interface GroupResType {
	ok: boolean;
	groups: GroupType[];
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
	administrator: boolean;
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

/**
 * Post Scope Types
 *
 */

//
export interface PostScopeType {
	id: string;
	title: string;
	last_post_published: PostPublishedType | undefined;
	page_post_job: PostScopePageJobType | undefined;
	workspaceID: string;
	groups: {
		owned: PostScopeGroupJobType[];
		external: PostScopeGroupJobType[];
	};
	post_scope_status: boolean;
}

export interface PageConfigType {
	page_id: string; // fb page id where to publish
	message: string;
	type: "text" | "img" | "video";
	schedule_config: ScheduleConfigType;
	emotion?: string;
	asset_src?: string;
	location?: string;
	job_status?: "programmed" | "draft" | "trash";
}

interface PostScopePageJobType extends PageConfigType {
	job_id: string;
}

export interface PostPublishedType {
	id: string;
	permalink_url: string;
}

interface PostScopeGroupJobType extends GroupType {
	job_id: string;
	schedule: ScheduleConfigType;
}

export interface ScheduleConfigType {
	date: string;
	hour: string;
	minute: string;
}
