import React from 'react';
import { List, ListItem, ListItemButton,ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';


const CustomDrawerList = (props) => {
  const drawerWidth = 240; // Define the drawer width
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false); // State for mobile drawer

  const handleDrawerToggle = () => { // Toggle function for mobile drawer
    setMobileOpen(!mobileOpen);
  };
 const container = window !== undefined ? () => window().document.body : undefined; // Define container for responsive layout

  return (
    <div>
      <AppBar position="fixed" sx={{ bgcolor: '#2B3336' }}>
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
          {/*Top Bar - Where you edit the list  */}
          <List sx={{ 
          width: '100%',  
          display: 'flex', 
          flexDirection: 'row', 
          backgroundColor: '#2B3336'
          }}>
            {[
              { text: 'Tickets', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/tickets' },
              { text: 'Hotel', icon: <MailIcon sx={{ color: 'white' }} />, path: '/hotel' },
              { text: 'Home', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/home' },
              { text: 'Education', icon: <MailIcon sx={{ color: 'white' }} />, path: '/education' },
              { text: 'Account', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/account' },
              { text: 'Admin', icon: <MailIcon sx={{ color: 'white' }} />, path: '/booking-system' },
              { text: 'Sign Out', icon: <InboxIcon sx={{color: 'white'}} />, path: '/'},
            ].map((item) => (
              <ListItem key={item.text} disablePadding sx={{ backgroundColor: '#272727'}}> 
              {/* //above is what will change the background of the list items background */}
                <ListItemButton component={RouterLink} to={item.path}>
                  {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                  <ListItemText primary={item.text} style={{ color: 'white' }} /> {/* this changes the text color of the drawer*/}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
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
          <List sx={{ backgroundColor: '#272727'}}>
            {[
              { text: 'Tickets', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/tickets' },
              { text: 'Hotel', icon: <MailIcon sx={{ color: 'white' }} />, path: '/hotel' },
              { text: 'Home', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/home' },
              { text: 'Education', icon: <MailIcon sx={{ color: 'white' }} />, path: '/education' },
              { text: 'Account', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/account' },
              { text: 'Admin', icon: <MailIcon sx={{ color: 'white' }} />, path: '/booking-system' },
            ].map((item) => (
              <ListItem key={item.text} disablePadding sx={{ backgroundColor: '#272727'}}> 
              {/* //above is what will change the background of the list items background */}
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} style={{ color: 'white' }} /> {/* this changes the text color of the drawer*/}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
    </div>
  );
};

export default CustomDrawerList;
