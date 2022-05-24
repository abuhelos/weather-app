import React from "react";
import WeeklyFBar from "../components/WeeklyFBar"

function WeeklyForecast(props) {
    const data = props.forecast.daily
    const weekly = data.map(day => {
        return {
            ...day,
            dt: timeConverter(day.dt),
            temp: {
                ...day.temp,
                min: temperatureConverter(day.temp.min),
                max: temperatureConverter(day.temp.max)
            }
        }
    })
    function temperatureConverter(temp) {
        const far = (temp-273.15)*1.8000 + 32;
        const rounded = Math.round(far)
        return rounded;
    }

    function timeConverter(time) {
        let date = new Date(time*1000);
        date = date.toString()
        date = truncate(date,3)
        let formattedDate = date.slice(0,3)+"," + date.slice(3,date.length)
        return formattedDate;
    }

    function truncate(str, no_words) {
        return str.split(" ").splice(0,no_words).join(" ");
    }

    const forecastElements = weekly.map(day => (
        <WeeklyFBar
            key={day.dt}
            date = {day.dt}
            icon = {day.weather[0].icon}
            low = {day.temp.min}
            high = {day.temp.max}
            description = {day.weather[0].description}
        />
    ))

    return(
        <div>
            <h2>Weekly Forecast</h2>
            {forecastElements}
        </div>
    )
}

export default WeeklyForecast