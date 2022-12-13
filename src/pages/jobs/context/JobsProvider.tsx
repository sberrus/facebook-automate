// imports
import { createContext, useState } from "react";
import { AssetsType } from "../../../types";
import { JobsProviderProps, MenuStateType, PostDataType } from "./context";
// Login helpers

interface AuthContextType {
	postData: PostDataType | undefined;
	assetModal: {
		show: boolean;
		modalState: MenuStateType;
		openModal: () => void;
		closeModal: () => void;
		changeModalState: (_state: MenuStateType) => void;
	};
	setAsset: (_asset: AssetsType) => void;
}

// context
export const JobsContext = createContext<AuthContextType | null>(null);

const JobsProvider = ({ children }: JobsProviderProps) => {
	// hooks
	const [show, setShow] = useState(false);
	const [postData, setPostData] = useState<PostDataType>({
		owner: "",
		page_id: "",
		title: "",
		message: "",
		type: "text",
		sharing_groups_ids: [""],
	});
	const [modalState, setModalState] = useState<MenuStateType>("menu");
	// Context value
	let contextValue: AuthContextType = {
		postData,
		assetModal: {
			/** state */
			show,
			modalState,
			/** methods */
			openModal() {
				setShow(true);
			},
			closeModal() {
				setShow(false);
			},
			changeModalState(_state: MenuStateType) {
				setModalState(_state);
			},
		},
		setAsset(_asset: AssetsType) {
			// set asset
			setPostData({ ...postData, asset_src: _asset.uri_encoded, type: "img" });
			// close modal
			this.assetModal.closeModal();
		},
	};

	return <JobsContext.Provider value={contextValue}>{children}</JobsContext.Provider>;
};

export default JobsProvider;
