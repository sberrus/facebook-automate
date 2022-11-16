// imports
import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// Login helpers
import { firebaseSignIn, LoginProps } from "./AuthHelper";
import { auth } from "../../app/firebase";

// types
type AuthProviderProps = {
	children: JSX.Element;
};

interface AuthContextType {
	user: User | null;
	login: ({ email, password }: LoginProps) => {};
	signOut: () => void;
	isLogged: () => boolean;
}

// context
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
	// hooks
	const navigate = useNavigate();
	// state
	const [user, setUser] = useState<User | null>(() => {
		return JSON.parse(localStorage.getItem("credentials")!);
	});
	// useEffect
	useEffect(() => {
		// check current session
		onAuthStateChanged(auth, (user) => {
			if (!!user) {
				setUser(user);
				localStorage.setItem("credentials", JSON.stringify(user));
			} else {
				setUser(null);
			}
		});
		return () => {};
	}, []);

	// context properties
	let contextValue: AuthContextType = {
		user,

		// login
		async login({ email, password }) {
			try {
				await firebaseSignIn({ email, password });
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
