import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getFiles } from "../../../../api/workspace/files.api";
import { AssetsType } from "../../../../types";
import useJobs from "../../context/useJobs";

//
type StatusType = "loading" | "error" | "success";
const Gallery = () => {
	// hooks
	const jobs = useJobs();
	// states
	const [assets, setAssets] = useState<AssetsType[]>([]);
	const [status, setStatus] = useState<StatusType>("loading");
	const [image, setImage] = useState<AssetsType | null>(null);

	// methods
	const handleUrl = (_image: AssetsType) => {
		setImage(_image);
	};

	const pickImage = () => {
		if (image) {
			jobs?.setAsset(image);
		}
	};
	const handleFilesFetch = async () => {
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
		handleFilesFetch();
		return () => {};
	}, []);
	return (
		<div className="gallery">
			{status !== "error" ? (
				<div className={`grid ${isMobile() ? "mobile" : "desktop"}`}>
					{assets.map((image) => (
						<Button
							key={image.name}
							className="img-container"
							onClick={() => {
								handleUrl(image);
							}}
						>
							<img id={`${image.name}`} src={image.url} alt={`Image with ID ${image.name}`} />
						</Button>
					))}
				</div>
			) : (
				<div className="error-message">
					<p>There was an error fetching the assets</p>
					<Button className="reload-button" onClick={handleFilesFetch}>
						Reload
					</Button>
				</div>
			)}
			{image && (
				<div className="action-container">
					<h5>Asset picked:</h5>
					<p>{image.name}</p>
					<div className="action">
						<Button className="pick" onClick={pickImage}>
							Pick image
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Gallery;
