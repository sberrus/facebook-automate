import { GroupType } from "../../../types";

// schedule
export interface ScheduleConfigType {
	date: string;
	hour?: string;
	minute?: string;
}

// sharing groups model
export interface SharingGroupType {
	group: GroupType;
	schedule: ScheduleConfigType;
}

// post model
export interface PostDataType {
	owner: string;
	page_id: string;
	title: string;
	message: string;
	type: "text" | "img" | "video";
	sharing_groups: SharingGroupType[];
	emotion?: string;
	asset_src?: string;
	location?: string;
	schedule_config?: ScheduleConfigType;
	job_status?: "programmed" | "draft" | "trash";
}

type JobsProviderProps = {
	children: JSX.Element;
};

// asset menu state type
export type MenuStateType = "menu" | "upload" | "galery";

// group picker menu type
export type GroupMenuStateType = "menu" | "own" | "external";
