// group type
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

// sharing groups model
export interface GroupConfigType {
	group: GroupType;
	schedule: ScheduleConfigType;
}

export interface PageType {
	message: string;
	type: "text" | "img" | "video";
	emotion?: string;
	asset_src?: string;
	location?: string;
	job_status?: "programmed" | "draft" | "trash";
	schedule_config?: ScheduleConfigType;
}

// post model
export interface PostDataType {
	title: string;
	page_post: PageType;
	sharing_groups: GroupConfigType[];
}

// schedule config model
export interface ScheduleConfigType {
	date: string;
	hour?: string;
	minute?: string;
}

type JobsProviderProps = {
	children: JSX.Element;
};

// asset menu state type
export type MenuStateType = "menu" | "upload" | "galery";

// group picker menu type
export type GroupMenuStateType = "menu" | "own" | "external";

/**
 * TODO: Move all types to types directory
 */

/**
 *
 *
 *
 * hay que organizar los datos para enviarlos al backend de manera correcta para que se puedan crear los
 * jobs con los datos organizados correctamente....
 */
