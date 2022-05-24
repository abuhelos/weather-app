import React, {useContext} from "react"
import styled from "styled-components"
import {Context} from  "../Context"
import Preview from "../components/Preview"
import { nanoid } from 'nanoid'

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
const CodesContainer = styled.div`
    display: flex;
    justify-content: center;
`
const Code = styled.div`
    margin: 1rem;
    padding: .75rem;
    border-radius: 1rem;
    font-weight: bold;
    background: linear-gradient(to left, #A949F3, #770DC8);
`
const Search = styled.div`
    display: flex;
    flex-direction: column;
`
const SearchBar = styled.input`
    border-radius: 5px;
    margin-bottom: 1rem;
    margin-left: auto; 
    margin-right: auto;
    width: 60%;
    font-family: inherit;
    text-align: inherit;
    padding: .25em;
    border: 1px solid #404040;
    transform: scale(1);
    transition: transform 250ms;
`
const SearchButton = styled.button`
    display: inline-block;
    padding: 1em 1.5em;
    font-size: 0.625rem;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
    border: 0;
    cursor: pointer;

    width: 50%;
    background-image: linear-gradient(to left, #770DC8, #6A359C);
    color: white;
    transform: scale(1);
    transition: transform 250ms;
    margin-left: auto;
    margin-right: auto;

    &:hover {
        transform: scale(1.02);
      }
`

function Home() {
    const {currentWeather,savedWeather,addWeather,searchContent,setSearchContent} = useContext(Context)

    function handleChange(event) {
        const {name,value} = event.target
        setSearchContent(prevContent => {
            return {
                ...prevContent,
                [name]: value
            }
        })
    }

    function handleSubmit() {
        addWeather(searchContent.city,searchContent.state,searchContent.country)
        document.querySelectorAll('input').forEach(
            input => (input.value = "")
        )
        setSearchContent(prevContent => {
            return {
                ...prevContent,
                city: "",
                state: "",
                country: ""
            }
        })
    }

    const previewComponents = savedWeather.map(city => (
            <Preview
                key = {nanoid()}
                id = {city.id}
                currentWeather = {false}
                location = {city.name ? city.name : "Loading"}
                weather = {city.weather[0].main}
                logo = {city.weather[0].icon}
                temperature = {city.main.temp}
                lon = {city.coord.lon}
                lat = {city.coord.lat}/>
        ))

    return (
        <Container>
            <CodesContainer>
                <Code><a style={{ color: '#FEFDFF', textDecoration: 'none' }} href="https://en.wikipedia.org/wiki/List_of_U.S._state_and_territory_abbreviations">US State Codes</a></Code>
                <Code><a style={{ color: '#FEFDFF', textDecoration: 'none' }} href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes#Current_ISO_3166_country_codes">Country Codes</a></Code>
            </CodesContainer>
            <Search>
                <SearchBar
                    name="city"
                    type="text"
                    placeholder="Search City (Ex: Chicago)"
                    value={searchContent.city}
                    onChange={handleChange}
                />
                <SearchBar
                    name="state"
                    type="text"
                    placeholder="Enter State Code (Ex: AL | *Only for US* )"
                    value={searchContent.state}
                    onChange={handleChange}
                />
                <SearchBar
                    name="country"
                    type="text"
                    placeholder="Enter Country Code (Ex: US)"
                    value={searchContent.country}
                    onChange={handleChange}
                />
                <SearchButton onClick={handleSubmit}>Search</SearchButton>
            </Search>
            <Preview
                id={currentWeather && currentWeather.id}
                currentWeather = {currentWeather && currentWeather}
                location = {currentWeather ? currentWeather.name : "Loading..."}
                weather = {currentWeather && currentWeather.weather[0].main}
                logo = {currentWeather && currentWeather.weather[0].icon}
                temperature = {currentWeather && currentWeather.main.temp}
            />
            {previewComponents}
        </Container>
    )
}

export default Home
// `${currentWeather.name}+${currentWeather.coord.lat}+${currentWeather.coord.lon}`
//`${city.name}+${city.coord.lat}+${city.coord.lon}`