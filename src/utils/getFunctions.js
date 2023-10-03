import { fetched } from "./fetched";

export const fnGetNames = async (token) => {
	const response = await fetched(token, "names", "GET");
	return response[0];
};

export const fnGetCategories = async (token) => {
	const response = await fetched(token, "categories", "GET");
	return response.categories[0];
};

export const fnGetIssues = async (token, nameClient, id) => {
	const response = await fetched(
		token,
		`issues?nameClient=${nameClient}&id=${id}`,
		"GET",
	);
	return response[0];
};

export const fnGetComments = async (token, id_issue) => {
	const response = await fetched(token, `comments?id=${id_issue}`, "GET");
	return response[0];
};

export const fnGetStats = async (token) => {
	const response = await fetched(token, "stats", "GET");
	return {
		stats: response.stats[0],
		statsByUser: response.statsByUser[0],
		statsCreated: response.statsCreated[0],
		statsAssignated: response.statsAssignated[0],
	};
};
