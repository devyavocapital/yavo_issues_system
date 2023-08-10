import ModuleNotification from "../module/ModuleNotification";
/* eslint-disable react/prop-types */
import { Dropdown, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ user, socket }) => {
	const navigate = useNavigate();

	const handleSignOut = (e) => {
		e.preventDefault();
		localStorage.removeItem("yavocapital_session");
		navigate("/");
	};

	return (
		<Navbar fluid rounded>
			<Navbar.Brand href="/">
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					Tickets
				</span>
			</Navbar.Brand>
			<div className="flex md:order-2">
				<ModuleNotification socket={socket} user={user} />
				<img
					alt="User settings"
					src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
					className="w-[35px] h-[35px] rounded-full"
				/>
				<Dropdown inline>
					<Dropdown.Header>
						<span className="block text-sm">{`${user.nombre} ${user.apellido_paterno}`}</span>
						<span className="block truncate text-sm font-medium">
							{user.email}
						</span>
					</Dropdown.Header>
					{user.category === 1 && (
						<div className="grid gap-2 mb-2">
							<Link to="/crear-usuario" className="ml-4 hover:text-cyan-600">
								Crear Usuario
							</Link>
							<Link to="/crear-categoria" className="ml-4 hover:text-cyan-600">
								Crear Categoría
							</Link>
						</div>
					)}
					<Dropdown.Divider />
					<div className="flex justify-center">
						<button
							className="flex justify-center"
							type="button"
							onClick={handleSignOut}
						>
							<span>
								{/* rome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
									/>
								</svg>
							</span>
							<p>Sign out</p>
						</button>
					</div>
				</Dropdown>
				<Navbar.Toggle />
			</div>
		</Navbar>
	);
};

export default Navigation;
