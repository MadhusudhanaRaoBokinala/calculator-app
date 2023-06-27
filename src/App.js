import React, { useState } from 'react';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputOperator = (nextOperator) => {
    if (operator && !waitingForSecondOperand) {
      performOperation();
    }

    setOperator(nextOperator);
    setFirstOperand(parseFloat(displayValue));
    setWaitingForSecondOperand(true);
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
      setWaitingForSecondOperand(false);
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const backspace = () => {
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue('0');
    }
  };

  const performOperation = () => {
    const inputValue = parseFloat(displayValue);

    let result;
    if (operator === '+') {
      result = firstOperand + inputValue;
    } else if (operator === '-') {
      result = firstOperand - inputValue;
    } else if (operator === '*') {
      result = firstOperand * inputValue;
    } else if (operator === '/') {
      result = firstOperand / inputValue;
    } else {
      result = inputValue;
    }

    setDisplayValue(`${result}`);
    setOperator(null);
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
  };

  const buttons = [
    { label: 'AC', className: 'col-span-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg p-2 rounded', onClick: clearDisplay },
    { label: '←', className: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: backspace },
    { label: '+', className: ' bg-slate-900 hover:bg-black text-white font-semibold text-lg p-2 rounded', onClick: () => inputOperator('+') },
    { label: '7', className: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: () => inputDigit('7') },
    { label: '8', className: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: () => inputDigit('8') },
    { label: '9', className: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: () => inputDigit('9') },
    { label: '÷', className: 'bg-slate-900 hover:bg-black text-white font-semibold text-lg p-2 rounded', onClick: () => inputOperator('/') },
    { label: '4', className: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: () => inputDigit('4') },
    { label: '5', className: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: () => inputDigit('5') },
    { label: '6', className: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: () => inputDigit('6') },
    { label: '×', className: 'bg-slate-900 hover:bg-black text-white font-semibold text-lg p-2 rounded', onClick: () => inputOperator('*') },
    { label: '1', className: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: () => inputDigit('1') },
    { label: '2', className: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: () => inputDigit('2') },
    { label: '3', className: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: () => inputDigit('3') },
    { label: '-', className: 'bg-slate-900 hover:bg-black text-white font-semibold text-lg p-2 rounded', onClick: () => inputOperator('-') },
    { label: '.', className: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: inputDecimal },
    { label: '0', className: 'col-span-2 bg-gray-200  hover:bg-gray-300 text-gray-700 font-semibold text-lg p-2 rounded', onClick: () => inputDigit('0') },
    { label: '=', className: 'bg-violet-500 hover:bg-violet-600 text-white font-semibold text-lg p-2 rounded', onClick: performOperation },
  ];

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-b from-gray-500 to-black">
      <h2 className='text-4xl text-white p-8 mt-4'>Calculator</h2>
      <div className="w-80 border border-gray-300 rounded p-4 shadow-black shadow-md">
        <div className="mb-4">
          <input
            type="text"
            className="w-full bg-white text-right text-2xl p-2 rounded outline-none"
            value={`${firstOperand || ''} ${operator || ''} ${waitingForSecondOperand ? '' : displayValue}`}
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((button) => (
            <button
              key={button.label}
              className={button.className}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
