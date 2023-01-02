import { useState, ChangeEvent, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { checkExternalGroup } from "../../../../api/workspace/workspace.api";
import { GroupType } from "../../../../types";
import useJobs from "../../context/useJobs";
// styles
import "./groupspicker.scss";
// types
type CheckStatusType = "waiting" | "loading" | "checked" | "error";
/**
 * TODO: Use group picked layout and style from "own grop component" and set the schedule config
 * TODO: Update context to send the externalgroup data
 * TODO: Handle own group error - if admin is owner of group sugest change to own group instead.
 * @returns
 */

const ExternalGroups = () => {
	// hooks
	const jobs = useJobs();
	// states
	const [checkStatus, setCheckStatus] = useState<CheckStatusType>("waiting");
	const [url, setUrl] = useState("");
	const [datePicked, setDatePicked] = useState({ date: "1", hour: "00", minute: "00" });
	const [group, setGroup] = useState<GroupType | null>(null);

	// methods
	const updateGroupPicked = () => {
		if (group) {
			jobs?.groupModal.pickGroup({
				owner: false,
				group: group,
				schedule: {
					date: datePicked.date,
					hour: datePicked.hour,
					minute: Number(datePicked.minute) > 59 ? "59" : datePicked.minute,
				},
			});
		}
	};

	// handlers
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	const handleClick = async () => {
		// change status to loading
		setCheckStatus("loading");
		try {
			// check group and pick it
			const groupValidated = await checkExternalGroup(url);

			// update context group picked
			if (groupValidated) {
				setGroup(groupValidated);
				jobs?.groupModal.pickGroup({
					owner: false,
					group: groupValidated,
					schedule: {
						date: datePicked.date,
						hour: datePicked.hour,
						minute: Number(datePicked.minute) > 59 ? "59" : datePicked.minute,
					},
				});
				// changa status
				setCheckStatus("checked");
				return;
			}

			setCheckStatus("error");
		} catch (error) {
			console.log(error);
			setCheckStatus("error");
		}
	};

	const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDatePicked({ ...datePicked, date: e.target.value });
	};
	const handleChangeHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDatePicked({ ...datePicked, hour: e.target.value });
	};
	const handleChangeMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(e.target.value) > 59) {
			setDatePicked({ ...datePicked, minute: "59" });
		}
		setDatePicked({ ...datePicked, minute: e.target.value });
	};
	useEffect(() => {
		updateGroupPicked();
		return () => {};
	}, [group, datePicked]);

	return (
		<div className="form-container">
			<p>Please paste here facebook group url</p>
			<InputGroup className="mb-3 ">
				<Form.Control
					className={
						checkStatus === "error"
							? "border border-danger"
							: checkStatus === "checked"
							? "border border-success"
							: ""
					}
					placeholder="https://www.facebook.com/groups/###"
					disabled={group !== null}
					value={url}
					onChange={handleInputChange}
				/>
				<Button
					variant={checkStatus === "checked" ? "outline-success" : "outline-success"}
					type="submit"
					form="externalGroupPicker"
					disabled={group !== null}
					onClick={handleClick}
				>
					{checkStatus === "waiting" && "Check group"}
					{checkStatus === "loading" && (
						<span className="statusLoading">
							<span className="spinner"></span>
						</span>
					)}
					{checkStatus === "checked" && <i className="bi bi-check text-success"></i>}
					{checkStatus === "error" && "try again"}
				</Button>
			</InputGroup>
			<hr />
			{/* group picked */}
			{group && (
				<>
					<div className="external-group">
						{/* data */}
						<div className="data">
							{/* image container */}
							<div className="image-container">
								<img src={group.picture.data.url} alt={`${group.name} image`} />
							</div>
							{/* information container */}
							<div className="information">
								<h5 className="group-name">{group.name}</h5>
								<span className="group-id">{group.id}</span>
							</div>
						</div>
					</div>
					<div className="schedule-config">
						<div className="group-schedule">
							<div className="group-schedule-config">
								<Form.Group className="group date">
									<Form.Label>Day:</Form.Label>
									<Form.Select className="select" onChange={handleChangeDate}>
										<option value="1">Monday</option>
										<option value="2">Tuesday</option>
										<option value="3">Wednesday</option>
										<option value="4">Thursday</option>
										<option value="5">Friday</option>
										<option value="6">Saturday</option>
										<option value="0">Sunday</option>
									</Form.Select>
								</Form.Group>
								<div className="time-block">
									<Form.Group className="group time">
										<Form.Label>Hour:</Form.Label>
										<Form.Select onChange={handleChangeHour}>
											<option value="00">00</option>
											<option value="01">01</option>
											<option value="02">02</option>
											<option value="03">03</option>
											<option value="04">04</option>
											<option value="05">05</option>
											<option value="06">06</option>
											<option value="07">07</option>
											<option value="08">08</option>
											<option value="09">09</option>
											<option value="10">10</option>
											<option value="11">11</option>
											<option value="12">12</option>
											<option value="13">13</option>
											<option value="14">14</option>
											<option value="15">15</option>
											<option value="16">16</option>
											<option value="17">17</option>
											<option value="18">18</option>
											<option value="19">19</option>
											<option value="20">20</option>
											<option value="21">21</option>
											<option value="22">22</option>
											<option value="23">23</option>
										</Form.Select>
									</Form.Group>
									<Form.Group className="group time">
										<Form.Label>Minutes:</Form.Label>
										<Form.Control
											type="number"
											min={0}
											max={59}
											onChange={handleChangeMinute}
											value={datePicked.minute}
										/>
									</Form.Group>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ExternalGroups;
