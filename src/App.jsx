import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Login />} />
				</Route>
				<Route path="/dashboard" element={<Layout />}>
					<Route index element={<Dashboard />} />
				</Route>
				<Route path="/crear-usuario" element={<Layout />}>
					<Route index element={<CreateUser />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
