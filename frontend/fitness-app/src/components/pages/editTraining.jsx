// TODO deployment
// TODO nice to have: añadir imágenes de los ejercicios

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";

import DaySchedule from "../days/daySchedule";

const EditTraining = () => {
  const location = useLocation();
  const { trainingData: initialTrainingData } = location.state || {};

  const methods = useForm();
  const { reset } = methods;

  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const goToTraining = () => {
    navigate("/training");
  };

  const [days, setDays] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    const getAllData = async () => {
      try {
        const exResponse = await axios.get("http://localhost:5000/exercises");
        const exList = exResponse.data.map((exArray) => exArray[0]);
        setExercises(exList);

        const daysResponse = await axios.get("http://localhost:5000/days");
        const daysList = daysResponse.data.map((dayArray) => dayArray[0]);
        setDays(daysList);

        if (initialTrainingData) {
          const formattedData = {};
          initialTrainingData.forEach((trainingArray) => {
            const [
              day,
              training_exercise1,
              training_exercise2,
              training_exercise3,
            ] = trainingArray;

            formattedData[`exercise1_${day}`] = training_exercise1;
            formattedData[`exercise2_${day}`] = training_exercise2;
            formattedData[`exercise3_${day}`] = training_exercise3;
          });

          methods.reset(formattedData);
        }
      } catch (error) {
        console.error("Error retrieving the data from the API: ", error);
      }
    };

    getAllData();
  }, [initialTrainingData, reset]);

  const onSubmit = async (formData) => {
    setData(JSON.stringify(formData, null, 2));

    const username = sessionStorage.getItem("username");
    const trainingData = days.map((day) => ({
      day,
      user: username,
      exercise1: formData[`exercise1_${day}`],
      exercise2: formData[`exercise2_${day}`],
      exercise3: formData[`exercise3_${day}`],
    }));

    try {
      await Promise.all(
        trainingData.map(async (data) => {
          await axios.put(
            `http://localhost:5000/user/${username}/training`,
            data
          );
          goToTraining();
        })
      );
    } catch (error) {
      console.error("Error updating training", error);
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <h1>Edit routine</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {days.map((day, index) => (
            <DaySchedule key={index} day={day} exercises={exercises} />
          ))}

          <input type="submit" value="Set training" />
        </form>
      </FormProvider>

      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default EditTraining;
