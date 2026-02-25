import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import Loader from "../components/feedback/Loader";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch } from "../redux/store/index.ts";
import { setSubmitted, setMessage } from "../redux/actions";

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const initializeCalendarEventToAdd: () => void = () => {
    dispatch(setSubmitted(false));
    dispatch(setMessage(""));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar initializeCalendarEventToAdd={initializeCalendarEventToAdd} />
      <main className="flex-1 p-4 max-w-3xl mx-auto w-full">
        <Suspense fallback={<Loader />}>
          {/* <Outlet context={{ filter }} /> */}
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default AppLayout;
