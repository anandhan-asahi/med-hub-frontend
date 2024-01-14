import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import { useState } from "react";
import MedHubLogo from "../../assets/images/med-hub-logo.png";

const RegisterForm = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const onSubmitHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		navigate("/dashboard");
	};

	return (
		<div className="form__container">
			<div className="container">
				<form
					className="register-form col col-lg-8"
					onSubmit={onSubmitHandler}
				>
					<img
						className="register-form__image"
						src={MedHubLogo}
						alt={"Med Hub Logo"}
					/>
					<div className="form-name-container">
						<div className="mb-3">
							<label htmlFor="first-name" className="form-label">
								First name
							</label>
							<input
								type="text"
								className="form-control"
								id="first-name"
								placeholder="john"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="last-name" className="form-label">
								Last name
							</label>
							<input
								type="text"
								className="form-control"
								id="last-name"
								placeholder="doe"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="years" className="form-label">
								Years of Experience
							</label>
							<input
								type="number"
								className="form-control"
								id="years"
							/>
						</div>
					</div>
					<div className="mail-container">
						<div className="mb-3">
							<label htmlFor="phone" className="form-label">
								Phone
							</label>
							<input
								type="text"
								className="form-control"
								id="phone"
								placeholder="1234567890"
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								id="email"
								placeholder="johndoe@example.com"
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
							/>
						</div>
					</div>{" "}
					<div className="button__container">
						{!loading ? (
							<button type="submit" className="btn submit-button">
								Submit
							</button>
						) : (
							<div
								className="spinner-border text-primary"
								role="status"
							>
								{/* <span className="sr-only">Loading...</span> */}
							</div>
						)}
					</div>{" "}
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
