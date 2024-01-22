import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

import * as weatherIcons from 'react-icons/wi';

const drawerWidth = 240;

const WeatherIcons = {
  'Clear': 'WiDaySunny',
  'Partly cloudy': 'WiDayCloudy',
  'Cloudy': 'WiCloudy',
  'Overcast': 'WiCloudy',
  'Patchy rain': 'WiShowers',
  'Patchy snow': 'WiSnow',
  'Patchy sleet': 'WiSleet',
  'Patchy freezing drizzle': 'WiDayShowers',
  'Thundery outbreaks': 'WiThunderstorm',
};

const WeatherBox = ({ day, highTemp, lowTemp, description, airQuality }) => (
  <div style={{
    backgroundColor: '#2B3336',
    color: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  }}>
    {WeatherIcons[description] && React.createElement(WeatherIcons[description])}
    <Typography variant="h6">{day}</Typography>
    <Typography variant="body1">High: {Math.round(highTemp)}°, Low: {Math.round(lowTemp)}°</Typography>
    <Typography variant="body2">{description}</Typography>
    <Typography variant="body2">Air Quality: {airQuality}</Typography>
  </div>
);

export function Coldweather(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            bgcolor: '#2B3336',
            width: drawerWidth,
          },
        }}
        open
      >
        {/* Drawer content */}
        <Toolbar />
        <Divider />
        <List>
          {[
            { text: 'Profile', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/profile' },
            { text: 'Air Quality/Weather', icon: <MailIcon sx={{ color: 'white' }} />, path: '/air-quality' },
            { text: 'Hot Weather', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/hot-weather' },
            { text: 'Cold Weather', icon: <MailIcon sx={{ color: 'white' }} />, path: '/cold-weather' },
            { text: 'Rainy Weather', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/rainy-weather' },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={RouterLink} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} style={{ color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );

  const [searchCity, setSearchCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const handleSearch = () => {
    setSelectedCity(searchCity);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'f8f45a6cbd804745b7384614241701'; // takes the api key
        const city = selectedCity;
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`; // reference the api key and ensures that the city chosen can be modified in the url

        const response = await fetch(apiUrl); // fetches the apiurl and then waits for a response from the api
        const data = await response.json();

        if (data.forecast && data.forecast.forecastday) {
          const weeklyWeather = data.forecast.forecastday.map(dayData => ({
            day: new Date(dayData.date_epoch * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
            highTemp: dayData.day.maxtemp_c,
            lowTemp: dayData.day.mintemp_c,
            description: dayData.day.condition.text,
            airQuality: dayData.air_quality?.pm10,
          }));

          setWeatherData(weeklyWeather);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (selectedCity) {
      fetchWeatherData();
    }
  }, [selectedCity]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          bgcolor: '#2B3336',
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            sm: `${drawerWidth}px`,
          },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: {
                sm: 'none',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            HAG
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TextField
            label="Search City"
            variant="outlined"
            size="small"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            sx={{
              label: { color: 'white' },
              '& fieldset': { borderColor: 'white !important' }, // Set the outline color
            }}
          />
          <IconButton color="inherit" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: {
            sm: drawerWidth,
          },
          flexShrink: {
            sm: 0,
          },
        }}
        aria-label="mailbox folders"
      >
        {drawer}
      </Box>
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: '16px',
    minHeight: '100vh',
    bgcolor: '#2B3336',
    overflowY: 'auto',
    padding: 9,
    width: '100%',
  }}
>
  {weatherData.map((weather, index) => (
     <div key={index} style={{ outline: '2px solid white', borderRadius: '8px' }}>
    <WeatherBox
      key={index}
      day={weather.day}
      highTemp={weather.highTemp}
      lowTemp={weather.lowTemp}
      description={weather.description}
      airQuality={weather.airQuality}
    />
    </div>
  ))}
</Box>

    </Box>
  );
}

export default Coldweather;
