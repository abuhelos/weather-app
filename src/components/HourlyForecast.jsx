import React from 'react';
import styled from 'styled-components';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Container = styled.div`
    width: 100%;
    height: auto;
    justify-content: center;
`
const Title = styled.h2`
    margin-bottom: 10px;
    `

function HourlyForecast(props) {
    const data = props.forecast.hourly;
    const convertedData = data.map(hour => {
        return {
            ...hour,
            dt: timeConverter(hour.dt),
            temp: temperatureConverter(hour.temp)
        }
    })
    const hourly = convertedData.slice(0,24)


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
        } else if(hours ==12){
            time='PM'
        }
        else time='AM'

        var formattedTime = hours + ':' + minutes.substr(-2) + ' ' + time;
        return formattedTime;
    }

    return (
        <Container>
            <Title>Hourly Forecast</Title>
            <ResponsiveContainer width={'90%'} aspect={2}>
            <LineChart
            data={hourly}
            margin={{
                top: 0,
                right: 10,
                left: 0,
                bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dt" />
            <YAxis/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
      </Container>
    );
  }
export default HourlyForecast;