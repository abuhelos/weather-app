import React from "react";
import styled from "styled-components";
import 'remixicon/fonts/remixicon.css'
import {Loader} from "@googlemaps/js-api-loader"

const Container = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: 730px) {
        flex-direction: row;
        justify-content: space-around;
      }
`
const Title = styled.div`
      text-align: center;
    @media (max-width: 730px) {
        font-size: 25px;
    }
`

const Logo = styled.img`
`
const TemperatureContainer = styled.div`
    display: flex;
    justify-content: center;
`
const Temperature = styled.h2`
    font-size: 2.5rem;
    align-self: center;
`
const MapContainer = styled.div`
      width: 100%;
      height: 300px;
      border-radius: 30px;
        outline: 1px solid rgb(54, 6, 91);

    @media (min-width: 730px) {
        height: 300px;
        width: 400px;
        border-radius: 30px;
        outline: 1px solid rgb(54, 6, 91);
      }
`
const WeatherDescription = styled.div`
      text-align: center;
`

function CurrentWeather(props) {

    const loader = new Loader({
        apiKey: "AIzaSyCXH213_hxwD7itNEADxxVx9MWDOPIW0Ag",
        version: "weekly",
      });
      
      loader.load().then(() => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
            disableDefaultUI: true,
          center: { lat: props.lat, lng: props.lon },
          zoom: 12,
          zoomControl: true
        });
      });

    function temperatureConverter(temp) {
        const far = (temp-273.15)*1.8000 + 32;
        const rounded = Math.round(far)
        return rounded;
    }

    function timeConverter(time) {
        let unix_timestamp = time
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();

        if (hours > 12){
            hours = hours - 12;
            time='PM'
        }
        else if(hours == 12){
            time='PM'
        } else time='AM'

        var formattedTime = hours + ':' + minutes.substr(-2) + ' ' + time;
        return formattedTime;
    }

    return(
        <Container>
            <div>
                <Title>
                    <h3>{props.city}, {props.country}</h3>
                    <h3>Last Update: {timeConverter(props.time)}</h3>
                </Title>
                <TemperatureContainer>
                    <Logo src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} width="100px"/>
                    <Temperature>{temperatureConverter(props.temperature)} ˚ F</Temperature>
                </TemperatureContainer>
                <WeatherDescription>
                    <p><strong>Feels like {temperatureConverter(props.feelsLike)}˚ F , {props.description}. </strong></p>
                    <p>Wind: {props.wind} m/s SE</p>
                    <p>Visibility: {props.visibility/1000} km</p>
                    <p>Pressure: {props.pressure} hPa</p>
                </WeatherDescription>
            </div>

            <MapContainer id="map"/>
        </Container>
    )
}

export default CurrentWeather