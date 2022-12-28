import React from "react";
import { Form } from "react-bootstrap";

const ExternalGroups = () => {
	return (
		<div>
			<Form>
				<Form.Group>
					<Form.Label>Paste Group URL</Form.Label>
					<Form.Control type="text" placeholder="https://www.facebook.com/groups/###" />
				</Form.Group>
			</Form>
		</div>
	);
};

export default ExternalGroups;
