// import React from "react";
// import {
//   Route,
//   Routes,
//   BrowserRouter as Router,
//   useLocation,
// } from "react-router-dom";
// import AddCalendarEvent from "./features/calendar-events/components/AddCalendarEvent";
// import UpdateCalendarEvent from "./features/calendar-events/components/UpdateCalendarEvent.tsx";
// import CalendarEvents from "./features/calendar-events/components/CalendarEvents.tsx";
// import NavBar from "./components/layout/NavBar.tsx";
// import NotFound from "./components/feedback/NotFound.tsx";
// import { setSubmitted, setMessage } from "./redux/actions";
// import { useAppDispatch } from "./redux/store/index.ts";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// // import ToastMessage from "./components/ToastContainer.tsx";

// export const LocationDisplay = () => {
//   const location = useLocation();
//   return <div data-testid="location-display">{location.pathname}</div>;
// };

// const App: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const initializeCalendarEventToAdd: () => void = () => {
//     dispatch(setSubmitted(false));
//     dispatch(setMessage(""));
//   };

//   return (
//     <Router>
//       <div>
//         <NavBar initializeCalendarEventToAdd={initializeCalendarEventToAdd} />
//         {/* <ToastMessage /> */}
//         <div className="container mt-3">
//           <Routes>
//             <Route path={"/"} element={<CalendarEvents />} />
//             <Route path={"/calendar-events"} element={<CalendarEvents />} />
//             <Route path="/add" element={<AddCalendarEvent />} />
//             <Route
//               path="/calendar-events/:id"
//               element={<UpdateCalendarEvent />}
//             />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//           {/* <LocationDisplay /> */}
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
