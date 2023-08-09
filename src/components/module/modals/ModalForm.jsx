import {
	Button,
	Label,
	Modal,
	Select,
	TextInput,
	Textarea,
} from "flowbite-react";
import { useState } from "react";
import useFilter from "../../../../hooks/useFilter";
import { fetched } from "../../../utils/fetched";
import { fnGetCategories, fnGetNames } from "../../../utils/getFunctions";
import { statusFilters } from "../../../utils/statusFilters";
import { validateToken } from "../../../utils/validateToken";

export default function ModalForm() {
	const [openModal, setOpenModal] = useState("");
	const [names, setNames] = useState();
	const [categories, setCategories] = useState();
	const [loading, setLoading] = useState(true);
	const [values, setValues] = useState();
	const { handleSetNew } = useFilter();

	const getNames = async () => {
		const response = await fnGetNames();
		setNames(response);
		const responseCat = await fnGetCategories();
		setCategories(responseCat);

		setTimeout(() => {
			setLoading(false);
		}, 500);
	};

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleSetNew(true);

		const data = values;
		const token = validateToken();
		await fetched(
			token,
			`${import.meta.env.VITE_FRONTEND_API_URL}/issues`,
			"POST",
			data,
		);
		handleSetNew(false);
		setOpenModal("");
	};

	return (
		<>
			<Button
				gradientMonochrome="cyan"
				onClick={() => {
					getNames();
					setOpenModal("form-elements");
				}}
			>
				{/* rome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-5 h-5 mr-2"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				Nuevo Ticket
			</Button>
			<Modal
				show={openModal === "form-elements"}
				size="md"
				popup
				onClose={() => setOpenModal(undefined)}
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Agregar nuevo ticket
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="nameClient" value="Nombre del cliente" />
							</div>
							<TextInput
								id="nameClient"
								name="nameClient"
								placeholder=""
								required
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="creditNumber" value="Número de crédito" />
							</div>
							<TextInput
								id="creditNumber"
								name={"creditNumber"}
								type="text"
								required
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="socialNumber" value="Número de seguro social" />
							</div>
							<TextInput
								id="socialNumber"
								name="socialNumber"
								type="text"
								required
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="cardNumber" value="Número de tarjeta" />
							</div>
							<TextInput
								id="cardNumber"
								name="cardNumber"
								type="text"
								required
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="initialComment" value="Comentario Inicial" />
							</div>
							<Textarea
								id="initialComment"
								name="initialComment"
								type="text"
								required
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="assignTo" value="Asignar a" />
							</div>
							<Select
								id="assignTo"
								name="assignTo"
								required
								onChange={(e) => handleChange(e)}
							>
								<option value={0} name={0} selected>
									Sin Asignar
								</option>
								{!loading &&
									names.map((name) => (
										<option key={name.ID} value={name.ID}>
											{name.NOMBRE_COMPLETO}
										</option>
									))}
							</Select>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="category" value="Categoría" />
							</div>
							<Select
								id="category"
								name="category"
								required
								onChange={(e) => handleChange(e)}
							>
								<option value={""} name={""}>
									Sin Asignar
								</option>
								{!loading &&
									categories.map((category) => (
										<option
											key={category.ID}
											value={category.ID}
											name={category.ID}
										>
											{category.CATEGORY}
										</option>
									))}
							</Select>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="status" value="Estatus" />
							</div>
							<Select
								id="status"
								name="status"
								required
								onChange={(e) => handleChange(e)}
							>
								{statusFilters.map(
									(status) =>
										status.name !== "all" && (
											<option
												key={status.name}
												value={status.name}
												name={status.name}
											>
												{status.text}
											</option>
										),
								)}
							</Select>
						</div>
						<div className="w-full">
							<Button onClick={(e) => handleSubmit(e)}>Agregar</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
