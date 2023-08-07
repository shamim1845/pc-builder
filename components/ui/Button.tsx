import React from "react";

const Button = ({
  handleClick,
  children,
}: {
  handleClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={handleClick}
      className="bg-teal-500 hover:bg-teal-600 px-8 py-2 text-white font-semibold rounded"
    >
      {children}
    </button>
  );
};

export default Button;
