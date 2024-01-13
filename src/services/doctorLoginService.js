import axios from "../utils/axios";

export const handleDoctorLogin = async (values) => {
	try {
		const response = await axios.put("/doctor/auth/login", {
			email: values.email,
			password: values.password,
		});
		return response.data;
	} catch (error) {
		return error.response;
	}
};
