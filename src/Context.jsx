import React, {useState, useEffect} from "react";

const Context = React.createContext()

function ContextProvider({children}) {
    const [currentWeather, setCurrentWeather] = useState()
    const [searchContent, setSearchContent] = useState({
        city: "",
        state: "",
        country: ""
    })
    const [savedWeather, setSavedWeather] = useState([])
    const [savedLocation, setSavedLocation] = useState(
        ()=> JSON.parse(localStorage.getItem("location")) || []
    )

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(success)
        if (savedLocation.length > 0){
            savedLocation.map(location => {
                const getData = async () => {
                const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=bcb27486b135c1629b11bc6fb548e093`)
                const weatherData = await weatherRes.json()
                if(weatherData.cod === "404") {
                  return window.alert(`${searchContent.city} was not found`)
              }
                  else setSavedWeather(prevArray => [...prevArray,weatherData])
            }
                getData()
                    .catch(console.error)
            })
        }
      }, [])

    useEffect(()=> {
        setSavedWeather(prevWeather => getUniqueArray(prevWeather,['id']))
    },[savedWeather.length])  

      useEffect(()=> {
          setSavedLocation(prevLocation => getUniqueArray(prevLocation,['lat','lon']))
          localStorage.clear();
          localStorage.setItem("location", JSON.stringify(savedLocation))
      },[savedLocation.length])

      function getUniqueArray(arr, keyProps) {
        return Object.values(
          arr.reduce((uniqueMap, entry) => {
            const key = keyProps.map((k) => entry[k]).join('|')
            if (!(key in uniqueMap)) uniqueMap[key] = entry
            return uniqueMap
          }, {}),
        )
      }

      function success(pos) {
          var crd = pos.coords;
          let latitude = crd.latitude
          let longitude = crd.longitude 
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=bcb27486b135c1629b11bc6fb548e093`)
                .then(response => response.json())
                .then(data => setCurrentWeather(data))
      }

      async function addWeather(city,state,country) {
          const fetchData = async () => {
              const cityRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=bcb27486b135c1629b11bc6fb548e093`)
              const cityData = await cityRes.json()
              const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=bcb27486b135c1629b11bc6fb548e093`)
              const weatherData = await weatherRes.json()
              if(weatherData.cod === "404") {
                return window.alert(`${city} was not found`)
            }
                else {
                    setSavedWeather(prevArray => [...prevArray,weatherData])
                    setSavedLocation(prevState => {
                        return [...prevState,{
                            lat: cityData[0].lat,
                            lon: cityData[0].lon
                        }]
                    })}
        }
        fetchData()
            .catch((error) => {
                console.log(error)
                window.alert(`${city} was not found`)
            })
      }

      function removeWeather(lat,lon) {
          setSavedWeather(prevSaved => prevSaved.filter(item =>Math.round(100*item.coord.lat)/100 !== Math.round(100*lat)/100 || Math.round(100*item.coord.lon)/100 !== Math.round(100*lon)/100))
          setSavedLocation(prevSaved => prevSaved.filter(item =>Math.round(100*item.lat)/100 !== Math.round(100*lat)/100 || Math.round(100*item.lon)/100 !== Math.round(100*lon)/100))
      }

      return (
          <Context.Provider value={{currentWeather,
          savedWeather, setSavedWeather,
          addWeather,removeWeather, 
          searchContent, setSearchContent, 
          savedLocation,setSavedLocation}}
          >
              {children}
          </Context.Provider>
      )
}

export {ContextProvider, Context}
// (item => item.name !== name))