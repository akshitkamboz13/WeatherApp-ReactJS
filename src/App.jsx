import React from 'react'

const App = () => {
  const [city, setCity] = React.useState('');
  const [img, setImg] = React.useState('');
  const [temp, setTemp] = React.useState('');
  const [weather, setWeather] = React.useState('');
  const [location, setLocation] = React.useState('');

  const seachWeather = () => {
    if(city === '') {
      alert('Please enter city name');
    } else {
      getWeather();
    }
  }


  const getWeather = () => {
    async function fetchData() {
      const API_KEY = process.env.API_KEY;
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await res.json();;
      setImg(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
      setTemp(Math.floor(data.main.temp - 273.15) + '°C');
      setWeather(data.weather[0].main);
      setLocation(data.name + ', ' + data.sys.country);
    }
    fetchData();
  }

  return (
    <div className='flex .playfair flex-col items-center text-center font-semibold h-[100vh] pt-28 bg-slate-50'>
      <div className=' leading-8'>
        <h1 className=' text-4xl mb-6'>Weather App</h1>
        <div>
          <input type="text" value={city} className='border-2 rounded ' onChange={(e)=>(setCity(e.target.value))} />
          <button className='border-2 w-20 rounded bg-slate-600 text-slate-50' onClick={seachWeather}>Search</button>
        </div>
      </div>
        <div className='flex flex-col gap-3 m-9'>
          <img src={img} alt="" className='h-[40px]' />
          <p className=' text-lg'>{location}</p>
          <p className='text-3xl'>{temp}</p>
          <p>{weather}</p>
        </div>
    </div>
  )
}

export default App
