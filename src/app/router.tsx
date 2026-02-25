import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { lazy } from "react";
import AppLayout from "./AppLayout";
import ErrorBoundary from "./ErrorBoundary";

const CalendarEventsPage = lazy(
    () => import("../features/calendar-events/pages/CalendarEventsPage")
);
const AddCalendarEventPage = lazy(
    () => import("../features/calendar-events/pages/AddCalendarEventPage")
);
const UpdateCalendarEventPage = lazy(
    () => import("../features/calendar-events/pages/UpdateCalendarEventPage")
);
const NotFoundPage = lazy(
    () => import("../components/feedback/NotFoundPage")
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Navigate to="/calendar-events" replace />,
            },
            {
                path: "/calendar-events",
                element: <CalendarEventsPage />,
            },
            {
                path: "/add",
                element: <AddCalendarEventPage />,
            },
            {
                path: "/calendar-events/:id",
                element: <UpdateCalendarEventPage />,
            }, 
            {
                path: "*",
                element: <NotFoundPage />,
            }
        ]
    }
]);