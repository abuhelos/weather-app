import React, {useState,useEffect,useContext} from "react"
import styled from "styled-components"
import {useParams} from "react-router-dom"
import {Context} from  "../Context"
import CurrentWeather from "../components/CurrentWeather"
import HourlyForecast from "../components/HourlyForecast"
import WeeklyForecast from "../components/WeeklyForecast"

const Container = styled.div`
    font-family: 'Anek Devanagari', sans-serif;
    font-weight: 400;
    background-color: #EFDDFD;
    padding: 20px;
    font-size: 1.2rem;
    margin-left: auto;
    margin-right: auto;
    max-width: 730px;

    @media (min-width: 730px) {
        border-radius: 25px;
        margin-top: 25px;
        margin-bottom: 25px;
      }
`

function WeatherDetail() {
    const {currentWeather,savedWeather} = useContext(Context)
    const [forecastWeather, setForecastWeather] = useState()
    let params = useParams()
    let arrUniq
    let weatherObj

     if(currentWeather) {
        let allWeather = [...savedWeather,currentWeather]
        weatherObj = allWeather.find(city => city.id == params.weatherId)
    }

        useEffect(()=> {
            if(weatherObj){
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherObj.coord.lat}&lon=${weatherObj.coord.lon}&exclude={part}&appid=bcb27486b135c1629b11bc6fb548e093`)
                    .then(res => res.json())
                    .then(data => setForecastWeather(data))
            }
        },[weatherObj])
    
    return (
        weatherObj && forecastWeather
        ? <div>
            <Container>
                <CurrentWeather
                    city={weatherObj.name}
                    country={weatherObj.sys.country}
                    temperature={weatherObj.main.temp}
                    feelsLike={weatherObj.main.feels_like}
                    description={weatherObj.weather[0].description}
                    time={weatherObj.dt}
                    wind={weatherObj.wind.speed}
                    windDirection={weatherObj.wind.deg}
                    visibility={weatherObj.visibility}
                    pressure={weatherObj.main.pressure}
                    icon={weatherObj.weather[0].icon}
                    lat = {weatherObj.coord.lat}
                    lon = {weatherObj.coord.lon}
                />
            </Container>
            <Container>
                <HourlyForecast
                forecast = {forecastWeather}/>
            </Container> 
            <Container>
                <WeeklyForecast
                forecast = {forecastWeather}
                />
            </Container>
        </div>
        : <Container>...Loading</Container>
    )
}

export default WeatherDetail
//params.weatherId
        //arrUniq = [...new Map(allWeather.map(v => [v.name, v])).values()]
        //`${city.name}+${city.coord.lat}+${city.coord.lon}`