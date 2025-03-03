import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';

// Custom input component for DatePicker
const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    type="button"
    className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  >
    <span>{value}</span>
    <FiCalendar className="h-5 w-5 text-gray-400" />
  </button>
));

CustomInput.displayName = 'CustomDatePickerInput';

export default function DateRangePicker({ dateRange, setDateRange }) {
  const [startDate, setStartDate] = useState(dateRange.startDate);
  const [endDate, setEndDate] = useState(dateRange.endDate);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    
    if (start && end) {
      setDateRange({ startDate: start, endDate: end });
    }
  };

  const predefinedRanges = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
  ];

  const setRange = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    setStartDate(start);
    setEndDate(end);
    setDateRange({ startDate: start, endDate: end });
  };

  return (
    <div className="w-full sm:w-auto">
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Date Range</h3>
          <div className="flex space-x-1">
            {predefinedRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => setRange(range.days)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded transition-colors duration-200"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        customInput={<CustomInput />}
        maxDate={new Date()}
      />
      
      {startDate && endDate && (
        <div className="mt-2 text-sm text-gray-500">
          {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
        </div>
      )}
    </div>
  );
}