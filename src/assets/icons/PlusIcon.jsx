import React from "react";

function PlusIcon({ height = "1.042vw", width = "1.094vw", color = "#C4C4C4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 21 20"
    >
      <rect width="3" height="20" x="9" fill={color} rx="1.5"></rect>
      <rect
        width="3"
        height="21"
        x="21"
        y="8"
        fill={color}
        rx="1.5"
        transform="rotate(90 21 8)"
      ></rect>
    </svg>
  );
}

export default PlusIcon;
