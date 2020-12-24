import React from "react";

export default function Avatar({ username, className, ...rest }) {
  return (
    <div
      className={`inline-block rounded-full ring-2 ring-gray-50 ${
        username === "lambda"
          ? "bg-purple-500 hover:bg-purple-600"
          : "bg-green-500 hover:bg-green-600"
      } cursor-pointer p-4 text-white font-bold ${className}`}
      {...rest}
    >
      {username === "lambda" ? "NG" : "NR"}
    </div>
  );
}
