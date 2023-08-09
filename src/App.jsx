import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CreateCategory from "./pages/categories";

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
				<Route path="/crear-categoria" element={<Layout />}>
					<Route index element={<CreateCategory />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
