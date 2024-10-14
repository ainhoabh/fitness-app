import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";

import DaySchedule from "../days/daySchedule";

const Schedule = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const goToTraining = () => {
    navigate("/training");
  };

  const methods = useForm();

  const [days, setDays] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    const getAllData = async () => {
      try {
        const exResponse = await axios.get("http://localhost:5000/exercises");
        const exList = exResponse.data.map((exArray) => exArray[0]);
        setExercises(exList);
        console.log("exercises:", exList);

        const daysResponse = await axios.get("http://localhost:5000/days");
        const daysList = daysResponse.data.map((dayArray) => dayArray[0]);
        setDays(daysList);
        console.log("days:", daysList);
      } catch (error) {
        console.error("Error retrieving the data from the API: ", error);
      }
    };

    getAllData();
  }, []);

  const onSubmit = async (formData) => {
    console.log("form submitted!", formData);
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
          await axios.post("http://localhost:5000/training", data);
        })
      );
      console.log("All requests completed", data);
      goToTraining();
    } catch (error) {
      console.error("Error posting request", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <h2>Schedule your training here</h2>

      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {days.map((day, index) => (
          <DaySchedule key={index} day={day} exercises={exercises} />
        ))}

        <input type="submit" value="Set training" />
      </form>

      <button onClick={logout}>Logout</button>
    </FormProvider>
  );
};

export default Schedule;
