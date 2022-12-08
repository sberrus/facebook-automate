// imports
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
// components
import Gallery from "./Gallery";
// style
import style from "../../newjob.module.scss";
import "./imagepicker.scss";
// types
type MenuStateType = "menu" | "upload" | "galery";

const ImagePicker = () => {
	const [show, setShow] = useState(false);
	const [modalState, setModalState] = useState<MenuStateType>("menu");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// state handler
	const handleState = (_state: MenuStateType) => {
		setModalState(_state);
	};
	return (
		<>
			<Button onClick={handleShow} className={style.inputButtons}>
				<i className="bi bi-images"></i>photo/video
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				className="imagepicker"
				onExit={() => {
					handleState("menu");
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title>Asset Picker</Modal.Title>
				</Modal.Header>
				<Modal.Body className="body">
					{/* Menu view */}
					{modalState === "menu" && (
						<div className="menu">
							<Button
								className="options_buttons"
								onClick={() => {
									handleState("galery");
								}}
							>
								<i className="bi bi-images button-icon"></i>
								<span>Use Gallery</span>
							</Button>
							<Button className="options_buttons" onClick={() => handleState("upload")}>
								<i className="bi bi-cloud-upload button-icon"></i>
								<span>Upload new Image</span>
							</Button>
						</div>
					)}
					{/* Saved images view */}
					{modalState === "galery" && <Gallery />}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ImagePicker;
