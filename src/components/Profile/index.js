import { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import MultiSelectDropdown from "../MultiSelectDropdown";
import "./Profile.css";
import SingleSelectDropdown from "../SingleSelectDropdown";
import { getAvailableTimings } from "../../services/availableTimingService";
import { API_STATUS } from "../../utils/constants";
import {
	getDoctorProfessions,
	updateDoctorDetails,
} from "../../services/doctorService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/features/auth/doctorAuthSlice";

const Profile = () => {
	const doctor = useSelector((state) => state.doctor.doctor);
	const initialValue = {
		firstName: doctor?.firstName || "",
		lastName: "",
		email: "",
		phone: "",
		yearsOfExperience: 0,
		doctorProfessionId: null,
		availableTimings: [],
	};
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	const [formValues, setFormValues] = useState(initialValue);
	const [availableTimings, setAvailableTimings] = useState([]);
	const [doctorProfessions, setDoctorProfessions] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isFormValid =
		formValues.firstName &&
		formValues.lastName &&
		formValues.phone &&
		formValues.email &&
		formValues.doctorProfessionId &&
		formValues.yearsOfExperience &&
		formValues.availableTimings.length
			? true
			: false;

	const handleMultiSelectChange = (selectedValues) => {
		setFormValues((prevState) => ({
			...prevState,
			["availableTimings"]: selectedValues?.map((value) => value.value),
		}));
		setSelectedOptions(selectedValues?.map((value) => value));
	};

	const handleSingleSelectChange = (selectedValue) => {
		setFormValues((prevState) => ({
			...prevState,
			["doctorProfessionId"]: selectedValue ? selectedValue.value : null,
		}));
		setSelectedOption(selectedValue ? selectedValue.label : null);
	};

	const formChangeHandler = (key, value) => {
		setFormValues((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const fetchAvailableTimings = async () => {
		const response = await getAvailableTimings();
		if (response.status === API_STATUS.SUCCESS) {
			setAvailableTimings(response.data);
		}
	};

	const fetchDoctorProfessions = async () => {
		const response = await getDoctorProfessions();
		if (response.status === API_STATUS.SUCCESS) {
			setDoctorProfessions(response.data);
		}
	};

	useEffect(() => {
		fetchAvailableTimings();
		fetchDoctorProfessions();
	}, []);

	useEffect(() => {
		console.log(doctor);
		setFormValues((prevState) => ({
			...prevState,
			...doctor,
			phone: doctor?.phoneNumber,
			doctorProfessionId: doctor?.doctorProfessionId?.id,
			availableTimings: doctor?.availableTimings?.map(
				(timing) => timing.id
			),
		}));
		if (Object.keys(doctor).length) {
			setSelectedOption(doctor?.doctorProfessionId?.name);
			setSelectedOptions(
				doctor?.availableTimings?.map((timing) => {
					return { value: timing?.id, label: timing?.name };
				})
			);
		}
	}, [doctor]);

	const submitHandler = async (e) => {
		e.preventDefault();
		const response = await updateDoctorDetails(doctor.id, formValues);
		dispatch(login(response.data));
		setLoading(false);
		navigate("/dashboard");
	};

	return (
		<MainLayout>
			<div className="container">
				<div className="col col-lg-12 justify-content-center d-flex">
					<form className="form-container" onSubmit={submitHandler}>
						<div className="row">
							<div className="col-12 gap-10 col-lg-6">
								<label
									htmlFor="first-name"
									className="form-label"
								>
									First name
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter your first name"
									id="first-name"
									value={formValues.firstName}
									onChange={(e) =>
										formChangeHandler(
											"firstName",
											e.target.value
										)
									}
								/>
							</div>
							<div className="col-12 mt-3 mt-lg-0 col-lg-6">
								<label
									htmlFor="last-name"
									className="form-label"
								>
									Last name
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter your last name"
									id="last-name"
									value={formValues.lastName}
									onChange={(e) =>
										formChangeHandler(
											"lastName",
											e.target.value
										)
									}
								/>
							</div>
							<div className="col-12 mt-3 col-lg-6">
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter your email"
									id="email"
									value={formValues.email}
									onChange={(e) =>
										formChangeHandler(
											"email",
											e.target.value
										)
									}
								/>
							</div>
							<div className="col-12 mt-3 col-lg-6">
								<label htmlFor="phone" className="form-label">
									Phone
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter your phone number"
									id="phone"
									value={formValues.phone}
									onChange={(e) =>
										formChangeHandler(
											"phone",
											e.target.value
										)
									}
								/>
							</div>
							<div className="col-12 mt-3 col-lg-6">
								<label
									htmlFor="experience"
									className="form-label"
								>
									Years of experience
								</label>
								<input
									type="number"
									className="form-control"
									placeholder="Enter your years of experience"
									id="experience"
									value={formValues.yearsOfExperience}
									onChange={(e) =>
										formChangeHandler(
											"yearsOfExperience",
											e.target.value
										)
									}
								/>
							</div>
							<div className="col-12 mt-3 col-lg-6">
								<label
									htmlFor="singleSelect"
									className="form-label"
								>
									Select profession type
								</label>
								<SingleSelectDropdown
									options={doctorProfessions}
									selectedValue={selectedOption}
									onChange={handleSingleSelectChange}
								/>
							</div>
							<div className="col-12 mt-3 col-lg-12">
								<label
									htmlFor="multiSelect"
									className="form-label"
								>
									Select available timings
								</label>
								<MultiSelectDropdown
									options={availableTimings}
									selectedValues={selectedOptions}
									onChange={handleMultiSelectChange}
								/>
							</div>
							<div className="col-12 mt-3 col-lg-12 d-flex justify-content-center">
								<div className="button__container profile-submit-button">
									{/* {error && <p className="error-message">{error}</p>} */}
									{!loading ? (
										<button
											type="submit"
											className="btn submit-button"
											disabled={
												isFormValid ? false : true
											}
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
							</div>
						</div>
					</form>
				</div>
			</div>
		</MainLayout>
	);
};

export default Profile;
