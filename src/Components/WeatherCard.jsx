import React, { useState } from 'react'

const WeatherCard = ({ weather, temperature}) => {
  const [celsius, setCelsius] = useState(true);

  const handleClick = () => setCelsius(!celsius)

  return (

      <div className='card__main'>
      <div className='card__principal'>
        <div className='card__icon'><img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="icon" /></div>
        <div className='card__text'>
          <p className='card__text--temperature'>{celsius? temperature?.celsius : temperature?.farenhenit}°</p>
          <h2 className='card__text--description'>{weather?.weather[0].description}</h2>
          <button onClick={handleClick} className='card__text--btn'>Change to °{celsius? "F": "C"}</button>
        </div>
      </div>
      <div className='card__details'>
        <div className='card__item'>
          <div className='card__item--detail'>
            <span className='card__country'>{weather?.name}, {weather?.sys.country}</span>
            <h3 className='card__span'>COUNTRY</h3>
          </div>
        </div>
        <div className='card__item'>
          <div className='card__item--detail'>
            <span>{celsius ? temperature?.fCelsius : temperature?.fFarenhenit}°</span>
            <h3>FEELS LIKE</h3>
          </div>
          <div className='card__item--detail'>
            <span>{weather?.wind.speed} M/S</span>
            <h3>WIND</h3>
          </div>
        </div>
        <div className='card__item'>
          <div className='card__item--detail'>
            <span>{(weather?.visibility) * Math.pow(10, -3)} MI</span>
            <h3>VISIBILITY</h3>
          </div>
          <div className='card__item--detail'>
            <span>{weather?.main.humidity} %</span>
            <h3>HUMIDITY</h3>
          </div>
        </div>
        <div className='card__item'>
          <div className='card__item--detail'>
            <span>{weather?.main.pressure} HPA</span>
            <h3>PRESSURE</h3>
          </div>
          <div className='card__item--detail'>
            <span>{weather?.clouds.all} %</span>
            <h3>CLOUDS</h3>
          </div>
        </div>
      </div>
      </div>

  )
}

export default WeatherCard