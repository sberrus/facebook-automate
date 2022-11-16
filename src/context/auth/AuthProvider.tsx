// imports
import { useState, createContext } from "react";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// Login helpers
import { firebaseSignIn, LoginProps } from "./AuthHelper";

// types
type AuthProviderProps = {
	children: JSX.Element;
};

interface AuthContextType {
	user: User | null;
	login: ({ email, password }: LoginProps) => {};
	isLogged: () => boolean;
}

// context
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
	// hooks
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);

	let contextValue: AuthContextType = {
		user,
		async login({ email, password }) {
			try {
				const signInRes = await firebaseSignIn({ email, password });

				// persist data
				setUser(signInRes.user);
				localStorage.setItem("credentials", JSON.stringify(signInRes.user));
				navigate("/dashboard");
			} catch (error) {
				console.log(error);
			}
		},
		isLogged() {
			return !!user;
		},
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

//Exportamos el provider del contexto para que este sea un componente de alto orden y el contexto pueda ser accedido desde cualquier parte del programa.
export default AuthProvider;
