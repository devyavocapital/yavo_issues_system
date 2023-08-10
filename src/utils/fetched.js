export const fetched = async (token, endpoint, method, data) => {
	const apiResult = await fetch(endpoint, {
		method,
		headers: {
			"x-auth-token": token,
			"Content-Type": "application/json",
		},
		body: method !== "GET" ? JSON.stringify(data) : null,
	});

	const response = await apiResult.json();
	return response;
};
