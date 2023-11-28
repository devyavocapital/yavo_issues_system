import { Button, Label, Modal, Select, Textarea } from "flowbite-react";
import { useState } from "react";
import useSocket from "../../../../hooks/useSocket";
import useToken from "../../../../hooks/useToken";
import useUser from "../../../../hooks/useUser";
import { fetched, fetchedImages } from "../../../utils/fetched";
import { getCurrentDay } from "../../../utils/formatDate";
import { formatName } from "../../../utils/formatName";
import { fnGetNames } from "../../../utils/getFunctions";
import { statusFilters } from "../../../utils/statusFilters";

export default function ModalComment({ id, newComment }) {

	const { user } = useUser();
	const { token } = useToken();
	const { socket } = useSocket();
	const [openModal, setOpenModal] = useState("");
	const [names, setNames] = useState();
	const [loading, setLoading] = useState(true);
	const [values, setValues] = useState();
	const [inputFile, setInputFile] = useState({ file: [] });

	const getNames = async () => {
		const response = await fnGetNames(token);
		console.log(response)
		setNames(response);

		setTimeout(() => {
			setLoading(false);
		}, 500);
	};

	const handleFile = (e) => {

		setInputFile({
			file: e.target.files[0],
		});
	};

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", inputFile.file);

		await fetchedImages(token, "images/uploads", "POST", formData);

		const data = { ...values, idIssue: id._id, fileName: inputFile.file.name };

		const dataNotification = {
			assignTo: data.assignTo,
			issue: data.idIssue._id,
		};

		if (values.assignTo !== undefined) {
			socket.emit("notification", dataNotification);
			await fetched(token, "notifications", "POST", dataNotification);
		}
		await fetched(token, "comments", "POST", data);
		setOpenModal("");

		const date = getCurrentDay();
		newComment({
			...values,
			nombreCompleto: `${user.nombre} ${user.apellido_paterno}`,
			created_At: date,
			description: values.description,
			fileName: inputFile.file.name,
		});
	};

	return (
		<>
			<Button
				className="bg-white text-black "
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
									htmlFor="assingTo"
									value="Reasignar a: "
									className="text-xl mr-2"
								/>
							</div>
							<Select
								id="assingTo"
								name="assingTo"
								required
								onChange={(e) => handleChange(e)}
							>
								<option value={0} name={0} selected>
									Sin Asignar
								</option>
								{!loading &&
									names.map((name) => (
										<option key={name._id} value={name._id} name={name._id}>
											{formatName({name: name.name, lastname: name.lastname})}
										</option>
									))}
							</Select>
						</div>
						<div className="max-w-lg grid" id="select">
							<div className="my-auto">
								<Label
									htmlFor="evidence"
									value="Evidencia: "
									className="text-xl mr-2"
								/>
							</div>
							<input
								type="file"
								id="evidence"
								name="evidence"
								className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
								onChange={(e) => handleFile(e)}
							/>
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
