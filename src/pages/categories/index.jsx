import { Button, Label, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetched } from "../../utils/fetched";

const CreateCategory = () => {
	const catRef = useRef();
	const [error, setError] = useState(null);
	const [msg, setMsg] = useState(null);

	const navigate = useNavigate();

	const handleCreateCategory = async (e) => {
		e.preventDefault();
		const data = { nameCategory: catRef.current.value };
		const token = localStorage.getItem("yavo_tickets_session");

		const response = await fetched(token, "categories", "POST", data);
		if (response?.error) {
			setError(response.error);
			return;
		}

		setMsg(response.msg);
		setTimeout(() => {
			navigate("/dashboard");
		}, 1000);
	};

	return (
		<div className="h-screen grid place-content-center ">
			<form
				className="flex w-[500px] flex-col gap-4"
				onSubmit={handleCreateCategory}
			>
				<h1 className="text-5xl">Nuevo Categoría</h1>
				{error && <p className="italic text-red-600">{error}</p>}
				{msg && <p className="italic text-ingido-600">{msg}</p>}
				<div>
					<div className="mb-2 block">
						<Label htmlFor="category" value="Nombre de la categoría" />
					</div>
					<TextInput
						id="category"
						placeholder="Comercios"
						required
						type="text"
						ref={catRef}
					/>
				</div>

				<Button type="submit" className="uppercase">
					Crear Categoría
				</Button>
			</form>
		</div>
	);
};

export default CreateCategory;
