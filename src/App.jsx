import { useState, useEffect } from 'react'
import './App.css'
import CardWeather from './components/CardWeather'

function App () {
  const [coords, setCoords] = useState()
  const [open, setOpen] = useState(false)
  const [cityMode, setCityMode] = useState(false)
  const [cityName, setCityName] = useState('')

  const [data, setData] = useState('')

  useEffect(() => {
    if (open) {
      const success = pos => {
        const latlon = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }
        setCoords(latlon)
      }

      navigator.geolocation.getCurrentPosition(success)
    }
  }, [open])

  return (
    <div className='App'>
      <div className='card_search'>
      {
        open
          ? <CardWeather
              cityMode={cityMode}
              lon={coords?.lon}
              lat={coords?.lat}
              setOpen={setOpen}
              cityName={cityName}
              setCityMode={setCityMode} setCityName={setCityName}
            />
          : <>
            <p>Search by Location</p><br />
            <input
              type='text' onKeyDown={
              e => {
                if (e.key === 'Enter') {
                  setOpen(true)
                  setCityMode(true)
                  setCityName(data)
                }
              }
            }
              name='city'
              value={data}
              onChange={e => setData(e.target.value)}
            />
            <br /><br />
            <button onClick={() => setOpen(true)}>Get Weather of<br/> my Location</button>
          </>
      }
      </div>
    </div>
  )
}

export default App
