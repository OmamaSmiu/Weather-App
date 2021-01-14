import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';

const cities = require("./cities.json")
console.log(cities);

function App() {
  const [weatherData, setweatherData] = React.useState([])
  const [cityName, setcityName] = React.useState("karachi");

  function getWeather() {
    const city = document.getElementById("cityName").value;
    setcityName(city)
    setweatherData({});
  }

  React.useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=429736441cf3572838aa10530929f7cd&units=metric`)
      .then(res => {
        const newPosts = res.data
        setweatherData(newPosts);
      });
  }, [cityName]);
  console.log(weatherData)
  return (
    <div>
      <h1 className="display-1">Weather App</h1>
      <input type="text" id="cityName" placeholder="Enter city name" />
      <button onClick={getWeather} className=" btn" > Get Weather </button>
      <br/>
      <br/>
      {(weatherData.main && weatherData.main.temp) ?

        <div className="card ">
          <div className="card-body">
            <h5 className="card-title">Temp: {weatherData.main.temp}</h5>
            <h5 className="card-subtitle mb-2">H: {weatherData.main.temp_min} / L: {weatherData.main.temp_max} </h5>
            <h5 className="card-text">Humidity: {weatherData.main.humidity}</h5>
            <h2 className="card-title">{weatherData.name}</h2>
          </div>
        </div>
        :
        <h1 className="data">Loading...</h1>
      }
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);