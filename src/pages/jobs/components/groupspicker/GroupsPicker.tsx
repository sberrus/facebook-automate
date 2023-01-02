// imports
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
// components
import Menu from "./Menu";
// context
import useJobs from "../../context/useJobs";
// styles
import "./groupspicker.scss";
import OwnGroups from "./OwnGroups";
import ExternalGroups from "./ExternalGroups";

//
const GroupsPicker = () => {
	// hooks
	const jobs = useJobs();
	// methods
	const handleAddGroup = () => {
		jobs?.addOwnGroup();
	};
	return (
		<div className="group-picker">
			<Button onClick={jobs?.groupModal.openModal} className="button">
				Add new group schedule <i className="bi bi-people"></i>
			</Button>

			<Modal
				show={jobs?.groupModal.showGroupModal}
				onHide={jobs?.groupModal.closeModal}
				className="group-picker-modal"
				dialogClassName="body"
			>
				<Modal.Header closeButton>
					<Modal.Title>Configure a group post scheduling</Modal.Title>
				</Modal.Header>
				<Modal.Body className="body">
					{jobs?.groupModal.groupModalState === "menu" && <Menu />}
					{jobs?.groupModal.groupModalState === "own" && <OwnGroups />}
					{jobs?.groupModal.groupModalState === "external" && <ExternalGroups />}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={jobs?.groupModal.closeModal}>
						Close
					</Button>
					{!!jobs?.groupModal.groupPicked && (
						<Button variant="primary" onClick={handleAddGroup}>
							Pick Group
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default GroupsPicker;
