import { Button, Label, Select, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { fetched } from "../utils/fetched";

const CreateUser = () => {
	const { token } = useToken();
	const emailRef = useRef();
	const passRef = useRef();
	const nameRef = useRef();
	const lastnameRef = useRef();
	const secLastnameRef = useRef();
	const [category, setCategory] = useState(null);
	const [error, setError] = useState(null);
	const [zodError, setZodError] = useState(null);
	const [msg, setMsg] = useState(null);

	const navigate = useNavigate();
	const handleCategory = (value) => setCategory(value);

	const handleCreateUser = async (e) => {
		e.preventDefault();
		const data = {
			email: emailRef.current.value,
			password: passRef.current.value,
			category,
			name: nameRef.current.value,
			lastname: lastnameRef.current.value,
			motherLastname: secLastnameRef.current.value,
		};

		const response = await fetched(token, "create", "POST", data);

		if (response?.error !== undefined) {
			setError(response.error);
			return;
		}
		if (response?.zodError !== undefined) {
			console.log(response.zodError);
			console.log(Object.keys(response.zodError));
			console.log(Object.keys(response.zodError).length);
			setZodError(response.zodError);
			return;
		}

		setError(null);
		setMsg(response.msg);
		setTimeout(() => {
			navigate("/dashboard");
		}, 2000);
	};

	return (
		<div className="h-screen grid place-content-center ">
			<form
				className="flex w-[500px] flex-col gap-4"
				onSubmit={handleCreateUser}
			>
				<h1 className="text-5xl">Nuevo Usuario</h1>
				{zodError?.map((z) => (
					<p key={z.code}>{z.message}</p>
				))}
				{error && <p className="italic text-red-600">{error}</p>}
				{msg && <p className="italic text-ingido-600">{msg}</p>}
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email" value="Email" />
					</div>
					<TextInput
						id="email"
						placeholder="name@yavocapital.com"
						required
						type="email"
						ref={emailRef}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password" value="Password" />
					</div>
					<TextInput id="password" required type="password" ref={passRef} />
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="name" value="Nombre" />
					</div>
					<TextInput
						id="name"
						placeholder="Juanito"
						required
						type="text"
						ref={nameRef}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="lastname" value="Apellido Paterno" />
					</div>
					<TextInput
						id="lastname"
						placeholder="Pérez"
						required
						type="text"
						ref={lastnameRef}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="second" value="Apellido Materno" />
					</div>
					<TextInput
						id="second"
						placeholder="Lopéz"
						required
						type="text"
						ref={secLastnameRef}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="second" value="Categoria" />
					</div>
					<Select
						id="status"
						required
						onChange={(e) => handleCategory(e.target.value)}
						defaultValue={""}
					>
						<option disabled selected value={""}>
							-- Selecciona una opción --
						</option>
						<option value={1} name={1}>
							Administrador
						</option>
						<option value={2} name={2}>
							Operador
						</option>
					</Select>
				</div>
				<Button type="submit" className="uppercase">
					Crear Usuario
				</Button>
			</form>
		</div>
	);
};

export default CreateUser;
