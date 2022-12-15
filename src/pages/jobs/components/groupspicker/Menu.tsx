// imports
import { Button } from "react-bootstrap";
import { GroupMenuStateType } from "../../context/context";
import useJobs from "../../context/useJobs";
// styles
import "./groupspicker.scss";

//
const Menu = () => {
	// hooks
	const jobs = useJobs();

	//
	const handleModalState = (_state: GroupMenuStateType) => {
		jobs?.groupModal.changeModalState(_state);
	};
	return (
		<div className="actions">
			<Button
				className="action-button own-group"
				onClick={() => {
					handleModalState("own");
				}}
			>
				<div>
					<i className="bi bi-person-lines-fill"></i>
				</div>
				<p>Add owned group</p>
			</Button>
			<Button
				className="action-button external-group"
				onClick={() => {
					handleModalState("external");
				}}
			>
				<div>
					<i className="bi bi-box-arrow-up-right"></i>
				</div>
				<p>Add external group</p>
			</Button>
		</div>
	);
};

export default Menu;
