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
        width: drawerWidth,
        backgroundColor: '#2B3336', //when in mobile view this will change the bottom half of the drawer box
      },
    }}
  >
    {/* Drawer content */}
    <Toolbar />
    <Divider />
    <List sx={{ backgroundColor: '#2B3336'}}>
      {[
        { text: 'Profile', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/profile' },
        { text: 'Air Quality', icon: <MailIcon sx={{ color: 'white' }} />, path: '/air-quality' },
        { text: 'Hot Weather', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/hot-weather' },
        { text: 'Cold Weather', icon: <MailIcon sx={{ color: 'white' }} />, path: '/cold-weather' },
        { text: 'Rainy Weather', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/rainy-weather' },
        { text: 'Booking System', icon: <MailIcon sx={{ color: 'white' }} />, path: '/booking-system' },
        { text: 'Sign Out', icon: <InboxIcon sx={{color: 'white'}} />, path: '/'},
      ].map((item) => (
        <ListItem key={item.text} disablePadding sx={{ backgroundColor: '#2B3336'}}> 
        {/* //above is what will change the background of the list items background */}
          <ListItemButton component={RouterLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} style={{ color: 'white' }} /> {/* this changes the text color of the drawer*/}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
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
              { text: 'Booking System', icon: <MailIcon sx={{ color: 'white' }} />, path: '/booking-system' },
              { text: 'Sign Out', icon: <InboxIcon sx={{color: 'white'}} />, path: '/'},
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
          Protecting Yourself in Cold Weather
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          In cold weather, it's important to take precautions to protect yourself. Here are some general tips:
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          1. Dress in layers to stay warm.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          2. Wear a hat and gloves to prevent heat loss.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          3. Keep your feet warm with insulated and waterproof boots.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          4. Stay dry to avoid hypothermia.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          5. Stay hydrated even in cold weather.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          6. Be aware of frostbite symptoms and seek medical attention if needed.
        </Typography>
        <Typography variant="body1" style={{ color: 'white' }}>
          These are general guidelines, and it's important to adapt them based on your specific situation.
        </Typography>
      </Box>
    </Box>
  );
}

export default Coldweather;
