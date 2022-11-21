// imports
// context
import { Container } from "react-bootstrap";
import UseAuth from "../../context/auth/UseAuth";
// styles
import style from "./account.module.scss";

//
const Account = () => {
	// hooks
	const auth = UseAuth();

	//
	return (
		<div className={style.account}>
			<Container>
				{/* current user data */}
				<section className={style.sessionData}>
					<h3 className={style.sectionTitle}>Account</h3>
					<span className={style.currentSession}>{auth?.user?.email}</span>
				</section>

				{/* current user actions */}
				<section className={style.actionsButtons}>
					<button className={style.action}>Change password</button>
				</section>

				{/* accounts linked to user */}
				<section className={style.linkedAccounts}>
					<div className={style.fbAccount}>
						<div className={style.logo}>
							<img src="https://graph.facebook.com/facebook/picture" alt="faceboook logo" />
						</div>
						<div className={style.fbAccountName}>Howe & Co 22 - [placeholder]</div>
						<div className={style.accountActionsButtons}>
							<button className={style.fbAccountUnlink}>
								<i className={`${style.icon} bi bi-trash3`}></i>
							</button>
						</div>
					</div>
					<div className={style.addNewAccount}>
						<button className={style.addNewAccountButton}>
							<i className={`${style.icon} bi bi-plus`}></i>
						</button>
					</div>
				</section>
			</Container>
		</div>
	);
};

export default Account;
