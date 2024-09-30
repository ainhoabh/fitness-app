import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

// TODO Get all input into one day

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

  const onSubmit = (data) => {
    console.log(data);
    setSelectedExercises([
      ...selectedExercises,
      data.Exercise_One,
      data.Exercise_Two,
    ]);
  };

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
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

    getAllExercises();
  }, []);

  return (
    <div>
      <h1>This is your scheduled training</h1>

      <button onClick={logout}>Logout</button>

      <h2>Monday</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register("Exercise_One")}>
          <option value="" disabled>
            Select an exercise
          </option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name} ({exercise.category})
            </option>
          ))}
        </select>

        <select {...register("Exercise_Two")}>
          <option value="" disabled>
            Select an exercise
          </option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name} ({exercise.category})
            </option>
          ))}
        </select>

        <input type="submit" value="Set training" />
      </form>

      <ul>
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
      </ul>
    </div>
  );
};

export default Schedule;
