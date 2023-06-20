import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [KEY, setKey] = useState(localStorage.getItem(`key`) || ``)
  const [cityName, setCityName] = useState(`Bangkok`)
  const [countryName, setCountryName] = useState(`Thailand`)
  const [response, setResponse] = useState<any>({})
  const [responseCity, setResponseCity] = useState(``)
  const [responseCountry, setResponseCountry] = useState(``)

  function getBest() {
    const options = {
      method: 'GET',
      url: 'https://best-booking-com-hotel.p.rapidapi.com/booking/best-accommodation',
      params: {
        cityName: cityName,
        countryName: countryName
      },
      headers: {
        'X-RapidAPI-Key': KEY,
        'X-RapidAPI-Host': 'best-booking-com-hotel.p.rapidapi.com'
      }
    };
    console.log(`loading`)
    axios.request(options)
    .then(res => res.data)
    .then(data => {
      setResponse(data)
      setResponseCity(cityName)
      setResponseCountry(countryName)
    })
  }

  return (
    <>
      <div className="">
        <h1>Find Best Hotel In Town</h1>
        <div className="outText">
          {responseCity && <>
          <div className="">
            <h3>
              Best Booking in <b>
                {responseCity}, {responseCountry} </b> is <b> {response.name} 
                </b> with rating of <b>
                  {response.rating} 
                </b> / 10
            </h3>
          </div>
          <div className="outAct">
            <button onClick={() => open(response.link)}>Book Now On Booking.com</button>
          </div>
          </>}
        </div>
        <div className="input">
          <input type="text" value={cityName} placeholder={`city`} onChange={(e) => {
            e.preventDefault()
            setCityName(e.currentTarget.value)
          }} />
          <input type="text" value={countryName} placeholder={`country`} onChange={(e) => {
            e.preventDefault()
            setCountryName(e.currentTarget.value)
          }} />
        </div>
        {cityName && countryName &&
          <div className="btn">
            <button onClick={getBest}>Get Data</button>
          </div>
        }
        <div className="">
          <input type="password" placeholder='key' value={KEY} onChange={(e) => {
            e.preventDefault()
            localStorage.setItem(`key`, e.currentTarget.value)
            setKey(e.currentTarget.value)
          }} />
        </div>
      </div>
    </>
  )
}

export default App
