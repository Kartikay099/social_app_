import React from "react";

const AutoScroller = ({ children, className }) => {
  return (
    <div className={`flex items-center overflow-x-auto no-scrollbar ${className}`}>
      {children}
    </div>
  );
};

export default AutoScroller; 