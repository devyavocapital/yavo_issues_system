export const fetched = async (token, endpoint, method, data) => {
	//VITE_FRONTEND_API_URL
	const api = import.meta.env.VITE_FRONTEND_API_URL;
	const headersInit = new Headers({
		"x-auth-token": token,
	});
	headersInit.append("Content-Type", "application/json");

	try {
		const apiResult = await fetch(`${api}/${endpoint}`, {
			method,
			headers: headersInit,
			body: method !== "GET" ? JSON.stringify(data) : null,
		});

		return await apiResult.json();
	} catch (error) {
		console.log(error);
	}
};

export const fetchedImages = async (token, endpoint, method, data) => {
	//VITE_FRONTEND_API_URL
	const api = import.meta.env.VITE_FRONTEND_API_URL_IMG;

	const headersInit = new Headers({
		"x-auth-token": token,
	});

	try {
		const apiResult = await fetch(`${api}${endpoint}`, {
			method,
			headers: headersInit,
			body: data,
		});

		return await apiResult.json();
	} catch (error) {
		console.log(error);
	}
};

export const getCurrentUser = async (token) => {
	const response = await fetched(token, "login", "GET", {});

	return response.usuario[0][0];
};
