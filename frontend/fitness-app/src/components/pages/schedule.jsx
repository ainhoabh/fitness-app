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
        console.log("exercises:", exercises);

        const daysResponse = await axios.get("http://localhost:5000/days");
        const daysList = daysResponse.data.map((dayArray) => dayArray[0]);
        setDays(daysList);
        console.log("days:", days);
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
    } catch (error) {
      console.error("Error posting request", error);
    }

    // const postData = () => {
    //   axios
    //     .post("http://localhost:5000/training", {
    //       day: "Monday",
    //       user: username,
    //       exercise1: "Squat",
    //       exercise2: "Push-up",
    //       exercise3: "Chin-up",
    //     })
    //     .then((response) => {
    //       console.log("response: ", response);
    //     });
    // };
    // postData();
  };

  return (
    <FormProvider {...methods}>
      <h1>This is your scheduled training</h1>

      <button onClick={logout}>Logout</button>

      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {days.map((day, index) => (
          <DaySchedule key={index} day={day} exercises={exercises} />
        ))}

        <input type="submit" value="Set training" />
      </form>
      <pre>{data}</pre>
    </FormProvider>
  );
};

export default Schedule;
