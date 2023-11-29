import { createContext, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const handleUser = (value) => {
		setUser(value);
	};

	return (
		<UserContext.Provider value={{ user, handleUser }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider };
export default UserContext;
