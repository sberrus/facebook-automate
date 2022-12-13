// imports
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
// components
import Gallery from "./Gallery";
// context
import useJobs from "../../context/useJobs";
// style
import style from "../../newjob.module.scss";
import "./imagepicker.scss";
import UploadFile from "./UploadFile";
// types
import { MenuStateType } from "../../context/context";

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
				show={jobs?.assetModal.show}
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
					{jobs?.assetModal.modalState === "menu" && (
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
					{jobs?.assetModal.modalState === "galery" && (
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
					{jobs?.assetModal.modalState === "upload" && (
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
			</Modal>
		</>
	);
};

export default ImagePicker;
