import { doctorAxiosInstance } from "../utils/axios";

export const handleDoctorLogin = async (values) => {
	try {
		const response = await doctorAxiosInstance.put("/doctor/auth/login", {
			email: values.email,
			password: values.password,
		});
		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const handleDoctorLogout = (values) => {
	localStorage.removeItem("isDoctorAuthenticated");
	localStorage.removeItem("doctorAccessToken");
};

export const fetchDoctorAppointments = async (id) => {
	try {
		const response = await doctorAxiosInstance.get(
			`/doctor/appointments/${id}`
		);
		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const getDoctorProfessions = async (id) => {
	try {
		const response = await doctorAxiosInstance.get("/doctor/professions");
		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const getDoctorDetails = async () => {
	try {
		const response = await doctorAxiosInstance.get("/doctor/details");
		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const updateDoctorDetails = async (id, values) => {
	try {
		const response = await doctorAxiosInstance.put(`/doctor/${id}`, values);
		return response.data;
	} catch (error) {
		return error.response;
	}
};
