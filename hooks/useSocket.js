import { useContext } from "react";
import SocketContext from "../contexts/socket/SocketContext";

const useSocket = () => {
	return useContext(SocketContext);
};

export default useSocket;
