import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";

const Answer = ({ answerData, updateAnswer,deleteAnswer }) => {
  const updateText = (e) => {
    updateAnswer({...answerData, answer: e.target.value });
  };
  const updateIsCorrect = (e) => {
    updateAnswer({ ...answerData, is_correct:e.target.checked });
  };

  return (
    <div className='mb-4'>
      <div className='flex items-end justify-between gap-5'>
        <div className="flex items-center border-b dark:border-DarkGray border-primary-500 py-2">
          <input placeholder="answer" value={answerData.answer} onChange={updateText} className="text-xl appearance-none bg-transparent border-none mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" aria-label="lesson name" />
        </div>
        <div className="flex items-center ">
          <input onChange={updateIsCorrect} checked={answerData.is_correct} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-secondary bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-secondary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium">Correct</label>
        </div>
        <MdDelete onClick={deleteAnswer} className='hover:bg-slate-200  rounded-2xl dark:bg-transparent p-2 box-content hover:cursor-pointer'/>
      </div>
    </div>
  );
};
export default Answer