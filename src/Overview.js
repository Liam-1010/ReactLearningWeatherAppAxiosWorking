import "./styles.css";
import React, { useState } from "react";
import axios from "axios";

export default function Overview() {
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [city, setCity] = useState(null);
  let [icon, setIcon] = useState(null);

  var moment = require("moment"); // require
  var currentDate = moment().format("MMMM Do YYYY, h:mm:ss");

  function inputHandler(e) {
    e.preventDefault();
    setCity(e.target.value);
  }

  function showTemperature(response) {
    setTemperature(response.data.main.temp);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setDescription(response.data.weather[0].description);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function searchHandler(e) {
    e.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a94f3778290bfeee61278505dbbe51d&units=metric`;
    axios.get(url).then(showTemperature);
  }

  let weatherJSX = (
    <div className="row">
      <div className="col-6">
        <div className="d-flex weather-temperature">
          <img src={icon} alt={description} />
          <strong>{Math.round(temperature)}</strong>
          <span className="units">
            <a href="#" className="active">
              °C
            </a>{" "}
            |<a href="#">°F</a>
          </span>
        </div>
      </div>
      <div className="col-6" id="stats">
        <ul>
          <li>
            Humidity:
            <span id="humidity"> {humidity} </span>%
          </li>
          <li>
            Wind:
            <span id="wind"> {wind} </span>
            kmph
          </li>

          <li id="description">
            <strong>{description}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
  let searchForm = (
    <form id="search-form" className="mb-4" onSubmit={searchHandler}>
      <div className="row">
        <div className="col-8">
          <input
            type="search"
            placeholder="Type a city"
            className="form-control"
            id="city-input"
            onChange={inputHandler}
          />
        </div>
        <div className="col-2">
          <input
            type="submit"
            value="Search"
            className="form-control btn btn-primary shadow-sm"
          />
        </div>
      </div>
    </form>
  );

  if (temperature) {
    return (
      <div className="overview">
        {searchForm}
        <ul>
          <li>
            Last updated : <span id="date">{currentDate}</span>
          </li>
        </ul>
        {weatherJSX}
      </div>
    );
  } else {
    return <div className="overview">{searchForm}</div>;
  }
}
