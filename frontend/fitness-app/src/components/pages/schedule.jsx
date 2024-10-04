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

  const onSubmit = (formData) => {
    console.log("form submitted!", formData);
    setData(JSON.stringify(formData, null, 2));
    console.log(data);

    // TODO create the submission request to the server
    // TODO prepare the data from "data" to be submitted
    // TODO Modify "training" table to include more than one exercise per day
    // TODO Change values inside the "training" table so that it has names, not IDs
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
