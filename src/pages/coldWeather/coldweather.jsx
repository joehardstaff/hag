import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const drawerWidth = 240;

export function Coldweather(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const WeatherDetails = ({ cityName }) => {
    const [weatherData, setWeatherData] = useState(null);
  
    useEffect(() => {
      const API_KEY = '6526eb30e182244dcfa8a4f776bd9126';
      const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
  
      axios.get(API_ENDPOINT)
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }, [cityName]);
  
    if (!weatherData) {
      return <div>Loading...</div>;
    }
  
  //extract weather data
    const { list } = weatherData;

    return (
      <div>
        {/* Render weather details here */}
        <Typography variant="h5">7-Day Forecast</Typography>
  
        <Grid container spacing={2}>
          {/* Render 7-day forecast here */}
          {list.map(item => (
            <Grid item key={item.dt} xs={12} sm={6} md={4}>
              <Box>
                <Typography variant="subtitle1">{item.dt_txt}</Typography>
                <Typography variant="body1">{item.weather[0].description}</Typography>
                <Typography variant="body1">{item.main.temp} °C</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: 'Profile', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/profile' },
          { text: 'Air Quality', icon: <MailIcon sx={{ color: 'white' }} />, path: '/air-quality' },
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
    </div>
  );


  const container = window !== undefined ? () => window().document.body : undefined;

  const [searchCity, setSearchCity] = useState('');
  const [selectedCity, setSelectedCity] = useState(''); // Store the selected city

  const handleSearch = () => {
    setSelectedCity(searchCity); // Set the selected city when the user searches
  };

  return (
    <Box sx={{ 
      display: 'flex',
       }
       }>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          bgcolor: '#2B3336', //changes the top bar
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
          />
          <IconButton color="inherit" onClick={handleSearch}>
            <MenuIcon />
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
            }
          }
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
              // this is the drawer on the left of the screen and holds all page directorys
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
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 0, 
          width: { 
            sm: `calc(100% - ${drawerWidth}px)` 
          } 
        }
      }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: '#2B3336',
            padding: 9,
            overflowY: 'auto',
            width: '100%',
          }}
        >
           <Typography 
          variant="h6" 
          style={{ 
            color: 'white' 
            }}
            >
              Air Quality
              </Typography>
          {/* Add Air Quality details here */}
          <WeatherDetails cityName={selectedCity} />
        </Box>
      </Box>
    </Box>
  );
}

export default Coldweather;