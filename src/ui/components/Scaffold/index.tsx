import { PropsWithChildren } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Scaffold({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer hideProgressBar pauseOnHover={false} theme="colored" />
    </>
  );
}

export default Scaffold;
