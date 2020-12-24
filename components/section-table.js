import React from "react";

export default function SectionTable(props) {
  return (
    <section
      className="hidden md:block flex-col md:flex-row flex space-y-6 md:space-y-0 md:space-x-6 items-center md:justify-between mb-16 md:mb-12"
      {...props}
    />
  );
}
