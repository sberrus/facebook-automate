// imports
import { createContext, useState } from "react";
import { createNewJob } from "../../../api/scheduler/scheduler.api";
import { AssetsType } from "../../../types";
import {
	GroupMenuStateType,
	JobsProviderProps,
	MenuStateType,
	PostDataType,
	ScheduleConfigType,
	GroupConfigType,
} from "./jobs.context";
// Login helpers

interface AuthContextType {
	postData: PostDataType | undefined;
	// asset picker
	assetModal: {
		showAssetModal: boolean;
		assetModalState: MenuStateType;
		openModal: () => void;
		closeModal: () => void;
		changeModalState: (_state: MenuStateType) => void;
	};
	// group picker
	groupModal: {
		showGroupModal: boolean;
		groupModalState: GroupMenuStateType;
		groupPicked: GroupConfigType | null;
		openModal: () => void;
		closeModal: () => void;
		changeModalState: (_state: GroupMenuStateType) => void;
		pickGroup: (_group: GroupConfigType) => void;
	};
	setTitle: (title: string) => void;
	setMessage: (message: string) => void;
	addAsset: (_asset: AssetsType) => void;
	setPageID: (page: string) => void;
	addOwnGroup: () => void;
	addExternalGroup: () => void;
	sendJob: () => void;
	updatePostSchedule: (scheduleConfig: ScheduleConfigType) => void;
}

// context
export const JobsContext = createContext<AuthContextType | null>(null);

const JobsProvider = ({ children }: JobsProviderProps) => {
	// schedule data
	const [postData, setPostData] = useState<PostDataType>({
		title: "",
		page_post: {
			page_id: "",
			message: "",
			type: "text",
			schedule_config: {
				date: "0",
				hour: "00",
				minute: "00",
			},
		},
		sharing_groups: [],
	});
	// hooks asset
	const [showAssetModal, setShowAssetModal] = useState(false);
	const [assetModalState, setAssetModalState] = useState<MenuStateType>("menu");
	// groups asset
	const [showGroupModal, setShowGroupModal] = useState(false);
	const [groupModalState, setGroupModalState] = useState<GroupMenuStateType>("menu");
	const [groupPicked, setGroupPicked] = useState<GroupConfigType | null>(null);

	// Context value
	let contextValue: AuthContextType = {
		postData,
		// asset modal controller
		assetModal: {
			/** state */
			showAssetModal,
			assetModalState,
			/** methods */
			openModal() {
				setShowAssetModal(true);
			},
			closeModal() {
				setShowAssetModal(false);
			},
			changeModalState(_state) {
				setAssetModalState(_state);
			},
		},
		// group modal controller
		groupModal: {
			/** state */
			showGroupModal,
			groupModalState,
			groupPicked,
			/** methods */
			openModal() {
				setShowGroupModal(true);
			},
			closeModal() {
				setShowGroupModal(false);
				setGroupPicked(null);
				setGroupModalState("menu");
			},
			changeModalState(_state) {
				setGroupModalState(_state);
			},
			pickGroup(group) {
				setGroupPicked(group);
			},
		},
		/** Update Title */
		setTitle(title) {
			setPostData({
				...postData,
				title,
			});
		},
		/** Update Message */
		setMessage(message) {
			setPostData({
				...postData,
				page_post: {
					...postData.page_post,
					message,
				},
			});
		},
		/** Set pageID*/
		setPageID(page) {
			setPostData({
				...postData,
				page_post: { ...postData.page_post, page_id: page },
			});
		},
		/** Add asset to post model */
		addAsset(_asset: AssetsType) {
			// set asset
			setPostData({
				...postData,
				page_post: {
					...postData?.page_post,
					asset_src: _asset.uri_encoded,
					type: "img",
				},
			});
			// close modal
			this.assetModal.closeModal();
		},
		/** Update Post Schedule */
		updatePostSchedule(scheduleConfig) {
			setPostData({
				...postData,
				page_post: {
					...postData.page_post,
					schedule_config: scheduleConfig,
				},
			});
		},
		/** Add own group to post model */
		addOwnGroup() {
			if (groupPicked) {
				// copy current sharing
				const groupsToSave: GroupConfigType[] = [...postData.sharing_groups];

				groupsToSave.push(groupPicked);

				//save group into model
				setPostData({ ...postData, sharing_groups: groupsToSave });

				// clean and close modal
				setGroupPicked(null);
				this.groupModal.closeModal();
				return;
			}
			console.warn("No group picked!");
		},
		/** Add own group to post model */
		addExternalGroup() {
			if (groupPicked) {
				// copy current sharing
				const groupsToSave: GroupConfigType[] = [...postData.sharing_groups];

				groupsToSave.push(groupPicked);

				//save group into model
				setPostData({ ...postData, sharing_groups: groupsToSave });

				// clean
				setGroupPicked(null);
				this.groupModal.closeModal();
				return;
			}
			console.warn("No group picked!");
		},
		/** Init process to create a new job */
		async sendJob() {
			try {
				const res = await createNewJob(postData);
			} catch (error) {
				console.log("🚀 ~ file: JobsProvider.tsx:171 ~ sendJob ~ error", error);
				alert("Error creating new Post Job");
			}
		},
	};

	return <JobsContext.Provider value={contextValue}>{children}</JobsContext.Provider>;
};

export default JobsProvider;
