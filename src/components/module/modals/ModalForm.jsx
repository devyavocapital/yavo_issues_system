import {
	Button,
	Label,
	Modal,
	Select,
	TextInput,
	Textarea,
} from "flowbite-react";
import { useState } from "react";
import useGlobal from "../../../../hooks/useGlobal";
import useSocket from "../../../../hooks/useSocket";
import useToken from "../../../../hooks/useToken";
import useUser from "../../../../hooks/useUser";
import { fetched } from "../../../utils/fetched";
import { formatName } from "../../../utils/formatName";
import { fnGetCategories, fnGetNames } from "../../../utils/getFunctions";
import { statusFilters } from "../../../utils/statusFilters";

export default function ModalForm() {
	const { token } = useToken();
	const { socket } = useSocket();
	const { user } = useUser();
	const [openModal, setOpenModal] = useState("");
	const [names, setNames] = useState();
	const [categories, setCategories] = useState();
	const [loading, setLoading] = useState(true);
	const [values, setValues] = useState();
	const [zodError, setZodError] = useState(null);
	const { handleNewIssue } = useGlobal();

	const getNames = async () => {
		const response = await fnGetNames(token);
		setNames(response);
		const responseCat = await fnGetCategories(token);
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

		const data = values;
		console.log(data)
		const dataNotification = {
			userAssignated: data?.assignTo === undefined ? 0 : data.assignTo,
			nameClient: `${data.nameClient} ${
				data.lastnameClient === undefined ? "" : data.lastnameClient
			} ${
				data.motherLastnameClient === undefined ? "" : data.motherLastnameClient
			}`,
			category: data.category,
		};

		socket.emit("notification", dataNotification);
		await fetched(token, "notifications", "POST", dataNotification);
		const response = await fetched(token, "issues", "POST", data);

		handleNewIssue({
			id: response._id,
			creditNumber: values.creditNumber,
			nameClient: values.nameClient,
			status: values.status,
			FULLNAME: `${user.nombre} ${user.apellido_paterno}`,
		});
		setOpenModal("");
	};

	return (
		<>
			<Button
				gradientDuoTone="cyanToBlue"
				pill
				onClick={() => {
					getNames();
					setOpenModal("form-elements");
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-5 h-5 mr-2"
				>
					<title>Close modal</title>
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
					<form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Agregar nuevo ticket
						</h3>
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="nameClient"
									value="Nombre del cliente / comercio *"
								/>
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
								<Label
									htmlFor="lastnameClient"
									value="Apellido paterno del cliente"
								/>
							</div>
							<TextInput
								id="lastnameClient"
								name="lastnameClient"
								placeholder=""
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="motherLastnameClient"
									value="Apellido materno del cliente"
								/>
							</div>
							<TextInput
								id="motherLastnameClient"
								name="motherLastnameClient"
								placeholder=""
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="creditNumber" value="Número de crédito *" />
							</div>
							<TextInput
								id="creditNumber"
								name={"creditNumber"}
								type="text"
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="socialNumber"
									value="Número de seguro social *"
								/>
							</div>
							<TextInput
								id="socialNumber"
								name="socialNumber"
								type="text"
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
								onChange={(e) => handleChange(e)}
								
							>
								<option value={0} selected >
									Sin Asignar
								</option>
								{!loading &&
									names.map(({_id, name, lastname}) => (
										<option key={_id} value={formatName({name, lastname})}>
											{formatName({name, lastname})}
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
								onChange={(e) => handleChange(e)}
								
							>
								<option value={""} selected>Sin Asignar</option>
								{!loading &&
									categories.map(({_id, nameCategory}) => (
										<option
											key={_id}
											value={_id}
											name={_id}
										>
											{nameCategory}
										</option>
									))}
							</Select>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="status" value="Estatus *" />
							</div>
							<Select
								id="status"
								name="status"
								required
								onChange={(e) => handleChange(e)}
							>
								<option value={""} disabled selected>
									Sin Status
								</option>
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
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="daysConfig"
									value="Número de días a expirar *"
								/>
							</div>
							<TextInput
								id="daysConfig"
								name="daysConfig"
								type="number"
								min={0}
								required
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className="w-full">
							<Button type="submit">Agregar</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
}
