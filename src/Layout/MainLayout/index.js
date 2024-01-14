import { Fragment, useEffect } from "react";
import SideBar from "../../components/SideBar";
import "./MainLayout.css";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorDetails } from "../../redux/features/auth/doctorAuthSlice";
import { useNavigate } from "react-router-dom";

const MainLayout = (props) => {
	const doctor = useSelector((state) => state.doctor.doctor);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuthenticated =
		localStorage.getItem("isDoctorAuthenticated") === "true";
	useEffect(() => {
		if (isAuthenticated && !Object.keys(doctor).length) {
			dispatch(fetchDoctorDetails());
		}
	}, [doctor]);

	useEffect(() => {
		const isDoctorAuthenticated = localStorage.getItem(
			"isDoctorAuthenticated"
		);
		const doctorAccessToken = localStorage.getItem("doctorAccessToken");
		if (!isDoctorAuthenticated || !doctorAccessToken) {
			localStorage.removeItem("isDoctorAuthenticated");
			localStorage.removeItem("doctorAccessToken");
			localStorage.removeItem("doctorRefreshToken");
			navigate("/");
		}
	}, [navigate]);

	return (
		<Fragment>
			<div className="main-layout__container">
				<div className="main-layout__items">
					<Header />
					<div className="main-layout__content">{props.children}</div>
				</div>
			</div>
		</Fragment>
	);
};

export default MainLayout;
