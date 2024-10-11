import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const TrainingData = () => {
  // en Schedule tengo una variable "traningData"; es un problema?
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const editTraining = (data) => {
    navigate("/edit", { state: { trainingData: data } });
  };

  const deleteTraining = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const response = await axios.delete(
        `http://localhost:5000/user/${username}/training_delete`
      );
      window.location.reload();
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

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

  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const sortedTrainingData = [...trainingData].sort((a, b) => {
    return dayOrder.indexOf(a[0]) - dayOrder.indexOf(b[0]);
  });

  if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Scheduled training</h2>

      {trainingData && trainingData.length > 0 ? (
        <div>
          <ul>
            {sortedTrainingData.map((data, index) => (
              <li key={index}>
                Day: {data[0]}, Exercise 1: {data[1]}, Exercise 2: {data[2]},
                Exercise 3: {data[3]}
              </li>
            ))}
          </ul>

          <button onClick={() => editTraining(trainingData)}>
            Edit training
          </button>

          <button onClick={() => deleteTraining()}>Delete training</button>
        </div>
      ) : (
        <div>
          <p>
            You don't have any training data available. You can create your
            training here:
          </p>

          <Link to={"/schedule"}>Create training</Link>
        </div>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default TrainingData;
