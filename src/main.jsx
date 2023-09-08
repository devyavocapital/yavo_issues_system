import ReactDOM from "react-dom/client";
import { GlobalProvider } from "../contexts/GlobalContext.jsx";
import { SocketProvider } from "../contexts/socket/SocketContext.jsx";
import { TokenProvider } from "../contexts/token/TokenContext.jsx";
import { UserProvider } from "../contexts/user/UserContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<TokenProvider>
		<UserProvider>
			<SocketProvider>
				<GlobalProvider>
					<App />
				</GlobalProvider>
			</SocketProvider>
		</UserProvider>
	</TokenProvider>,
);
