// imports
import { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
// styles
import "./pageschedule.scss";
// types
import { ScheduleConfigType } from "../../context/jobs.context";
import useJobs from "../../context/useJobs";
//
const PageSchedule = () => {
	// hooks
	const jobs = useJobs();
	const [postScheduleData, SetPostScheduleData] = useState<ScheduleConfigType>({
		date: "0",
		minute: "00",
		hour: "00",
	});

	// methods
	const updateScheduleConfig = () => {
		jobs?.updatePostSchedule(postScheduleData);
	};

	// select handlers
	const handleChangeDate = (e: ChangeEvent<HTMLSelectElement>) => {
		SetPostScheduleData({ ...postScheduleData, date: e.target.value });
	};
	const handleChangeMinute = (e: ChangeEvent<HTMLInputElement>) => {
		SetPostScheduleData({ ...postScheduleData, minute: e.target.value });
	};
	const handleChangeHour = (e: ChangeEvent<HTMLSelectElement>) => {
		SetPostScheduleData({ ...postScheduleData, hour: e.target.value });
	};

	//
	useEffect(() => {
		updateScheduleConfig();
		return () => {};
	}, [postScheduleData]);

	return (
		<div className="schedule-config">
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
					<Form.Control type="number" min={0} max={59} onChange={handleChangeMinute} />
				</Form.Group>
			</div>
		</div>
	);
};

export default PageSchedule;
