import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useEffect, useState } from "react";
import MedHubLogo from "../../assets/images/med-hub-logo.png";
import { handleDoctorLogin } from "../../services/doctorService";
import { API_STATUS } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/auth/doctorAuthSlice";

const LoginForm = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (email && password) {
			setLoading(true);
			const response = await handleDoctorLogin({ email, password });
			if (response?.data.status === API_STATUS.ERROR) {
				setLoading(false);
				setError(response?.data.message);
			} else if (
				response?.status === API_STATUS.SUCCESS &&
				response?.data?.auth?.token
			) {
				setError("");
				setLoading(false);
				dispatch(login(response?.data.doctor));
				console.log(response?.data);
				localStorage.setItem(
					"doctorAccessToken",
					response?.data?.auth?.token
				);
				localStorage.setItem("isDoctorAuthenticated", true);
				localStorage.setItem(
					"doctorRefreshToken",
					response?.data?.refresh?.token
				);
				navigate("/dashboard");
			}
		}
	};

	useEffect(() => {
		const isDoctorAuthenticated = localStorage.getItem(
			"isDoctorAuthenticated"
		);
		const doctorAccessToken = localStorage.getItem("doctorAccessToken");
		if (
			(isDoctorAuthenticated && isDoctorAuthenticated === "true") ||
			doctorAccessToken
		) {
			navigate("/dashboard");
		}
	}, [navigate]);

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
							placeholder="john.doe@company.com"
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
							placeholder="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<div className="button__container">
						{error && <p className="error-message">{error}</p>}
						{!loading ? (
							<button
								type="submit"
								className="btn submit-button"
								disabled={email && password ? false : true}
							>
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
