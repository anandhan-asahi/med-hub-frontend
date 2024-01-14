import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoctorDetails } from "../../../services/doctorService";

export const doctorAuthSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated:
			localStorage.getItem("isAuthenticated") === "true" || false,
		doctor: {},
	},
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.doctor = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.doctor = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDoctorDetails.fulfilled, (state, action) => {
			state.isAuthenticated = true;
			state.doctor = action.payload;
		});
	},
});

export const fetchDoctorDetails = createAsyncThunk(
	"doctorAuthSlice/fetchDoctorDetails",
	async () => {
		const existingDoctor = await getDoctorDetails();
		return existingDoctor.data;
	}
);

export const { login, logout } = doctorAuthSlice.actions;

export default doctorAuthSlice.reducer;
