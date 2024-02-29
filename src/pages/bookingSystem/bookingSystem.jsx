import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, Button, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link as RouterLink } from 'react-router-dom';

// Add the TimeBox component here
const TimeBox = ({ day, time, isBooked, onClick }) => {
  return (
    <Box
      onClick={onClick}
      style={{
        padding: '10px',
        backgroundColor: isBooked ? 'gray' : 'green',
        borderRadius: '8px',
        cursor: isBooked ? 'not-allowed' : 'pointer',
        outline: '2px solid white',
        marginBottom: '8px',
        width: '120px', // Set a fixed width for each time box
      }}
    >
      <Typography variant="h6" style={{ color: 'white', margin: 0 }}>
        {`${day} - ${time}`}
      </Typography>
    </Box>
  );
};

const drawerWidth = 240;

const BookingSystem = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookedTimes, setBookedTimes] = useState(JSON.parse(localStorage.getItem('bookedTimes')) || {});

  const handleTimeSelect = (day, time) => {
    const dayBookedTimes = bookedTimes[day] || [];
    if (!dayBookedTimes.includes(time)) {
      const updatedBookedTimes = {
        ...bookedTimes,
        [day]: [...dayBookedTimes, time],
      };
      setBookedTimes(updatedBookedTimes);
      localStorage.setItem('bookedTimes', JSON.stringify(updatedBookedTimes));
    } else {
      setSelectedTime({ day, time });
      setDialogOpen(true);
    }
  };

  const handleUnbook = () => {
    if (selectedTime && selectedTime.day) {
      const { day, time } = selectedTime;
      const updatedBookedTimes = {
        ...bookedTimes,
        [day]: bookedTimes[day].filter((t) => t !== time),
      };
      setBookedTimes(updatedBookedTimes);
      localStorage.setItem('bookedTimes', JSON.stringify(updatedBookedTimes));

      setDialogOpen(false);
      setSelectedTime(null);
    }
  };

  const isTimeBooked = (day, time) => {
    const dayBookedTimes = bookedTimes[day] || [];
    return dayBookedTimes.includes(time);
  };

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
          <Typography variant="h6" noWrap component="div">
            Booking System for Home Evaluation
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
            sm: 0,
          },
        }}
        aria-label="booking options"
      >
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
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row', // Display days and times side by side
          gap: '16px',
          flexWrap: 'wrap',
          flexGrow: 1,
          minHeight: '100vh',
          bgcolor: '#2B3336',
          overflowY: 'auto',
          padding: 9,
          width: '100%',
        }}
      >
        {[ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ].map((day) => (
          <div key={day}>
            <Typography color="white" variant="h6" gutterBottom>
              {day}
            </Typography>
            {[ '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM' ].map(
              (time) => (
                <TimeBox
                  key={`${day}-${time}`}
                  day={day}
                  time={time}
                  isBooked={isTimeBooked(day, time)}
                  onClick={() => handleTimeSelect(day, time)}
                />
              )
            )}
          </div>
        ))}
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Unbook Time</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to unbook {selectedTime && `${selectedTime.day} - ${selectedTime.time}`}? </Typography>
          <Button onClick={handleUnbook} color="secondary">
            Unbook
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BookingSystem;