import { createContext, useEffect, useState } from "react";

const TokenContext = createContext(null);

const TokenProvider = ({ children }) => {
	const [token, setToken] = useState(null);

	const handleToken = (value) => {
		setToken(value);
	};

	useEffect(() => {
		const validateToken = () => {
			const tokenStorage = localStorage.getItem("yavo_tickets_session");
			if (!tokenStorage) {
				setToken("");
				return;
			}

			handleToken(tokenStorage);
		};

		validateToken();
	}, []);

	return (
		<TokenContext.Provider value={{ token, handleToken }}>
			{children}
		</TokenContext.Provider>
	);
};

export { TokenProvider };
export default TokenContext;
