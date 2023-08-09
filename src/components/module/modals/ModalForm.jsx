import {
	Button,
	Label,
	Modal,
	Select,
	TextInput,
	Textarea,
} from "flowbite-react";
import { useState } from "react";
import { fnGetNames } from "../../../utils/fnGetNames";

export default function ModalForm() {
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
				New Ticket
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
								<Label htmlFor="cliente" value="Nombre del cliente" />
							</div>
							<TextInput id="cliente" placeholder="" required />
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="credit" value="Número de crédito" />
							</div>
							<TextInput id="credit" type="text" required />
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="nss" value="Número de seguro social" />
							</div>
							<TextInput id="nss" type="text" required />
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="card" value="Número de tarjeta" />
							</div>
							<TextInput id="card" type="text" required />
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="comment" value="Comentario Inicial" />
							</div>
							<Textarea id="comment" type="text" required />
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="comment" value="Asignar a" />
							</div>
							<Select
								id="status"
								required
								// onChange={(e) => handleFilter(e.target.value)}
							>
								<option value={0} name={0}>
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
							<Button>Agregar</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
