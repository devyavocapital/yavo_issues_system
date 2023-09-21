import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSocket from "../../../hooks/useSocket";
import useToken from "../../../hooks/useToken";
import { fetched } from "../../utils/fetched";
import {
	fnGetCategories,
	fnGetIssues,
	fnGetNames,
} from "../../utils/getFunctions";
import { statusFilters } from "../../utils/statusFilters";

export default function EditIssue() {
	const navigation = useNavigate();
	const { token } = useToken();
	const { socket } = useSocket();
	const [names, setNames] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [values, setValues] = useState({});
	const [client, setClient] = useState("");
	const id = window.location.pathname.split("/")[3];

	useEffect(() => {
		const getData = async () => {
			setNames(await fnGetNames(token));
			setCategories(await fnGetCategories(token));

			const response = await fnGetIssues(token, null, id);
			const issue = response.issue[0][0];
			setClient(
				`${issue.NAMECLIENT} ${issue.LASTNAME} ${issue.MOTHERLASTNAME}`,
			);

			setValues({
				nameClient: issue.NAMECLIENT,
				creditNumber: issue.CREDITNUMBER,
				socialNumber: issue.SOCIALNUMBER,
				cardNumber: issue.CARDNUMBER,
				assignTo: issue.ASSIGNTO,
				category: issue.CATEGORY_ID,
				lastnameClient: issue.LASTNAME,
				motherLastnameClient: issue.MOTHERLASTNAME,
				daysConfig: issue.DAYS_CONFIG,
				status: issue.STATUS,
			});

			setTimeout(() => {
				setLoading(false);
			}, 500);
		};
		getData();
	}, []);

	const {
		nameClient,
		creditNumber,
		socialNumber,
		cardNumber,
		assignTo,
		category,
		lastnameClient,
		motherLastnameClient,
		daysConfig,
		status,
	} = values;

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = values;
		const dataNotification = {
			userAssignated: data.assignTo,
			originalClient: `${data.nameClient} ${data.lastnameClient} ${data.motherLastnameClient}`,
			category: data.category,
			newNameClient: client,
		};

		socket.emit("notification", dataNotification);
		await fetched(token, "notifications/data", "PUT", dataNotification);
		await fetched(token, `issues?id=${id}`, "PUT", data);

		navigation("/dashboard");
	};

	return (
		<form className="grid mx-auto my-10 w-8/12">
			<div className="space-y-6">
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
						value={nameClient}
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
						value={lastnameClient}
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
						value={motherLastnameClient}
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
						value={creditNumber}
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
						value={socialNumber}
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
						value={cardNumber}
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
						<option value={0} name={0}>
							Sin Asignar
						</option>
						{!loading &&
							names.map((name) => (
								<option
									key={name.ID}
									value={name.ID}
									selected={assignTo === name.ID}
								>
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
						<option value={""} name={""} selected={category === "NULL"}>
							Sin Asignar
						</option>
						{!loading &&
							categories.map((category) => (
								<option
									key={category.ID}
									value={category.ID}
									name={category.ID}
									selected={category}
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
							(s) =>
								s.name !== "all" && (
									<option
										key={s.name}
										value={s.name}
										name={s.name}
										selected={status === s.name}
									>
										{s.text}
									</option>
								),
						)}
					</Select>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="daysConfig" value="Número de días a expirar" />
					</div>
					<TextInput
						id="daysConfig"
						name="daysConfig"
						type="number"
						min={0}
						required
						onChange={(e) => handleChange(e)}
						value={daysConfig}
					/>
				</div>
				<div className="w-full">
					<Button onClick={(e) => handleSubmit(e)}>Actualizar</Button>
				</div>
			</div>
		</form>
	);
}
