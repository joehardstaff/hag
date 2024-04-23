import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import img1 from '../../assets/Animals/binrat.jpg';
import { ThemeProvider, Typography, createTheme } from '@mui/material';
import CustomerDrawerList from '../../components/CustomDrawerList';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear'; 
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { db, auth } from '../../../firebase'; 
import { collection, addDoc } from 'firebase/firestore';

const defaultTheme = createTheme();

export function Tickets() {
  const [open, setOpen] = useState(false);
  const [showRoomOptions, setShowRoomOptions] = useState(true);
  const [showBookingOverlay, setShowBookingOverlay] = useState(false); 
  const [bookingDetails, setBookingDetails] = useState({
    checkInDate: '',
    checkOutDate: '',
    adults: 0,
    children: 0,
    roomType: 'Standard',
    bookingName: '',
    totalPrice: 0,
  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendEmail = () => {
    handleClose();
  };

  const toggleBookingOverlay = () => {
    setShowBookingOverlay(!showBookingOverlay);
  };

  const handleBookNow = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const bookingData = {
          ...bookingDetails,
          userEmail: currentUser.email,
        };
  
        const docRef = await addDoc(collection(db, 'bookings'), bookingData);
        console.log("Booking added with ID: ", docRef.id);
  
        // Redirect to localhost:3000 after successful booking
        window.location.href = 'http://localhost:3000';
  
      } else {
        console.error("No user is currently authenticated");
      }
    } catch (error) {
      console.error("Error adding booking: ", error);
    }
  };

const calculateTotalPrice = () => {
  // Calculate the number of nights
  const checkInDate = new Date(bookingDetails.checkInDate);
  const checkOutDate = new Date(bookingDetails.checkOutDate);
  

  let pricePerNight = 0;
  switch (bookingDetails.roomType) {
    case 'Standard':
      pricePerNight = bookingDetails.adults * 25 + bookingDetails.children * 15;
      break;
    case 'Animal Petting':
      pricePerNight = bookingDetails.adults * 35 + bookingDetails.children * 25;
      break;
    case 'Zoo Tour':
      pricePerNight = bookingDetails.adults * 55 + bookingDetails.children * 45;
      break;
    default:
      pricePerNight = 0;
  }

  let totalPrice = pricePerNight;

  return totalPrice;
};

  const handleBookingDetailsChange = (e) => {
    const { id, value } = e.target;
    setBookingDetails({ ...bookingDetails, [id]: value });
  };

  const formatDates = () => {
    return `${new Date(bookingDetails.checkInDate).toLocaleDateString()} - ${new Date(bookingDetails.checkOutDate).toLocaleDateString()}`;
  };

  const handleCloseBookingOverlay = () => {
    setShowBookingOverlay(false);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <CustomerDrawerList />
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${img1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
            color: 'white',
            padding: '20px',
          }}
        >
          <Typography variant="button" display="block" sx={{ fontSize: '50px' }}>
            Book your tickets now!!!
          </Typography>
          {showRoomOptions && (
            <Box sx={{ background: '#fff', padding: '20px', width: '70%', marginTop: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="checkInDate"
                    label="Check In"
                    type="date"
                    fullWidth
                    value={bookingDetails.checkInDate}
                    onChange={handleBookingDetailsChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="checkOutDate"
                    label="Check Out"
                    type="date"
                    fullWidth
                    value={bookingDetails.checkOutDate}
                    onChange={handleBookingDetailsChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="adults"
                    label="Adults"
                    type="number"
                    fullWidth
                    value={bookingDetails.adults}
                    onChange={handleBookingDetailsChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="children"
                    label="Children"
                    type="number"
                    fullWidth
                    value={bookingDetails.children}
                    onChange={handleBookingDetailsChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="roomType"
                    select
                    label="Room Type"
                    fullWidth
                    value={bookingDetails.roomType}
                    onChange={handleBookingDetailsChange}
                    SelectProps={{
                      native: true,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Animal Petting">Animal Petting</option>
                    <option value="Zoo Tour">Zoo Tour</option>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleBookNow} href="http://localhost:3000">
                    Book Now
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
      {showBookingOverlay && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              background: '#fff',
              padding: '20px',
              width: '50%',
              borderRadius: '5px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
              position: 'relative', 
            }}
          >
            <IconButton
              sx={{ position: 'absolute', top: '5px', right: '5px' }} 
              onClick={handleCloseBookingOverlay} 
            >
              <ClearIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Booking Summary
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ticket Type: {bookingDetails.roomType.charAt(0).toUpperCase() + bookingDetails.roomType.slice(1)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Number of Adults: {bookingDetails.adults}x
            </Typography>
            <Typography variant="body1" gutterBottom>
              Number of Children: {bookingDetails.children}x
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Price: £{bookingDetails.totalPrice}
            </Typography>
            <TextField
              id="bookingName"
              label="Booking Name"
              fullWidth
              value={bookingDetails.bookingName}
              onChange={handleBookingDetailsChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" color="primary" fullWidth href='http://localhost:3000'>
              Pay Now
            </Button>
          </Box>
        </Box>
      )}
      <Stack justifyContent="center" direction="row" spacing={5} sx={{ mt: 2 }}>
            <Card xs={12} sm={6} md={4} sx={{ maxWidth: 345 }}>
      <CardHeader
      justifycontent="centre"
      direction="row"  
      title="Standard Ticket - £25PP"
      />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          With the standard ticket at Riget Zoo, visitors gain access to all general exhibits, 
          including diverse wildlife habitats, interactive animal encounters, 
          and educational presentations. 
          </Typography>
        </CardContent>
      </Card>
      <Card xs={12} sm={6} md={4} sx={{ maxWidth: 345 }}>
      <CardHeader
        title="Animal Petting - £35PP"
      />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          With the animal petting ticket at Riget Zoo, visitors can enjoy interactive 
          experiences such as feeding sessions, guided tours with zookeepers, 
          and hands-on encounters with a variety of friendly animals, 
          fostering a deeper connection with the wildlife
          </Typography>
        </CardContent>
      </Card>
      <Card xs={12} sm={6} md={4} sx={{ maxWidth: 345 }}>
      <CardHeader
       title="Zoo Tour - £55PP"
      />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          With the Zoo tour ticket at Riget Zoo, visitors not only receive a 
          guided tour led by knowledgeable zoo staff but also gain access 
          to exclusive areas not available to standard ticket holders. 
          These areas may include behind-the-scenes animal enclosures, 
          VIP viewing platforms, and interactive feeding experiences, 
          providing a truly immersive and unforgettable zoo adventure.
          </Typography>
        </CardContent>
      </Card>
      </Stack>
      <Box
      sx={{
        width: '98vw',
        marginLeft: '10px',
        marginTop: '20px',
        p: 3,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
      }}
    >
      <Box>
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
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default Tickets;