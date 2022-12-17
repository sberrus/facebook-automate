// imports
import { Button, Modal } from "react-bootstrap";
// components
import Gallery from "./Gallery";
import UploadFile from "./UploadFile";
// context
import useJobs from "../../context/useJobs";
// style
import style from "../../jobsconfigure.module.scss";
import "./imagepicker.scss";
// types
import { MenuStateType } from "../../context/jobs.context";

const ImagePicker = () => {
	// hooks
	const jobs = useJobs();

	// show controller
	const handleClose = () => jobs?.assetModal.closeModal();
	const handleShow = () => jobs?.assetModal.openModal();

	const handleState = (_state: MenuStateType) => {
		jobs?.assetModal.changeModalState(_state);
	};

	const isMobile = () => {
		return window.innerWidth < 800 ? true : undefined;
	};
	return (
		<>
			<Button onClick={handleShow} className={style.inputButtons}>
				<i className="bi bi-images"></i>photo/video
			</Button>

			<Modal
				show={jobs?.assetModal.showAssetModal}
				onHide={handleClose}
				dialogClassName="body"
				className="imagepicker"
				fullscreen={isMobile()}
				onExit={() => {
					handleState("menu");
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title>Asset Picker</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Menu view */}
					{jobs?.assetModal.assetModalState === "menu" && (
						<div className="menu">
							<Button
								className="options-buttons"
								onClick={() => {
									handleState("galery");
								}}
							>
								<i className="bi bi-images button-icon"></i>
								<span>Use Gallery</span>
							</Button>
							<Button className="options-buttons" onClick={() => handleState("upload")}>
								<i className="bi bi-cloud-upload button-icon"></i>
								<span>Upload new Image</span>
							</Button>
						</div>
					)}
					{/* Saved images view */}
					{jobs?.assetModal.assetModalState === "galery" && (
						<>
							<Button
								className="back-button"
								onClick={() => {
									handleState("menu");
								}}
							>
								<i className="bi bi-arrow-left"></i> Back to menu
							</Button>
							<Gallery />
						</>
					)}
					{jobs?.assetModal.assetModalState === "upload" && (
						<>
							<Button
								className="back-button"
								onClick={() => {
									handleState("menu");
								}}
							>
								<i className="bi bi-arrow-left"></i> Back to menu
							</Button>
							<UploadFile />
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ImagePicker;
