import { configureStore } from "@reduxjs/toolkit";
import doctorAuthReducer from "./features/auth/doctorAuthSlice";

export default configureStore({
	reducer: {
		doctor: doctorAuthReducer,
	},
});
