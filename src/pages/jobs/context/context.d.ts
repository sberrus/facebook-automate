export interface ScheduleConfigType {
	day: number;
	time?: {
		hour?: number;
		minute?: number;
	};
}
// request body
export interface PostDataType {
	owner: string;
	page_id: string;
	title: string;
	message: string;
	type: "text" | "img" | "video";
	sharing_groups_ids: string[];
	emotion?: string;
	asset_src?: string;
	location?: string;
	schedule_config?: ScheduleConfigType;
	job_status?: "programmed" | "draft" | "trash";
}

type JobsProviderProps = {
	children: JSX.Element;
};

export type MenuStateType = "menu" | "upload" | "galery";
