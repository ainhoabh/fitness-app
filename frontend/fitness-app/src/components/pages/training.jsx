import React, { useEffect, useState } from "react";
import axios from "axios";

const TrainingData = () => {
  // en Schedule tengo una variable "traningData"; es un problema?
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        // En Schedule tengo la misma línea de código, con misma variable. Es un problema?
        const username = sessionStorage.getItem("username");
        const response = await axios.get(
          `http://localhost:5000/user/${username}/training`
        );
        console.log("training data: ", response.data);
        setTrainingData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingData();
  }, []);

  if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Scheduled training</h2>
      <ul>
        {trainingData.map((data, index) => (
          <li key={index}>
            Day: {data[0]}, Exercise 1: {data[1]}, Exercise 2:{data[2]},
            Exercise 3: {data[3]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainingData;
