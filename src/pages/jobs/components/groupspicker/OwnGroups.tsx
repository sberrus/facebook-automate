// imports
import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
// api
import { getOwnGroups } from "../../../../api/workspace/workspace.api";
// types
import { GroupType } from "../../../../types";
// context
import useJobs from "../../context/useJobs";

const OwnGroups = () => {
	// context
	const jobs = useJobs();
	// hooks
	const [groupPicked, setGroupPicked] = useState<GroupType | null>(null);
	const [datePicked, setDatePicked] = useState({ date: "1", hour: "00", minute: "00" });
	const [workspaceAdminGroups, setWorkspaceAdminGroups] = useState<GroupType[]>([]);

	/**
	 * TODO: Check why when select monday it show tuesday in the date picked
	 */

	// methods
	const updateGroupPicked = () => {
		if (groupPicked) {
			jobs?.groupModal.pickGroup({
				owner: true,
				group: groupPicked,
				schedule: {
					date: datePicked.date,
					hour: datePicked.hour,
					minute: datePicked.minute,
				},
			});
		}
	};

	// change handlers
	const handleGroupPick = (group: GroupType) => {
		setGroupPicked(group);
	};
	const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDatePicked({ ...datePicked, date: e.target.value });
	};
	const handleChangeHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDatePicked({ ...datePicked, hour: e.target.value });
	};
	const handleChangeMinute = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDatePicked({ ...datePicked, minute: e.target.value });
	};

	// fetch own groups
	const fetchAdminGroups = async () => {
		// check if there is groups already fetched
		if (workspaceAdminGroups.length > 0) {
			return;
		}

		const groups = await getOwnGroups();
		if (groups) {
			setWorkspaceAdminGroups(groups);
		}
	};
	// effect
	useEffect(() => {
		fetchAdminGroups();
		updateGroupPicked();
		return () => {};
	}, [groupPicked, datePicked]);

	return (
		<div className="groups-list">
			{/* when picking group */}
			{!groupPicked && (
				<Dropdown>
					<Dropdown.Toggle className="dropdown-button">Select a group</Dropdown.Toggle>

					<Dropdown.Menu className="dropdown-menu">
						{workspaceAdminGroups.length > 0 ? (
							workspaceAdminGroups.map((group) => (
								<Dropdown.Item
									key={group.id}
									onClick={() => {
										handleGroupPick(group);
									}}
								>
									<div className="group">
										{/* data */}
										<div className="data">
											{/* image container */}
											<div className="image-container">
												<img src={group.picture.data.url} alt={`${group.name} image`} />
											</div>
											{/* information container */}
											<div className="information">
												<h6 className="group-name">{group.name}</h6>
											</div>
										</div>
										{/* schedule */}
										<div className="schedule"></div>
										{/* <input type="radio" id="input" className="group-radio-input" /> */}
									</div>
								</Dropdown.Item>
							))
						) : (
							<div className="text-center">
								<h3>It looks like this account have no groups!</h3>
								<p>
									Please create a new{" "}
									<a href="https://www.facebook.com/groups/create/" target={"_blank"} rel={"noreferrer"}>
										facebook group
									</a>{" "}
									and try again
								</p>
							</div>
						)}
					</Dropdown.Menu>
				</Dropdown>
			)}

			{/* when group picked */}
			{groupPicked && (
				<div className="group-picked">
					{/* group picked */}
					<div className="group">
						{/* data */}
						<div className="data">
							{/* image container */}
							<div className="image-container">
								<img src={groupPicked.picture.data.url} alt={`${groupPicked.name} image`} />
							</div>
							{/* information container */}
							<div className="information">
								<h5 className="group-name">{groupPicked.name}</h5>
							</div>
						</div>
						{/* schedule */}
						<div className="schedule"></div>
					</div>

					<hr />

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
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default OwnGroups;
