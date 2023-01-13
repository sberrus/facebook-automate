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
		date: "1",
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
	const handleChangeMinute = (e: ChangeEvent<HTMLSelectElement>) => {
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
					<Form.Select onChange={handleChangeMinute}>
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
						<option value="24">24</option>
						<option value="25">25</option>
						<option value="26">26</option>
						<option value="27">27</option>
						<option value="28">28</option>
						<option value="29">29</option>
						<option value="30">30</option>
						<option value="31">31</option>
						<option value="32">32</option>
						<option value="33">33</option>
						<option value="34">34</option>
						<option value="35">35</option>
						<option value="36">36</option>
						<option value="37">37</option>
						<option value="38">38</option>
						<option value="39">39</option>
						<option value="40">40</option>
						<option value="41">41</option>
						<option value="42">42</option>
						<option value="43">43</option>
						<option value="44">44</option>
						<option value="45">45</option>
						<option value="46">46</option>
						<option value="47">47</option>
						<option value="48">48</option>
						<option value="49">49</option>
						<option value="50">50</option>
						<option value="51">51</option>
						<option value="52">52</option>
						<option value="53">53</option>
						<option value="54">54</option>
						<option value="55">55</option>
						<option value="56">56</option>
						<option value="57">57</option>
						<option value="58">58</option>
						<option value="59">59</option>
					</Form.Select>
				</Form.Group>
			</div>
		</div>
	);
};

export default PageSchedule;
