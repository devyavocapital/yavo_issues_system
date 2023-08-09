export const fetched = async (token, endpoint, method, data) => {
	const apiResult = await fetch(endpoint, {
		method,
		headers: {
			"x-auth-token": token,
			"Content-Type": "application/json",
		},
		body: method === "POST" ? JSON.stringify(data) : null,
	});

	const response = await apiResult.json();
	return response;
};
