import "./Header.css";
import MedHubLogoWhite from "../../assets/images/med-hub-logo-white.jpg";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
	return (
		<header className="p-3 mb-3 border-bottom header__container">
			<div className="container">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					<Link
						to="/"
						className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
					>
						<img className="header-image" src={MedHubLogoWhite} />
					</Link>

					<ul className="nav col-12 col-lg-auto me-lg-auto ms-lg-4 mb-2 justify-content-center mb-md-0 header-links">
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
								<a className="dropdown-item" href="#">
									New project...
								</a>
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Settings
								</a>
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Profile
								</a>
							</li>
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li>
								<a className="dropdown-item" href="#">
									Sign out
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;
