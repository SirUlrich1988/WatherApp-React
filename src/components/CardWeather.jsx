import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../components/LoadingScreen'

const CardWeather = ({ lat, lon, setOpen, cityMode, cityName, setCityMode, setCityName }) => {
  const [weather, setWeather] = useState()
  const [temperture, settemperture] = useState()
  const [isCelsius, setisCelsius] = useState(true)
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    if (lon) {
      const apiKey = '0a512963a4d0f1ea71f67b8b58d0ec4a'
      let url
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

      if (cityMode) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      }

      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const temp = {
            celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
            farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} °F`
          }

          settemperture(temp)
          setisLoading(false)
        })
        .catch(err => console.log(err))
    }
  }, [lat, lon])

  console.log(weather)

  const handleClick = () => setisCelsius(!isCelsius)

  if (isLoading) {
    return <LoadingScreen />
  } else {
    return (
      <article className='card_result'>
        <h1>Weather App</h1>
        <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
        <div className='card_img'>
          <img
            src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png
            `} alt=''
          />
          <div className='card_data'>
            <h3>{weather?.weather[0].description}</h3><br />
            <ul>
              <li><span>Wind Speed </span>{weather?.wind.speed} m/s</li>
              <li><span>Clouds </span>{weather?.clouds.all} %</li>
              <li><span>Pressure </span>{weather?.main.pressure} hPa</li>
            </ul>
          </div>
        </div>
        <h2 className='h2_data'>{isCelsius ? temperture?.celsius : temperture?.farenheit}</h2><br />
        <button onClick={handleClick}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>
        <br />
            <button onClick={() => {
              setOpen(false)
              setCityMode(false)
              setCityName('')
            }}
            >Back
            </button>
            <br />
      </article>
    )
  }
}

export default CardWeather
