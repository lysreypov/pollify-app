import React from "react";
import ReactDOM from "react-dom";

interface AlertProps {
  variant: "success" | "error" | "info";
  message: string;
  showAlert: boolean;
}

const Alert: React.FC<AlertProps> = ({
  variant,
  message,
  showAlert = false,
}) => {
  return ReactDOM.createPortal(
    <div
      className={`fixed top-4 right-8 z-50  ${
        showAlert ? "block animate-slideR" : "animate-slideL hidden"
      } min-w-[200px]`}
    >
      <div
        className={`absolute left-0 top-0 w-[6px] h-full rounded-br-2xl rounded-tr-2xl bg-gradient-to-b  ${
          variant === "success"
            ? "from-[#2D9CDB] to-blue-200"
            : variant === "error"
            ? "from-red-400 to-red-200"
            : ""
        }`}
      />
      <div
        className={`p-4 rounded ${
          variant === "success"
            ? "bg-gray-50 border-[1px] border-blue-custom text-black"
            : variant === "error"
            ? "bg-gray-50 border-[1px] border-red-500 text-red-500"
            : "bg-blue-500"
        } `}
      >
        {message}
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

export default Alert;
