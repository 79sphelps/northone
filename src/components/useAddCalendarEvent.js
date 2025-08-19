// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import "react-time-picker/dist/TimePicker.css";
// import "react-clock/dist/Clock.css";
// import { addCalendarEvent, setCalendarEventToAdd } from "../redux/actions";
// import { selectCalendarEventToAdd } from "../redux/selectors";
// import { formatDate } from "../redux/utils";

// export function useAddCalendarEvent() {
//   const dispatch = useDispatch();
//   const CalendarEventToAdd = useSelector(selectCalendarEventToAdd);
//   const [submitted, setSubmitted] = useState(false);
//   const [dateValue, onChange] = useState(new Date());
//   const [timeValue, onChangeTimeValue] = useState(""); // useState('10:00');
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const storedCalendarEventToAdd = JSON.parse(
//       localStorage.getItem("calendarEventToAdd")
//     );
//     if (storedCalendarEventToAdd) {
//       dispatch(setCalendarEventToAdd(storedCalendarEventToAdd));
//     }
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     if (!CalendarEventToAdd) {
//       let calendarEventToAdd = {
//         id: null,
//         title: "",
//         description: "",
//         status: false,
//         dueDate: formatDate(new Date()),
//         start: "",
//       };
//       localStorage.setItem(
//         "calendarEventToAdd",
//         JSON.stringify(calendarEventToAdd)
//       );
//     }
//   }, [CalendarEventToAdd]);

//   let initialCalendarEventState = {
//     id: null,
//     title: "",
//     description: "",
//     status: false,
//     dueDate: formatDate(new Date()),
//     start: "",
//   };

//   const saveCalendarEvent = (event) => {
//     if (!dateValue) return;
//     const data = {
//       title: event.title,
//       description: event.description,
//       status: false,
//       dueDate: dateValue,
//       start: timeValue,
//     };
//     dispatch(addCalendarEvent(data));
//     localStorage.removeItem("calendarEventToAdd");
//     setMessage("CalendarEvent item created successfully!");
//   };

//   const newCalendarEvent = () => {
//     dispatch(setCalendarEventToAdd(initialCalendarEventState));
//     setSubmitted(false);
//     setMessage("");
//   };

//   return {
//     saveCalendarEvent,
//     newCalendarEvent,
//     message,
//     submitted,
//   }
// }