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

	/**
	 *
	 * *******LEER******
	 * VER DOCUMENTACION DE PARA REALIZAR LOGIN CON FACEBOOK
	 * https://www.npmjs.com/package/react-facebook-login
	 *
	 *
	 */
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
					<button className={style.action}>Get/Renew Token</button>
				</section>

				{/* token status */}
				<section className={style.tokenStatus}>
					<h5>Token Status:</h5>
					<p>
						<span className={style.statusCorrect}>
							<div className={style.dotStatus}></div>
							online
						</span>
					</p>

					<p>
						<span className={style.statusWarn}>
							<div className={style.dotStatus}></div>
							The token is close to expire, please renew
						</span>
					</p>

					<p>
						<span className={style.statusDanger}>
							<div className={style.dotStatus}></div>
							Token expired, please generate a new token
						</span>
					</p>

					<p>
						<span className={style.statusDanger}>
							<div className={style.dotStatus}></div>
							Error, talk to admin
						</span>
					</p>
					<p>
						<span className={style.statusDanger}>
							<div className={style.dotStatus}></div>
							No Long Lived Token. Generate a new token
						</span>
					</p>
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
