import { BrowserRouter, Route, Routes } from "react-router-dom";
import socketIO from "socket.io-client";
import Layout from "./components/layouts/Layout";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CreateCategory from "./pages/categories";

const socket = socketIO.connect("http://localhost:4000");

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Login />} />
				</Route>
				<Route path="/dashboard" element={<Layout socket={socket} />}>
					<Route index element={<Dashboard socket={socket} />} />
				</Route>
				<Route path="/crear-usuario" element={<Layout socket={socket} />}>
					<Route index element={<CreateUser />} />
				</Route>
				<Route path="/crear-categoria" element={<Layout socket={socket} />}>
					<Route index element={<CreateCategory />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
