import React, {useState} from 'react';
import './App.css';
import { generatePuzzle } from './logic.ts';

export const App = () => {
  const [digits, setDigits] = useState<number[]>([]);

  return (
    <div class='text-gray-200 w-full f-col items-center'>
      <div class='p-4 text-6xl'>24</div>
      <button class='button' onClick={() => setDigits(generatePuzzle())}>Click to generate numbers...</button>
      <div class='f-col mt-4'>
        <div class='f-row'>
          <div class='number mr-4'>{digits[0] || ' '}</div>
          <div class='number'>{digits[1] || ' '}</div>
        </div>
        <div class='f-row mt-4'>
          <div class='number mr-4'>{digits[2] || ' '}</div>
          <div class='number'>{digits[3] || ' '}</div>
        </div>
      </div>
    </div>
  );
}
