import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Profile from './pages/profile/profile';
import ColdWeather from './pages/coldWeather/coldweather';
import AirQuality from './pages/airQuality/airquality';
import RainyWeather from './pages/rainyWeather/rainyWeather';
import HotWeather from './pages/hotWeather/hotweather';


// Add future files here that need a directory in order to link pages together
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
     <Routes>
     <Route path="/hot-weather" element={<HotWeather />} />
      <Route path="/rainy-weather" element={<RainyWeather />} />
      <Route path="/air-quality" element={<AirQuality />} />
        <Route path="/cold-weather" element={<ColdWeather />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes> 
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
