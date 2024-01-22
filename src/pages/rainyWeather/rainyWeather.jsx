import React from 'react';
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

const drawerWidth = 240;

export function Rainyweather(props) {
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
            Cold Weather Advice
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{
              label: { color: 'white' },
              '& fieldset': { borderColor: 'white !important' },
            }}
          />
          <IconButton color="inherit">
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
               <Typography variant="h4" style={{ color: 'white' }}>
          Staying Safe in Rainy Weather
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          In rainy weather, it's crucial to take precautions to ensure your safety. Here are some general tips:
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          1. Carry an umbrella or wear a waterproof jacket to stay dry.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          2. Wear waterproof footwear to protect your feet from getting wet.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          3. Be cautious of slippery surfaces, especially on roads and sidewalks.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          4. Ensure your vehicle is equipped for rainy conditions, including functioning wipers and good tires.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          5. Plan your routes and allow for extra travel time to accommodate slower traffic.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          6. Stay informed about weather forecasts and potential hazards in your area.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          These are general guidelines, and it's important to adapt them based on your specific situation and local conditions.
        </Typography>
      </Box>
    </Box>
  );
}

export default Rainyweather;
