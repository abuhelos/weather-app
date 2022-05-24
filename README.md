# Weather

This app displays the weather of the current, hourly forecast, and weekly forecast from around the world provided by the [OpenWeather API](https://openweathermap.org/). This app contains the following:

- Dependencies
  - Recharts
  - Styled-Components
  - React-Router
  - NanoID
- Hooks
  - UseState
  - UseEffect
  - UseContext
  - UseParams
- Highlights
  - API Calls to OpenWeatherDatabase and Google Maps API
  - Home Page displays current weather of current location and previous locations searched
  - Clicking on the weather preview links to more detailed forecast page
  - Hourly weather forecast graphed with recharts
  - Weekly forecast displayed at the bottom of the page
  - Local Storage was used to save location data and retrieve it

## Solution Summary

Two pages (Home.jsx and WeatherDetail.jsx), five components (CurrentWeather.jsx,HourlyForecast.jsx,Preview.jsx,WeeklyFBar.jsx,WeeklyForecast.jsx), as well as a Context file were created to structure the project as clearly as possible. The functionality of each file will be explained below:

### General

Context:

- Purpose of this file was to create state and make initial API calls that will be passed to several child components of different hierarchys. Creating context was easier than having to manually pass props down thorugh several components.
- State: currentWeather, searchContent, savedWeather, and savedLocation
  - currentWeather: Contains current weather data from the Open Weather DB from the users current location
  - searchContent: Contains the information typed into the search bar which is used in the API url link to fetch the correct weather data. This object clears after each search
  - savedWeather: Contains the current weather data of any location that the user had previously searched. New searches are automatically added to the savedWeather array
  - savedLocation: Saves the latitude and longitude coordinates of each location searched. If there are locations saved in local storage they will be added to this array on render
  - useEffect(savedLocation): Every time the value of savedLocation changes, the savedLocation array will be added to local storage
- Functions
  - addWeather: Uses the information typed into the search bar to fetch the weather of the desired location. The data retrieved will be added to the savedWeather array and the latitude and longitude will be saved in savedLocation
  - removeWeather: Removes the desired location from the savedWeather and savedLocation state so that it will no longer be rendered as a preview component

App.jsx and main.jsx:

- The main file renders the app to the DOM. The context provider and react router are set up as the parent elements of the app components in this file.
- The App file contains the paths of React Router and the layout of the page. The header and footer are constants within the webpage while the middle part of the website varies depending on where the user is routed to on the website. The initial page is the home page which displays the weather preview components at the current and saved locations. If one of the preview components are clicked on they will route the user to a more detailed page of that city's weather

### Pages

Home.jsx:

- Functions
  - handleChange: Updates the state of the search content every time the contents of the search bar are updated
  - handleSubmit: Calls the addWeather function from context (explained above) and clears the contents of the search bar
- Rendering
  - 3 sections within container
    - Links to codes
    - Search Bar Form
    - Preview Components (Current Location and Saved)
      - Renders a preview component with props of current location information sent through
      - The previewComponents variable maps through the weather data from the savedWeather state array and passes props of relevant values through the Preview component

WeatherDetail.jsx:

- Purpose of the if statement is because weather detail would have a bug if refreshed on the detail page instead of the home page. This is because the current location and saved location would have to be fetched again meaning lines of code ran inside the if statement were returning an error since the current weather did not have a value on initial render.
- The forecast of the intended city is retrieved from the Open Weather DB once the intial weather is fetched. The useParams hook was used to accomplish this since it matches the city name with its corresponding coordinates in the allWeather array.
- Rendering (Conditionally renders ...Loading if the data has not been received yet or the forecast components if the data has been received)
  - CurrentWeather: Contains more details about the current weather and a google map of the location
  - HourlyForecast: Contains a graph of the temperature and humidity for the next 24 hours
  - WeeklyForecast: Displays the high and low temperatures of each day for the upcoming week

### Components

CurrentWeather.jsx:

- Functions
  - temperatureConverter: Converts temperature from Kelvin to Farenheit
  - timeConverter: Converts time from unix to a Date object, determines whether it is AM or PM and returns the time
- Rendering
  - Uses all of the props passed from the parent to display the name, country, temperature, description, etc.
  - MapContainer renders a map from the Google Maps API centered at a given latitude, longitude, and zoom magnitude.

HourlyForecast.jsx:

- Functions
  - temperatureConverter: Converts temperature from Kelvin to Farenheit
  - timeConverter: Converts unix time into the time of day
- convertedData constant converts the time and temperature components from the array provided by the parent using the above functions
- Rendering
  - Used Recharts (see references) to create a line chart to visualize the hourly temperature and humidty forecast. It features a responsive container, tooltip animation, and a legend.

Preview.jsx:

- Uses the props given by the parent to render a preview of the current weather of the intended location.
- Has a temperatureConverter function to convert Kelvin to Farenheit and a trashIcon that when clicked will remove the component from the saved weather array.

WeeklyForecast.jsx:

- Functions
  - temperatureConverter: Converts Kelvin to Farenheit
  - timeConverter: Converts unix time to day of week, month, and day of month
  - truncate: Truncates a string down to the specified number of words. Only the first three values of the date string were needed to this was used in the timeConverter function to get the day of week, month, and day of month
- Renders forecastElements which maps through each day of the weeklyForecast and sends its values into the WeeklyFBar component which orgainzes the content into a three column display

WeeklyFBar.jsx:

- Used to style the props passed from the Weekly Forecast component into a date column, max and min temperature column, and a weather description column of the forecast for each day of the coming week.

## Difficulties

### Recharts Issues

There is a bug with the Recharts responsive container feature for React >18 that has not been fixed yet. In order to solve this problem I set up the main.jsx file like React 17 document and used ReactDOM.render instead of createRoot. See [here](https://github.com/recharts/recharts/issues/2831) for the issues thread on the recharts repo.

### Saved Weather Array

- Duplicate savedWeather Components
  - I did not want to allow the user to put duplicate cities in the home page so I created a useEffect in context that checked the savedWeather array ever time a weather object was added and check if there were any duplicate names with a reduce function. If there were duplicates that item would be deleted from the array.

### Bad API Requests

- If the user entered bad information into the search bar, the api request would return a 404 error. I wrote a catch statenebt that would alert the user that the name they entered was not valid and would clear the search bar state

### Locations with the same name

- If there are two locations with the same name, they have the same url params. For example, if I had Springfield, IL and Springfield, MA components clicking on either preview component would render the WeatherDetail page of Springfield only. I solved this by using the id property of the weather component instead of the name as the url param.

## Future Improvements

### Displaying the News from Each City

- A nice feature to add to the weather detail page would be to include some sort of information about the specific location or news updates. I would need to find a different API or related resource that would find information related to the area.

### Repeating code for temperatureConverter

- There are several instances where I use the temperatureConverter function. It would be more concise to put this code in my Context file and pass it to all of the files wehre I use this function. This function can also be improvded by converting to Celsius as well. There could be a boolean state that toggles whether the function would return Farenheit or Celsius

## References

- [Recharts](https://recharts.org/en-US/)
- [Styled-Components](https://styled-components.com/)
- [React-Router](https://reactrouterdotcom.fly.dev/docs/en/v6)
- [NanoID](https://www.npmjs.com/package/nanoid)
- [OpenWeather](https://openweathermap.org/)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/overview)
