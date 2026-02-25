import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ToastMessage: React.FC = () => {
    useEffect((): any => { 
        toast.info("Because the backend uses the free tier of Render.com, it may take up to 30+ seconds to wake up the server on the first request. Annoying, yes, but...free has a cost, LOL.")
    }, []);

    return (
        <ToastContainer 
          position="top-center"
          autoClose={30000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // transition={Bounce}
        />
    )
};

export default ToastMessage;