export const fetched = async (token, endpoint, method, data) => {
	//VITE_FRONTEND_API_URL
	const url = import.meta.env.VITE_FRONTEND_API_URL;
	const version = "api/v1";
	const permission = import.meta.env.VITE_BACKEND_PERMISSION;
	const completeUrl = `${url}${version}/${endpoint}`;

	const headersInit = new Headers({
		Authorization: `Bearer ${token}`,
		"x-auth-token": permission,
	});
	headersInit.append("Content-Type", "application/json");
	try {
		const apiResult = await fetch(completeUrl, {
			method,
			headers: headersInit,
			body: method !== "GET" ? JSON.stringify(data) : null,
		});

		const response = await apiResult.json();
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const fetchedImages = async (token, endpoint, method, data) => {
	//VITE_FRONTEND_API_URL
	const api = import.meta.env.VITE_FRONTEND_API_URL_IMG;
	const permission = import.meta.env.VITE_BACKEND_PERMISSION;

	const headersInit = new Headers({
		Authorization: `Bearer ${token}`,
		"x-auth-token": permission,
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
	return response.user;
};
