export const validateToken = () => {
	const token = localStorage.getItem("yavocapital_session");
	return token;
};
