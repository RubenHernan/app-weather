
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loading from './Components/Loading'
import WeatherCard from './Components/WeatherCard'
import backgrounds from './data/backgrounds.json'
import countries from './data/countries.json'

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [background, setBackground] = useState();
  const backgroundStyle = {
    backgroundImage: background?.background,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    color: background?.color
  }

  const handleInput = () => {
    const obj = {}
    for (const aux of countries) {
      if(aux.name === document.getElementById('country').value.toLowerCase()){
          obj.lat = aux.lat;
          obj.lon = aux.lon;
          setCoords(obj);
      }
  }
  }

  useEffect(()=>{

    //funcion callback donde la data se almacena en pos
    const success = pos =>{
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj);
    }
    //promesa de los navegadores para hallar tu posicion
    navigator.geolocation.getCurrentPosition(success)
  },[])

  useEffect(()=>{
    //verificamos si coord tiene información
    if(coords){
      const apiKey = '3f5f1cb6c0a3a6d1d40ad9282849257f';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenhenit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1),
            fCelsius: (res.data.main.feels_like - 273.15).toFixed(1),
            fFarenhenit: ((res.data.main.feels_like - 273.15) * 9/5 + 32).toFixed(1)
          }

          const objB = {}

          for (const aux of backgrounds) {
              if((aux.id === res.data.weather[0].icon) || (aux.id2 === res.data.weather[0].icon)){
                objB.background = aux.back;
                objB.color = aux.color;
              }
          }
          
          setTemperature(obj);
          setBackground(objB)
        })
        .catch(err => console.log(err))
        .finally(()=>setIsLoading(false))
    }
    //le colocamos coords para que se ejecute en el primer renderizado y cuando cambie coords
  },[coords])

  return (
    <div className="App" style={backgroundStyle}>
      <div className='card'>
      <div className='card__input'><input id='country' onInput={handleInput} type="search"  placeholder='Enter latam country...'/></div>
      { 
      isLoading ? <Loading />
      :
      <WeatherCard weather={weather} temperature={temperature} background={background}/>
      }   
      </div>
    </div>
  )
}

export default App
