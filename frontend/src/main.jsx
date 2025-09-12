import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);

// createRoot(document.getElementById("root")).render(
// 	<StrictMode>
// 		{/* adding your start up page */}
// 		{/* like this  <Your page name /> */}
// 		<div
// 			style={{
// 				backgroundColor: "var(--dark-gray-color)",
// 				width: "100%",
// 				height: "50vh",
// 				color: "var(--secondary-text-color)",
// 				display: "flex",
// 				alignItems: "center",
// 				justifyContent: "center",
// 				textTransform: "capitalize",
// 			}}
// 		>
// 			hi just hello
// 		</div>
// 		<div
// 			style={{
// 				backgroundColor: "var(--background-color)",
// 				width: "100%",
// 				height: "50vh",
// 				color: "var(--primary-text-color)",
// 				display: "flex",
// 				alignItems: "center",
// 				justifyContent: "center",
// 				textTransform: "capitalize",
// 			}}
// 		>
// 			hi just hello
// 		</div>
// 	</StrictMode>
// );
