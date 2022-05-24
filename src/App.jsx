import React from 'react'
import styled from "styled-components"
import {Routes, Route, Link} from "react-router-dom"
import Home from "../src/pages/Home"
import WeatherDetail from "./pages/WeatherDetail"
import GitHubLogo from "../src/images/GitHub-Mark-64px.png"
import LinkedInLogo from "../src/images/linkedin-svgrepo-com.svg"

const Header = styled.header`
  background-color: #770DC8;
  padding: 20px;
  display: flex;
`
const HeaderTitle = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  color: #770DC8;
`
const Footer = styled.footer`
  display: flex;
  background-color: #770DC8;
  height: 100px;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  padding: 20px;

  &:visited {
    color: white;
  }
`
const FooterText = styled.p`
  font-weight: bold;
  margin-bottom: 12px;
`
const Icon = styled.img`
  margin-left: 15px;
`

function App() {

  return (
    <div>
      <Header>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <HeaderTitle>WeatherApp</HeaderTitle>
          </Link>
        </Header>

      <Routes>
          <Route index element={<Home />}/>
          <Route exact path=":weatherId" element={<WeatherDetail/>}/>
        <Route
          path="*"
          element={
            <main style={{ color: "white" ,padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      <Footer>
        <FooterText>Made By: Andrew Buhelos</FooterText>
        <div>
          <a href='https://github.com/abuhelos'>
            <Icon src={GitHubLogo} width="32px"/>
            </a>
          <a href='https://www.linkedin.com/in/andrew-buhelos-2022/'>
            <Icon src={LinkedInLogo} width="32px"/>
            </a>
        </div>
      </Footer>
    </div>
  )
}

export default App