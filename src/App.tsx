import React, {useState} from 'react';
import './App.css';
import { generatePuzzle } from './logic.ts';

export const App = () => {
  const [digits, setDigits] = useState<number[]>([]);

  return (
    <div className='text-gray-200 w-full f-col items-center'>
      <div className='p-4 text-6xl'>24</div>
      <button className='button' onClick={() => {
        const [numbers, solutions] = generatePuzzle();
        setDigits(numbers);
        console.log(solutions);
      }}>Click to generate numbers...</button>
      <div className='f-col mt-4'>
        <div className='f-row'>
          <div className='number mr-4'>{digits[0] || ' '}</div>
          <div className='number'>{digits[1] || ' '}</div>
        </div>
        <div className='f-row mt-4'>
          <div className='number mr-4'>{digits[2] || ' '}</div>
          <div className='number'>{digits[3] || ' '}</div>
        </div>
      </div>
    </div>
  );
}
