import "./Header.css";
import MedHubLogoWhite from "../../assets/images/med-hub-logo-white.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/doctorAuthSlice";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleDoctorLogout = () => {
		localStorage.removeItem("isDoctorAuthenticated");
		localStorage.removeItem("doctorAccessToken");
		localStorage.removeItem("doctorRefreshToken");
		dispatch(logout());
		navigate("/");
	};

	return (
		<header className="p-3 mb-3 border-bottom header__container">
			<div className="container">
				<div className="d-flex flex-wrap align-items-center header-main-container justify-content-lg-start">
					<Link
						to="/"
						className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
					>
						<img className="header-image" src={MedHubLogoWhite} />
					</Link>
					<ul className="nav col col-lg-auto me-lg-auto ms-lg-4 mb-2 justify-content-center mb-md-0 desktop-header-links">
						<li>
							<NavLink
								to="/dashboard"
								className="nav-link px-2 link-dark"
							>
								Dashboard
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/doctors"
								className="nav-link px-2 link-dark"
							>
								Doctors
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/patients"
								className="nav-link px-2 link-dark"
							>
								Patients
							</NavLink>
						</li>
					</ul>

					<div className="dropdown text-end">
						<a
							href="#"
							className="d-block link-dark text-decoration-none dropdown-toggle"
							id="dropdownUser1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<img
								src="https://github.com/mdo.png"
								alt="mdo"
								width="32"
								height="32"
								className="rounded-circle"
							/>
						</a>
						<ul
							className="dropdown-menu text-small"
							aria-labelledby="dropdownUser1"
						>
							<li>
								<Link className="dropdown-item" to="#">
									Settings
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" to="/profile">
									Profile
								</Link>
							</li>
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li onClick={handleDoctorLogout}>
								<Link className="dropdown-item" to="#">
									Sign out
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;
