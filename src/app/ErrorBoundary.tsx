import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorBoundary = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-xl font-bold">
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </div>
        )
    }

    return (
        <div className="p-6 text-center">
            <h1 className="text-xl font-bold">
                Something went wrong
            </h1>
            <p>Try again later.</p>
        </div>
    );
};

export default ErrorBoundary;