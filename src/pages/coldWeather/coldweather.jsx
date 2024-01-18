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
import * as weatherIcons from 'react-icons/wi';



const drawerWidth = 240;

// Tell the program when the api returns any of these what icon to display
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



const WeatherBox = ({ day, highTemp, lowTemp, description }) => (
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
  </div>
);


export function Coldweather(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: 'Profile', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/profile' },
          { text: 'Air Quality', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/air-quality' },
          { text: 'Hot Weather', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/hot-weather' },
          { text: 'Cold Weather', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/cold-weather' },
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
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const [searchCity, setSearchCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const handleSearch = () => {
    setSelectedCity(searchCity);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'f8f45a6cbd804745b7384614241701'; // Replace with your WeatherAPI.com key
        const city = selectedCity;
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.forecast && data.forecast.forecastday) {
          const weeklyWeather = data.forecast.forecastday.map(dayData => ({
            day: new Date(dayData.date_epoch * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
            highTemp: dayData.day.maxtemp_c,
            lowTemp: dayData.day.mintemp_c,
            description: dayData.day.condition.text,
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
            sm: `calc(100% - ${drawerWidth}px)`
          },
          ml: {
            sm: `${drawerWidth}px`
          },
        }}
      >
        <Toolbar>
          <TextField
            id="search-city"
            label="Search City"
            variant="outlined"
            size="small"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            sx={{
              id:{color: 'white'},
              label:{color: 'white'},
              variant:{borderColor: 'white',},
            }}
          />
          <IconButton color="inherit" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap component="div"
          >
            HAG
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: {
            sm: drawerWidth,
          },
          flexShrink: {
            sm: 0
          }
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: 'block',
              sm: 'none',
            },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            },
          }}
        >
          {drawer}
        </Drawer>
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
              width: drawerWidth
            },
          }
          }
          open
        >
          {drawer}
        </Drawer>
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
          <WeatherBox
            key={index}
            day={weather.day}
            highTemp={weather.highTemp}
            lowTemp={weather.lowTemp}
            description={weather.description}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Coldweather;