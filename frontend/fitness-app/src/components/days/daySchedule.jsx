import React from "react";
import { useFormContext } from "react-hook-form";

const DaySchedule = ({ day, exercises }) => {
  const { register } = useFormContext();

  return (
    <div>
      <h2>{day}</h2>
      <div className="day-selection-wrapper">
        <label htmlFor={`exercise1_${day}`}>Exercise 1</label>
        <select {...register(`exercise1_${day}`, { required: true })}>
          <option value="" disabled>
            Select an exercise
          </option>
          {exercises.map((exercise, index) => (
            <option key={index} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>

        <label htmlFor={`exercise2_${day}`}>Exercise 2</label>
        <select {...register(`exercise2_${day}`, { required: true })}>
          <option value="" disabled>
            Select an exercise
          </option>
          {exercises.map((exercise, index) => (
            <option key={index} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>

        <label htmlFor={`exercise3_${day}`}>Exercise 3</label>
        <select {...register(`exercise3_${day}`, { required: true })}>
          <option value="" disabled>
            Select an exercise
          </option>
          {exercises.map((exercise, index) => (
            <option key={index} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DaySchedule;
