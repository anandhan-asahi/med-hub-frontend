import { doctorAxiosInstance } from "../utils/axios";

export const getAvailableTimings = async () => {
	try {
		const response = await doctorAxiosInstance.get("/available-timing");
		return response.data;
	} catch (error) {
		return error.response;
	}
};
