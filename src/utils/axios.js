import Base from "axios";
const axios = Base.create({
	withCredentials: false,
	baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});
axios.interceptors.request.use(
	(config) => {
		config.headers["Access-Control-Allow-Origin"] = "*";
		if (typeof window === "undefined") {
			return config;
		}
		const token = localStorage?.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);
export default axios;
