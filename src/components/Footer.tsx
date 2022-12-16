// style
import style from "./footer.module.scss";

//
const Footer = () => {
	return (
		<div className={style.footer} style={{ display: "none" }}>
			<a href="https://samdev.es" rel="noreferrer" target="_BLANK" className={style.copyrightLink}>
				Samdev
			</a>
		</div>
	);
};

export default Footer;
