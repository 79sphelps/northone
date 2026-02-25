import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import Loader from "../components/feedback/Loader";
import { useAppDispatch } from "../redux/store/index.ts";
import { setSubmitted, setMessage } from "../redux/actions";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const initializeCalendarEventToAdd: () => void = () => {
    dispatch(setSubmitted(false));
    dispatch(setMessage(""));
  };

  return (
    <div>
      <NavBar initializeCalendarEventToAdd={initializeCalendarEventToAdd} />
      <main className="flex-1 p-4 max-w-3xl mx-auto w-full">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default AppLayout;
