// imports
import { useState, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// Login helpers
import { firebaseSignIn, firebaseSignInWithFacebook } from "../../helpers/AuthHelper";
import { checkWorkspace, registerNewWorkspaceAndUser } from "../../api/workspace/workspace.api";
// types
import { LoginProps, WorkspaceType } from "../../types";
type AuthProviderProps = {
	children: JSX.Element;
};

interface AuthContextType {
	workspace: WorkspaceType | null;
	user: User | null;
	loginWithEmail: ({ email, password }: LoginProps) => {};
	loginWithFacebook: () => {};
	signOut: () => void;
	isLogged: () => boolean;
}

// context
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
	// hooks
	const navigate = useNavigate();
	const auth = getAuth();

	// state
	const [user, setUser] = useState<User | null>(() => {
		return JSON.parse(localStorage.getItem("credentials")!);
	});

	const [workspace, setWorkspace] = useState<WorkspaceType | null>(null);

	useEffect(() => {
		// check current session
		onAuthStateChanged(auth, async (_user) => {
			try {
				if (_user) {
					setUser(_user);
					localStorage.setItem("credentials", JSON.stringify(_user));
					// get workspace
					if (!workspace) {
						// check workspace
						const workspaceRes = await checkWorkspace();
						setWorkspace(workspaceRes);

						// no workspace registered
						if (!workspaceRes) {
							const registerResponse = await registerNewWorkspaceAndUser();
							if (registerResponse.ok) {
								const workspaceRes = await checkWorkspace();
								setWorkspace(workspaceRes);
							}
						}
					}
				} else {
					setUser(null);
				}
			} catch (error) {
				console.log(error);
			}
		});

		return () => {};
	}, []);

	// context properties
	let contextValue: AuthContextType = {
		workspace,
		user,

		// login
		async loginWithEmail({ email, password }) {
			try {
				await firebaseSignIn({ email, password });
			} catch (error) {
				console.log(error);
			}
		},

		// login with facebook provider
		async loginWithFacebook() {
			try {
				await firebaseSignInWithFacebook();
			} catch (error) {
				console.log(error);
			}
		},

		// logout
		async signOut() {
			await signOut(auth);

			// clear session data
			localStorage.removeItem("credentials");
			navigate("/");
		},

		// status
		isLogged() {
			return !!user;
		},
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

//Exportamos el provider del contexto para que este sea un componente de alto orden y el contexto pueda ser accedido desde cualquier parte del programa.
export default AuthProvider;
