import React from 'react';
import './App.css';

export const App = () => {
  return (
    <div class='text-gray-200 w-full f-col items-center'>
      <div class='p-4 text-6xl'>24</div>
      <div class='button'>Click to generate numbers...</div>
      <div class='f-row mt-4'>
        <div class='number mr-4'>1</div>
        <div class='number mr-4'>2</div>
        <div class='number mr-4'>3</div>
        <div class='number'>4</div>
      </div>
    </div>
  );
}
