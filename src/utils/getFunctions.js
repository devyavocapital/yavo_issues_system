import { fetched } from "./fetched";

export const fnGetNames = async (token) => {
	const response = await fetched(token, "names", "GET");
	return response.names[0];
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
	return response;
};

export const fnGetComments = async (token, id_issue) => {
	const response = await fetched(token, `comments?id=${id_issue}`, "GET");
	return response[0];
};
