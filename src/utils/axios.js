import Base from "axios";
export const doctorAxiosInstance = Base.create({
	withCredentials: false,
	baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});
doctorAxiosInstance.interceptors.request.use(
	(config) => {
		config.headers["Access-Control-Allow-Origin"] = "*";
		if (typeof window === "undefined") {
			return config;
		}
		const token = localStorage?.getItem("doctorAccessToken");
		if (token) {
			config.headers.Authorization = `${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export const patientAxiosInstance = Base.create({
	withCredentials: false,
	baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});
patientAxiosInstance.interceptors.request.use(
	(config) => {
		config.headers["Access-Control-Allow-Origin"] = "*";
		if (typeof window === "undefined") {
			return config;
		}
		const token = localStorage?.getItem("patientAccessToken");
		if (token) {
			config.headers.Authorization = `${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);
