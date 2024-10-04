import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

// get days from array into exercise headers
//
// TODO Get all input into one day
// TODO Console.log what gets returned on submit
// TODO Transform the onSubmit data into data that can be posted into the db
//

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Schedule = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedExercises, setSelectedExercises] = useState([]);
  // const [days, setDays] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // const getDays = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5000/days");
    //     const formattedDays = response.data.map((item) => ({
    //       id: item.id,
    //       name: item.name,
    //     }));
    //     setDays(formattedDays);
    //   } catch (error) {
    //     console.log("Error retrieving days", error);
    //   }
    // };
    const getAllExercises = async () => {
      try {
        const response = await axios.get("http://localhost:5000/exercises");
        const formattedExercises = response.data.map((item) => ({
          id: item[0],
          name: item[1],
          category: item[2],
        }));
        setExercises(formattedExercises);
      } catch (error) {
        console.log("Error retrieving exercises", error);
      }
    };

    // getDays();
    getAllExercises();
  }, []);

  const onSubmit = (data) => {
    console.log("form submitted!", data);
    console.log("selected exercises", selectedExercises);
    setSelectedExercises([...data]);
    console.log("selected exercises", selectedExercises);

    // const dayExercises = {};
    // for (const [key, value] of Object.entries(data)) {
    //   const day = key.split("")[0];
    //   if (!dayExercises[day]) {
    //     dayExercises[day] = [];
    //   }
    //   dayExercises[day].push(value);
    // }

    // console.log(data);
    // setSelectedExercises(dayExercises);
    // console.log("selected exercises: ", dayExercises);

    // submitExercises(dayExercises);
  };

  return (
    <div>
      <h1>This is your scheduled training</h1>

      <button onClick={logout}>Logout</button>

      {/* TODO Either move day component to a new file or insert here the name of the day as a variable somehow */}
      {/* <h2>Monday</h2> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>{days[0]}</h2>
          <select {...register(`${days[0]}_Exercise_One`)}>
            <option value="" disabled>
              Select an exercise
            </option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name} ({exercise.category})
              </option>
            ))}
          </select>

          <select {...register(`${days[0]}_Exercise_Two`)}>
            <option value="" disabled>
              Select an exercise
            </option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name} ({exercise.category})
              </option>
            ))}
          </select>

          <h2>{days[1]}</h2>
          <select {...register(`${days[1]}_Exercise_One`)}>
            <option value="" disabled>
              Select an exercise
            </option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name} ({exercise.category})
              </option>
            ))}
          </select>

          <select {...register(`${days[1]}_Exercise_Two`)}>
            <option value="" disabled>
              Select an exercise
            </option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name} ({exercise.category})
              </option>
            ))}
          </select>
        </div>
        <input type="submit" value="Set training" />
      </form>
      <div>
        <h2>Selected exercises</h2>
        {selectedExercises}
      </div>
      {/* 
      {Object.keys(selectedExercises).map((day) => (
        <div key={day}>
          <h3>{day}</h3>
          {selectedExercises[day].map((exerciseId, index) => {
            const exercise = exercises.find(
              (ex) => ex.id === parseInt(exerciseId)
            );
            return (
              <>
                <div>{day.name}</div>
                <div key={exerciseId}>
                  {exercise?.name} ({exercise?.category})
                </div>
              </>
            );
          })}
        </div>
      ))} */}

      {/* <ul>
        {selectedExercises.map((exerciseId, index) => {
          const exercise = exercises.find(
            (ex) => ex.id === parseInt(exerciseId)
          );
          return (
            <li key={index}>
              {exercise?.name} ({exercise?.category})
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default Schedule;

// {days.map((day) => (
//   <div key={day.id}>
//     <h2>{day.name}</h2>
//     <select {...register(`${day.name}_Exercise_One`)}>
//       <option value="" disabled>
//         Select an exercise
//       </option>
//       {exercises.map((exercise) => (
//         <option key={exercise.id} value={exercise.id}>
//           {exercise.name} ({exercise.category})
//         </option>
//       ))}
//     </select>

//     <select {...register(`${day.name}_Exercise_Two`)}>
//       <option value="" disabled>
//         Select an exercise
//       </option>
//       {exercises.map((exercise) => (
//         <option key={exercise.id} value={exercise.id}>
//           {exercise.name} ({exercise.category})
//         </option>
//       ))}
//     </select>
//   </div>
// ))}
// <input type="submit" value="Set training" />
// </form>

// {Object.keys(selectedExercises).map((day) => (
// <div key={day}>
//   <h3>{day}</h3>
//   <ul>
//     {selectedExercises[day].map((exerciseId, index) => {
//       const exercise = exercises.find(
//         (ex) => ex.id === parseInt(exerciseId)
//       );
//       return (
//         <li key={exerciseId}>
//           {exercise?.name} ({exercise?.category})
//         </li>
//       );
//     })}
//   </ul>
// </div>
// ))}
