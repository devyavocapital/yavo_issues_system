import { useContext } from "react";
import TokenContext from "../contexts/token/TokenContext";

const useToken = () => {
	return useContext(TokenContext);
};

export default useToken;
