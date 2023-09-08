import { createContext, useState } from "react";

const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);

	const handleSocket = (value) => {
		setSocket(value);
	};

	return (
		<SocketContext.Provider value={{ socket, handleSocket }}>
			{children}
		</SocketContext.Provider>
	);
};

export { SocketProvider };
export default SocketContext;
