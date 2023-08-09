import useFilter from "../../../../hooks/useFilter";
import { fetched } from "../../../utils/fetched";
import { fnGetNames } from "../../../utils/getFunctions";
import { statusFilters } from "../../../utils/statusFilters";
import { validateToken } from "../../../utils/validateToken";
/* eslint-disable react/prop-types */
import { Button, Label, Modal, Select, Textarea } from "flowbite-react";
import { useState } from "react";

export default function ModalComment({ id }) {
	const [openModal, setOpenModal] = useState("");
	const [names, setNames] = useState();
	const [loading, setLoading] = useState(true);
	const [values, setValues] = useState();
	const { handleSetNew } = useFilter();

	const getNames = async () => {
		const response = await fnGetNames();
		setNames(response);

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
		const data = { ...values, id_issue: id };

		const token = validateToken();
		await fetched(
			token,
			`${import.meta.env.VITE_FRONTEND_API_URL}/comments`,
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
				Agregar comentario
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
						<h3 className="text-3xl font-medium text-gray-900 dark:text-white">
							Agregar comentario
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="description" value="Descripción" />
							</div>
							<Textarea
								id="description"
								placeholder=""
								required
								name="description"
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className="max-w-md flex" id="select">
							<div className="my-auto">
								<Label
									htmlFor="status"
									value="Cambiar estatus:"
									className="text-xl mr-2"
								/>
							</div>
							<Select
								id="status"
								name="status"
								required
								onChange={(e) => handleChange(e)}
							>
								<option value={0} name={0} selected>
									Sin Asignar
								</option>
								{statusFilters.map(
									(status) =>
										status.name !== "all" && (
											<option key={status.name} value={status.name}>
												{status.text}
											</option>
										),
								)}
							</Select>
						</div>
						<div className="max-w-lg flex" id="select">
							<div className="my-auto">
								<Label
									htmlFor="userAssignated"
									value="Reasignar a: "
									className="text-xl mr-2"
								/>
							</div>
							<Select
								id="userAssignated"
								name="userAssignated"
								required
								onChange={(e) => handleChange(e)}
							>
								<option value={0} name={0} selected>
									Sin Asignar
								</option>
								{!loading &&
									names.map((name) => (
										<option key={name.ID} value={name.ID} name={name.ID}>
											{name.NOMBRE_COMPLETO}
										</option>
									))}
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
