import { fetched } from "./fetched";
import { validateToken } from "./validateToken";

export const fnGetNames = async () => {
	const token = validateToken();
	const response = await fetched(
		token,
		`${import.meta.env.VITE_FRONTEND_API_URL}/names`,
		"GET",
	);
	return response.names[0];
};
