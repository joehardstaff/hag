import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Pen from '../profile/CoolPenguine.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Define the drawer width
const drawerWidth = 240;

// Create the main functional component
export function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Define the initial state for medical history
  const [medicalHistory, setMedicalHistory] = React.useState(() => {
    // Load medical history from local storage or set default values
    const storedMedicalHistory = localStorage.getItem('medicalHistory');
    return storedMedicalHistory ? JSON.parse(storedMedicalHistory) : ['', '', ''];
  });

  // Function to handle changes in medical history
  const handleMedicalHistoryChange = (index, value) => {
    const updatedMedicalHistory = [...medicalHistory];
    updatedMedicalHistory[index] = value;
    setMedicalHistory(updatedMedicalHistory);
    // Save medical history to local storage
    localStorage.setItem('medicalHistory', JSON.stringify(updatedMedicalHistory));
  };

  const [editable, setEditable] = React.useState(false);
  const [username, setUsername] = React.useState(() => {
    const storedUsername = localStorage.getItem('username');
    return storedUsername || 'JohnDoe';
  });
  const [email, setEmail] = React.useState(() => {
    const storedEmail = localStorage.getItem('email');
    return storedEmail || 'joehardstaff@gmail.com';
  });
  const [password, setPassword] = React.useState(() => {
    const storedPassword = localStorage.getItem('password');
    return storedPassword || '********';
  });
  const [location, setLocation] = React.useState(() => {
    const storedLocation = localStorage.getItem('location');
    return storedLocation || 'New York, USA';
  });
  const [fullName, setFullName] = React.useState(() => {
    const storedFullName = localStorage.getItem('fullName');
    return storedFullName || 'Joe Hardstaff';
  });
  const [language, setLanguage] = React.useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'English';
  });

  // Function to handle changes in user details
  const handleUserDetailChange = (field, value) => {
    if (editable) {
      if (field === 'username') {
        setUsername(value);
        localStorage.setItem('username', value);
      } else if (field === 'email') {
        setEmail(value);
        localStorage.setItem('email', value);
      } else if (field === 'password') {
        setPassword(value);
        localStorage.setItem('password', value);
      } else if (field === 'location') {
        setLocation(value);
        localStorage.setItem('location', value);
      } else if (field === 'fullName') {
        setFullName(value);
        localStorage.setItem('fullName', value);
      } else if (field === 'language') {
        setLanguage(value);
        localStorage.setItem('language', value);
      }
    }
  };

  const toggleEdit = () => {
    setEditable(!editable);
  };

  // Define container for responsive layout
  const container = window !== undefined ? () => window().document.body : undefined;

  // Return the JSX for the component
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* App Bar */}
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
        </Toolbar>
      </AppBar>
      {/* Side Drawer */}
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
            },
          }}
        >
          {/* Drawer content */}
          <Toolbar />
          <Divider />
          <List>
            {[
              { text: 'Dashboard', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/dashboard' },
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
        </Drawer>
        {/* Permanent Drawer */}
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
              { text: 'Dashboard', icon: <InboxIcon sx={{ color: 'white' }} />, path: '/dashboard' },
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
        </Drawer>
      </Box>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
          },
        }}
      >
        {/* Content in the main section */}
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
          {/* User Profile Section */}
          <div
            style={{
              width: 130,
              height: 130,
              marginRight: 2,
              backgroundImage: `url(${Pen})`,
              backgroundSize: 'cover',
              borderRadius: '100%',
            }}
          />
          <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
            User Profile
          </Typography>
          {/* User details */}
          <Typography variant="body1" paragraph sx={{ color: 'white' }}>
            <strong>Username:</strong>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                bgcolor: '#404040',
                padding: 1,
                borderRadius: 4,
                marginLeft: 1,
              }}
            >
              {editable ? (
                <TextField
                  value={username}
                  onChange={(e) => handleUserDetailChange('username', e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              ) : (
                username
              )}
            </Box>
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: 'white' }}>
            <strong>Password:</strong>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                bgcolor: '#404040',
                padding: 1,
                borderRadius: 4,
                marginLeft: 1,
              }}
            >
              {editable ? (
                <TextField
                  value={password}
                  onChange={(e) => handleUserDetailChange('password', e.target.value)}
                  fullWidth
                  variant="outlined"
                  type="password"  // Added type attribute for password field
                />
              ) : (
                password
              )}
            </Box>
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: 'white' }}>
            <strong>Location:</strong>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                bgcolor: '#404040',
                padding: 1,
                borderRadius: 4,
                marginLeft: 1,
              }}
            >
              {editable ? (
                <TextField
                  value={location}
                  onChange={(e) => handleUserDetailChange('location', e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              ) : (
                location
              )}
            </Box>
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: 'white' }}>
            <strong>Email Address:</strong>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                bgcolor: '#404040',
                padding: 1,
                borderRadius: 4,
                marginLeft: 1,
              }}
            >
              {editable ? (
                <TextField
                  value={email}
                  onChange={(e) => handleUserDetailChange('email', e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              ) : (
                email
              )}
            </Box>
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: 'white' }}>
            <strong>Full Name:</strong>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                bgcolor: '#404040',
                padding: 1,
                borderRadius: 4,
                marginLeft: 1,
              }}
            >
              {editable ? (
                <TextField
                  value={fullName}
                  onChange={(e) => handleUserDetailChange('fullName', e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              ) : (
                fullName
              )}
            </Box>
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: 'white' }}>
            <strong>Language:</strong>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                bgcolor: '#404040',
                padding: 1,
                borderRadius: 4,
                marginLeft: 1,
              }}
            >
              {editable ? (
                <TextField
                  value={language}
                  onChange={(e) => handleUserDetailChange('language', e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              ) : (
                language
              )}
            </Box>
          </Typography>
          <Button onClick={toggleEdit} sx={{ color: 'white', borderColor: 'white', marginTop: 2 }}>
            {editable ? 'Save Changes' : 'Edit Details'}
          </Button>
          {/* Medical History Section */}
          <Typography variant="h5" gutterBottom sx={{ color: 'white', marginTop: 3 }}>
            Medical History
          </Typography>
          <TextField
            label="Condition 1"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={medicalHistory[0]}
            onChange={(e) => handleMedicalHistoryChange(0, e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Condition 2"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={medicalHistory[1]}
            onChange={(e) => handleMedicalHistoryChange(1, e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Condition 3"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={medicalHistory[2]}
            onChange={(e) => handleMedicalHistoryChange(2, e.target.value)}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
