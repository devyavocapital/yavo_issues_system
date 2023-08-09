import { Button, Label, Modal, Select, Textarea } from "flowbite-react";
import { useState } from "react";
import { fnGetNames } from "../../../utils/fnGetNames";
import { statusFilters } from "../../../utils/statusFilters";

export default function ModalComment() {
	const [openModal, setOpenModal] = useState("");
	const [names, setNames] = useState();
	const [loading, setLoading] = useState(true);

	const getNames = async () => {
		const response = await fnGetNames();
		setNames(response);

		setTimeout(() => {
			setLoading(false);
		}, 500);
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
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Agregar comentario
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="comment" value="Descripción" />
							</div>
							<Textarea id="comment" placeholder="" required />
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
								required
								// onChange={(e) => handleFilter(e.target.value)}
							>
								{statusFilters.map((status) => (
									<option
										value={status.name}
										name={status.name}
										key={status.name}
									>
										{status.text}
									</option>
								))}
							</Select>
						</div>
						<div className="max-w-md flex" id="select">
							<div className="my-auto">
								<Label
									htmlFor="status"
									value="Reasignar a: "
									className="text-xl mr-2"
								/>
							</div>
							<Select
								id="status"
								required
								// onChange={(e) => handleFilter(e.target.value)}
							>
								{!loading &&
									names.map((name) => (
										<option key={name.ID} value={name.ID} name={name.ID}>
											{name.NOMBRE_COMPLETO}
										</option>
									))}
							</Select>
						</div>
						<div className="w-full">
							<Button>Agregar</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
