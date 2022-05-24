import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: solid 2px black;
    margin-left: 5%;
    margin-right: 5%;
`
const Date = styled.p`

`
const TemperatureContainer = styled.div`
    display: flex;
    align-items: center;
`
const Icon = styled.img`
`
const Temperature = styled.p`
`
const Description = styled.p`
`

function WeeklyFBar(props) {
    return(
        <Container>
            <Date>{props.date}</Date>
            <TemperatureContainer>
                <Icon src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} 
                width="70px"
                />
                <Temperature>{props.low}˚ F/{props.high}˚ F</Temperature>
            </TemperatureContainer>
            <Description>{props.description}</Description>
        </Container>
    )
}

export default WeeklyFBar