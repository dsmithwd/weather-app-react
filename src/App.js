import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = { weather: {} };

  /*this gets me the data*/

  async componentDidMount() {
    const success = async ({ coords }) => {
      console.log(coords);
      const { latitude, longitude } = coords;

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=40&appid=17a3e02a9cc47ed1eac90bc2f9c0012a`
      );

      this.setState({ weather: data });
    };

    const error = () => {};

    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    console.log(this.state);

    const { list } = this.state.weather;

    if (!list) {
      return <h1>Loading...</h1>;
    }

    return (
      <>
        {list.map((item) => {
          return (
            <div>
              <div className="the-date">
                {new Date(item.dt * 1000).toLocaleString()}
                <img
                  className="icons"
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                ></img>
                <div className="the-temp">
                  {Math.round(item.main.temp - 273.15)}&#8451;
                </div>
                <div className="the-desc">{item.weather[0].description}</div>
                <div className="the-wind">
                  wind: {Math.round(item.wind.speed)}mph
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

// {list.map((item)) => {
//   return (
// <div className="forecastData">
//   <div className="the-date">${new Date(item.dt * 1000).toLocaleString()}</div>
//   <img className="icons" src="http://openweathermap.org/img/wn/${
//     item.weather[0].icon
//   }.png" alt="${item.weather[0].main}">
//   <div className ="the-temp">${Math.round(item.main.temp - 273.15)}&#8451;</div>
//   <div className="the-desc">${item.weather[0].description}</div>
//   <div className="the-wind">wind: ${Math.round(item.wind.speed)}mph</div>
// </div> );

export default App;
