import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useState } from "react";
import MedHubLogo from "../../assets/images/med-hub-logo.png";
import { handleDoctorLogin } from "../../services/doctorLoginService";

const LoginForm = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (email && password) {
			setLoading(true);
			const response = await handleDoctorLogin({ email, password });
			console.log(response, "------");
			if (response?.data?.token) {
				// navigate(path);
				return;
			}
		}

		// navigate("/dashboard");
	};

	return (
		<div className="form__container">
			<div className="container">
				<form
					className="login-form col col-lg-4"
					onSubmit={onSubmitHandler}
				>
					<img className="login-form__image" src={MedHubLogo} />
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="johndoe@example.com"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value.trim());
							}}
						/>
						<div id="emailHelp" className="form-text">
							We'll never share your email with anyone else.
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<div className="button__container">
						{!loading ? (
							<button type="submit" className="btn submit-button">
								Submit
							</button>
						) : (
							<div
								className="spinner-border text-primary"
								role="status"
							></div>
						)}
					</div>

					<div className="login-form-link__container">
						Didn't have an account?
						<Link className="login-form-link" to="/register">
							{" "}
							Register here
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
