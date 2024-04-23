import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import img1 from '../../assets/Animals/lion.jpg'
import { ThemeProvider, Typography, createTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CustomDrawerList from '../../components/CustomDrawerList';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Copyright from '../../components/copyright';
// Create the main functional component
const defaultTheme = createTheme();

const ContactEmail = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendEmail = () => {
    //Not functional doesnt do anything
    handleClose();
  };

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:5173">
          Riget Zoo
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  
  return (
    <Box
      sx={{
        width: '100vw',
        marginLeft: '10px',
        marginTop: '20px',
        p: 3,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        Feel free to reach out to us through any of the following channels:
      </Typography>
      <Typography variant="body2" paragraph>
        Social Media:
        <Link href="https://www.facebook.com/facebook" target="_blank" rel="noopener noreferrer">
          Facebook
        </Link>
        {' | '}
        <Link href="https://twitter.com/x" target="_blank" rel="noopener noreferrer">
          Twitter
        </Link>
        {' | '}
        <Link href="https://www.instagram.com/instagram" target="_blank" rel="noopener noreferrer">
          Instagram
        </Link>
      </Typography>
      <Typography variant="body2" paragraph>
        Email:{' '}
        <Link href="#" onClick={handleClickOpen}>
          Send us an email
        </Link>
      </Typography>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="message"
            label="Your question or concern"
            type="text"
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSendEmail} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="body2" paragraph>
        Phone: 07932446018
      </Typography>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Box>
  );
};

export function Home() {
  // Return the JSX for the component
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        {/* App Bar */}
        <CustomDrawerList />
        {/* chatgpt generated */}
        <Box
          component="main"
          sx={{
            flex: 1, // Fill the remaining vertical space
            display: 'flex', // Use flexbox
            flexDirection: 'column', // Arrange children in a column
            justifyContent: 'center', // Center vertically
            alignItems: 'center', // Center horizontally
            backgroundImage: `url(${img1})`,
            backgroundSize: 'cover', // Cover the entire container
            backgroundPosition: 'center', // Center the background image
            textAlign: 'center', // Center text
            color: 'white',
            padding: '20px',
          }}
        >
          <Typography variant="button" display="block" sx={{ fontSize: '50px' }}>
            Riget Zoo, Where you find your ambition
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button href="http://localhost:5173/tickets"variant="contained">Book Tickets</Button>
            <Button href="http://localhost:5173/membership"variant="contained">Become a Member</Button>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          color: 'white',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">
          Riget Zoo is not just a destination; it's an experience where nature's wonders meet human curiosity. Nestled amidst lush greenery, Riget Zoo offers a sanctuary for wildlife enthusiasts, families, and adventurers alike.
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 9)', // Semi-transparent black background
          color: 'white',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">
          About Us
        </Typography>
        <Typography>
          Once a neglected parcel in the city, Riget Zoo blossomed from Dr. Thomas Riget's fervor for wildlife. With community support, it evolved into a haven for animals and humans alike. Through education and conservation, it captured hearts near and far. Today, Riget Zoo stands as a testament to vision and community, a place where dreams flourish and bonds between species thrive.
        </Typography>
      </Box>
      <TableContainer maxWidth="sm" sx={{ margin: 'auto' }}>
        <Table sx={{ width: '100%', textAlign: 'center' }}>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <Typography variant="button" display="block" sx={{ fontSize: '20px' }}>
                  Opening Times
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <Typography variant="button" display="block" sx={{ fontSize: '20px' }}>
                  Monday - 9:00am - 5:00pm
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <Typography variant="button" display="block" sx={{ fontSize: '20px' }}>
                  Tuesday - 9:00am - 5:00pm
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <Typography variant="button" display="block" sx={{ fontSize: '20px' }}>
                  Wednesday - 9:00am - 5:00pm
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <Typography variant="button" display="block" sx={{ fontSize: '20px' }}>
                  Thursday - 9:00am - 5:00pm
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <Typography variant="button" display="block" sx={{ fontSize: '20px' }}>
                  Friday - 9:00am - 5:00pm
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <Typography variant="button" display="block" sx={{ fontSize: '20px' }}>
                  Saturday - 9:00am - 5:00pm
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <Typography variant="button" display="block" sx={{ fontSize: '20px' }}>
                  Sunday - Closed
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <Typography variant="button" display="block" sx={{ fontSize: '20px' }}>
                  Times are subject to change, any changes will be made via email minimum two days in advance.
                  Any closures of the zoo is subject to refund, and will be processed within 14 business days.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ContactEmail />
    </ThemeProvider>
  );
}

export default Home;
