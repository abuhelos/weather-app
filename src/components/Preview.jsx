import React, {useState, useContext} from "react";
import styled from "styled-components";
import {Context} from  "../Context"
import 'remixicon/fonts/remixicon.css'
import {Link} from "react-router-dom"

const Container = styled.div`
    display: grid;
    grid-template: auto / 1em auto;
    grid-gap: 10px;
`

const WeatherContainer = styled.div`
    grid-column: 2; 
    font-family: 'Anek Devanagari', sans-serif;
    font-weight: 400;
    color: #fff;
    background-color: #6151C3;
    display: grid;
    grid-template: 0px 45px 70px auto auto 1em / 1em auto auto 1em;
    border-radius: 35px;
    margin-top: 20px;
    transform: scale(1);
    transition: transform 250ms;
    
    &:hover {
        transform: scale(1.02);
      }
`
const LocationTitle = styled.h3`
    font-weight: 400;
    font-size: 18px;
    grid-column: 2/3;
    grid-row: 2/3;
    align-self: end;
`
const Location = styled.h2`
    font-weight: 500;
    grid-column: 2/3;
    grid-row: 3/4;
    justify-self: start;
    margin: 0;
`
const Weather = styled.h3`
    font-weight: 400;
    font-size: 18px;
    grid-column: 2/3;
    grid-row: 4;
    margin: 0;
    justify-self: start;
`
const Logo = styled.img`
    grid-column: 3;
    grid-row: 2;
    justify-self: end;
    margin: 0;
`
const Temperature = styled.h3`
    font-weight: 400;
    font-size: 18px;
    grid-column: 3;
    grid-row: 4/5;
    margin: 0;
    justify-self: end;
`

const Trash = styled.i`
    grid-column: 1;
    align-self: center;
    &:hover{
        cursor: pointer;
    }
`

function Preview(props) {
    const [hovered,setHovered] = useState(false)
    const {removeWeather} = useContext(Context)

    function temperatureConverter(temp) {
        const far = (temp-273.15)*1.8000 + 32;
        const rounded = Math.round(far)
        return rounded;
    }

    const trashIcon = hovered ? "ri-delete-bin-fill" : "ri-delete-bin-line"

    return(
        <Container>
            {!props.currentWeather ? <Trash 
                className= {trashIcon}
                width="12px"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={()=> removeWeather(props.lat,props.lon)}
            /> : <div/>} 
        <Link to={`${props.id}`} style={{ textDecoration: "none" }}>
            <WeatherContainer>
                <LocationTitle>{props.currentWeather && "Current Location"}</LocationTitle>
                <Location>{props.location}</Location>
                <Weather>{props.weather}</Weather>
                <Logo src={`http://openweathermap.org/img/wn/${props.logo}@2x.png`} width="125px"/>
                <Temperature>{`${temperatureConverter(props.temperature)}˚ F`}</Temperature>
            </WeatherContainer>
        </Link>
        </Container>
    )
}

export default Preview