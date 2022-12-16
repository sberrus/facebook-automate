// imports
import { createContext, useState } from "react";
import { AssetsType } from "../../../types";
import { GroupMenuStateType, JobsProviderProps, MenuStateType, PostDataType, SharingGroupType } from "./context";
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
		groupPicked: SharingGroupType | null;
		openModal: () => void;
		closeModal: () => void;
		changeModalState: (_state: GroupMenuStateType) => void;
		pickGroup: (_group: SharingGroupType) => void;
	};
	addAsset: (_asset: AssetsType) => void;
	addGroup: () => void;
}

// context
export const JobsContext = createContext<AuthContextType | null>(null);

const JobsProvider = ({ children }: JobsProviderProps) => {
	// hooks asset
	const [showAssetModal, setShowAssetModal] = useState(false);
	const [assetModalState, setAssetModalState] = useState<MenuStateType>("menu");
	// groups asset
	const [showGroupModal, setShowGroupModal] = useState(false);
	const [groupModalState, setGroupModalState] = useState<GroupMenuStateType>("menu");
	const [groupPicked, setGroupPicked] = useState<SharingGroupType | null>(null);

	// schedule data
	const [postData, setPostData] = useState<PostDataType>({
		owner: "",
		page_id: "",
		title: "",
		message: "",
		type: "text",
		sharing_groups: [],
	});

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
			},
			changeModalState(_state) {
				setGroupModalState(_state);
			},
			pickGroup(group) {
				setGroupPicked(group);
			},
		},
		/** Add asset to post model */
		addAsset(_asset: AssetsType) {
			// set asset
			setPostData({ ...postData, asset_src: _asset.uri_encoded, type: "img" });
			// close modal
			this.assetModal.closeModal();
		},
		/** Add group to post model */
		addGroup() {
			if (groupPicked) {
				// copy current sharing
				const groupsToSave: SharingGroupType[] = [...postData.sharing_groups];

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
	};

	return <JobsContext.Provider value={contextValue}>{children}</JobsContext.Provider>;
};

export default JobsProvider;
