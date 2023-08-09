import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetched } from "../utils/fetched";
import { validateToken } from "../utils/validateToken";

const Login = () => {
	const emailRef = useRef();
	const passRef = useRef();
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const token = validateToken();
		if (token) navigate("/dashboard");
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		if (emailRef.current.value === "") {
			setError("El email es obligatorio");
			return null;
		}
		if (passRef.current.value === "") {
			setError("El password es obligatorio");
			return null;
		}

		// consultar la api
		const data = {
			email: emailRef.current.value,
			password: passRef.current.value,
		};
		const response = await fetched(
			"",
			`${import.meta.env.VITE_FRONTEND_API_URL}/login`,
			"POST",
			data,
		);

		if (response?.error) {
			setError(response.error);
			return;
		}

		setError("");
		localStorage.setItem("yavocapital_session", response.token);

		//redirect
		response.token && navigate("/dashboard");
	};

	return (
		<div className="h-screen grid place-content-center ">
			<form className="flex w-[500px] flex-col gap-4" onSubmit={handleLogin}>
				<h1 className="text-5xl">Iniciar Sesión</h1>
				{<p className="italic text-red-600">{error}</p>}
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email1" value="Email" />
					</div>
					<TextInput
						id="email1"
						placeholder="name@yavocapital.com"
						required
						type="email"
						ref={emailRef}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password1" value="Password" />
					</div>
					<TextInput id="password1" required type="password" ref={passRef} />
				</div>
				<Button type="submit" className="uppercase">
					Iniciar sesión
				</Button>
			</form>
		</div>
	);
};

export default Login;
