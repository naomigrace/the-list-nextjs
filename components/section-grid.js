import React from "react";

export default function SectionGrid(props) {
  return (
    <section className="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-16 md:mb-12 justify-center" {...props}/>
  )
}
