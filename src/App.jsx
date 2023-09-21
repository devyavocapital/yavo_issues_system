import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import socketIO from "socket.io-client";
import useSocket from "../hooks/useSocket";
import Layout from "./components/layouts/Layout";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Stats from "./pages/Stats";
import CreateCategory from "./pages/categories";
import EditIssue from "./pages/edit/[id]";

const socket = socketIO.connect("http://localhost:4000");

function App() {
	const { handleSocket } = useSocket();

	useEffect(() => {
		handleSocket(socket);
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Login />} />
				</Route>
				{/* <Route path="/dashboard" element={<Layout socket={socket} />}> */}
				<Route path="/dashboard" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="edit/:id" element={<EditIssue />} />
					<Route path="estadisticas" element={<Stats />} />
				</Route>
				<Route path="/crear-usuario" element={<Layout />}>
					<Route index element={<CreateUser />} />
				</Route>
				<Route path="/crear-categoria" element={<Layout />}>
					<Route index element={<CreateCategory />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
