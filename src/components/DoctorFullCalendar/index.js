import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { fetchDoctorAppointments } from "../../services/doctorService";
import { API_STATUS } from "../../utils/constants";
import { useSelector } from "react-redux";

const DoctorFullCalendar = () => {
	const [appointments, setAppointments] = useState([]);
	const doctor = useSelector((state) => state.doctor.doctor);

	const fetchAppointments = async (id) => {
		const response = await fetchDoctorAppointments(id);
		if (response.status === API_STATUS.SUCCESS) {
			setAppointments(response.data);
		}
	};

	useEffect(() => {
		if (doctor?.id) {
			fetchAppointments(doctor.id);
		}
	}, [doctor]);

	return (
		<FullCalendar
			plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
			initialView="dayGridMonth"
			headerToolbar={{
				start: "today prev,next",
				center: "title",
				end: "dayGridMonth,timeGridWeek,timeGridDay",
			}}
			droppable={true}
			allDaySlot={false}
			events={
				// 	[
				// 	{
				// 		title: "event 1",
				// 		start: "2024-01-08 13:00:00",
				// 		end: "2024-01-08 14:00:00",
				// 		textColor: "#ffffff",
				// 		backgroundColor: "purple",
				// 		borderColor: "transparent",
				// 	},
				appointments.length
					? appointments.map((appointment) => {
							return {
								...appointment,
								title:
									appointment?.patientId?.name +
									", " +
									appointment?.patientId?.age,
								start: appointment?.appointmentStartTime,
								end: appointment?.appointmentEndTime,
							};
					  })
					: []
			}
		/>
	);
};

export default DoctorFullCalendar;
