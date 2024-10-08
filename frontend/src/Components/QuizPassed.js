import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

export default function QuizPassed({ title, score, passed, time }) {
  return (
    <div className="flex justify-evenly mt-10">
      <div className="flex">
        <div className="rounded-full p-2 bg-gray-300">
          {passed ? (
            <FaCheck
              size={40}
              color='green'
            />
          ) : (
            <IoCloseSharp color="red" size={40} />
          )}
        </div>
        <div className="ml-4">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-xl font-bold">{score}</p>
        </div>
      </div>
      <div
        className={`${
          passed  ? "bg-primary dark:bg-DarkGray" : "bg-red-600"
        } text-white px-7 py-4`}>
        <h1 className="font-semibold text-xl">{passed ? "Passed" : "Fail"}</h1>
      </div>
      <div className="py-2">
        <h1 className="text-xl font-semibold">{time}</h1>
      </div>
    </div>
  );
}
