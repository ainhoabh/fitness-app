import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning, faSpinner } from "@fortawesome/free-solid-svg-icons";

const TrainingData = () => {
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

  const goToCreateTraining = () => {
    navigate("/schedule");
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

  if (loading)
    return (
      <div>
        Loading <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    );

  return (
    <div className="training-wrapper">
      <h1>Scheduled training</h1>
      {trainingData && trainingData.length > 0 ? (
        <div className="weekly-training-wrapper">
          <ul className="fa-ul">
            {sortedTrainingData.map((data, index) => (
              <li key={index}>
                <div className="day-name-wrapper">
                  <h3>
                    <FontAwesomeIcon
                      icon={faPersonRunning}
                      className="icon-running"
                    />
                    {data[0]}
                  </h3>
                </div>
                <div className="exercises-wrapper">
                  <div className="exercise">{data[1]}</div>
                  <div className="exercise">{data[2]}</div>
                  <div className="exercise">{data[3]}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="button-wrapper">
            <button onClick={() => editTraining(trainingData)}>
              Edit training
            </button>

            <button onClick={() => deleteTraining()}>Delete training</button>
          </div>
        </div>
      ) : (
        <div>
          <p>You don't have any training data available.</p>
          <button onClick={goToCreateTraining}>Create training</button>
        </div>
      )}
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default TrainingData;
