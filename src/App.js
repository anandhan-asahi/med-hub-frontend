import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Doctors from "./components/Doctors";
import Patients from "./components/Patients";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginForm />}></Route>
				<Route path="/register" element={<RegisterForm />}></Route>
				<Route path="/dashboard" element={<Dashboard />}></Route>
				<Route path="/doctors" element={<Doctors />}></Route>
				<Route path="/patients" element={<Patients />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
