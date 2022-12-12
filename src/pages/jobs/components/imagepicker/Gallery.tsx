import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getFiles } from "../../../../api/workspace/files.api";
import { AssetsType } from "../../../../types";

//
type StatusType = "loading" | "error" | "success";
const Gallery = () => {
	// states
	const [assets, setAssets] = useState<AssetsType[]>([]);
	const [status, setStatus] = useState<StatusType>("loading");

	// methods
	const handleFiles = async () => {
		try {
			const files = await getFiles();
			if (files) {
				setAssets(files);
			} else {
				setAssets([]);
				setStatus("error");
			}
		} catch (error) {
			console.log(error);
			setStatus("error");
		}
	};
	const isMobile = () => {
		return window.innerWidth < 800 ? true : undefined;
	};

	//
	useEffect(() => {
		handleFiles();
		return () => {};
	}, []);
	return (
		<div className="gallery">
			{status !== "error" ? (
				<div className={`grid ${isMobile() ? "mobile" : "desktop"}`}>
					{assets.map((image) => (
						<div key={image.name} className="img-container">
							<img id={`${image.name}`} src={image.url} alt={`Image with ID ${image.name}`} />
						</div>
					))}
				</div>
			) : (
				<div className="error-message">
					<p>There was an error fetching the assets</p>
					<Button className="reload-button" onClick={handleFiles}>
						Reload
					</Button>
				</div>
			)}
		</div>
	);
};

export default Gallery;
