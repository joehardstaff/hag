import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import img1 from '../hotel/assets/hotel-booking.jpg';
import deluxe from '../hotel/assets/deluxe.jpg';
import superLuxury from '../hotel/assets/superLuxury.jpg';
import royalLuxury from '../hotel/assets/royalLuxury.jpg';
import { ThemeProvider, Typography, createTheme } from '@mui/material';
import Navigation from '../../components/CustomDrawerList';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear'; // Import the clear icon
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
import { styled } from '@mui/system';
import { db, auth } from '../../../firebase'; 
import { collection, addDoc } from 'firebase/firestore';

const defaultTheme = createTheme();


// Define the styled component
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function Hotel() {
  const [expandedDel, setExpandedDel] = useState(false); // The expand box for the deluxe room
  const [expandedSup, setExpandedSup] = useState(false); // The expand box for the Super Luxury Room
  const [expandedRoy, setExpandedRoy] = useState(false); // The expand box for the Royal Room
  const [open, setOpen] = useState(false);
  const [showRoomOptions, setShowRoomOptions] = useState(true); 
  const [showBookingOverlay, setShowBookingOverlay] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    checkInDate: '',
    checkOutDate: '',
    adults: 0,
    children: 0,
    roomType: 'deluxe',
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
      // Need to add actual emailing system, for the moment this 
      // piece of code is only for the looks till i can sort something
      handleClose();
    };

    // Below is all the room expansion functions
  const DeluxeExpandClick = () => {
    setExpandedDel(!expandedDel);
  };

  const superLuxuryClick = () => {
    setExpandedSup(!expandedSup);
  };

  const royalLuxuryClick = () => {
    setExpandedRoy(!expandedRoy);
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
  
        const docRef = await addDoc(collection(db, 'hotel'), bookingData);
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

  // This is for Checkout when user has selected, day, type of room and how many people staying
  const calculateTotalPrice = () => {
    const checkInDate = new Date(bookingDetails.checkInDate);
    const checkOutDate = new Date(bookingDetails.checkOutDate);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  
    // This is just to show how much it is for each room which is displayed on the website
    let totalPrice = 0;
    switch (bookingDetails.roomType) {
      case 'deluxe':
        totalPrice = nights * 45;
        break;
      case 'super-luxury':
        totalPrice = nights * 65;
        break;
      case 'royal-luxury':
        totalPrice = nights * 100;
        break;
      default:
        totalPrice = 0;
    }

    return totalPrice;
  };

  // Below is all the Booking Detail handing needed for the system to work
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
        <Navigation />
        {/* --------------------- The Image Background when you first load on the page */}
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
          {/* The Main text you see when you load onto the page */}
          <Typography variant="button" display="block" sx={{ fontSize: '50px', color:'black' }}>
            The Hotel of your dreams
          </Typography>
          {showRoomOptions && (
            <Box sx={{ background: '#fff', padding: '20px', width: '70%', marginTop: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
              <Grid container spacing={2}>
                <Grid item xs={10} md={4}>
                  {/* The box you see when you go to choose your check in date */}
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
                {/* The box you see when you pick your check out date */}
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
                  {/* neeeded for user to pick how many people so that the hotel staff know  */}
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
                  {/* Same here but with children, this is imporant so that stuff to handle differently */}
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
                  {/* Displayed on website, this is a multiple option question, and displays all options 
                  list on the page */}
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
                    <option value="deluxe">Deluxe</option>
                    <option value="super-luxury">Super Luxury</option>
                    <option value="royal-luxury">Royal Luxury</option>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  {/* This button send you to the checkout page once you are happy with your booking */}
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
        // This is the box that gives the black look on the back of the page
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
          //This is the White box that actually displays all the information 
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
              sx={{ position: 'absolute', top: '5px', right: '5px' }} // Position the close button
              onClick={handleCloseBookingOverlay} // Add click event handler to close the overlay
            >
              <ClearIcon />

            </IconButton>
            <Typography variant="h6" gutterBottom>
              Booking Summary
            </Typography>
            <Typography variant="body1" gutterBottom>
              Check-in / Check-out: {formatDates()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Room Type: {bookingDetails.roomType.charAt(0).toUpperCase() + bookingDetails.roomType.slice(1)}
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
            <Card sx={{ maxWidth: 345 }}>
      <CardHeader
      justifycontent="centre"
      direction="row"  
      title="Deluxe -- £45PN"
      />
        <CardMedia
          component= "img"
          height="194"
          sx={{
            backgroundImage: `url(${deluxe})`
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
             This impressive Hotel will shock you, with our amazing view of the city, spacious room and all the coffee you
            can drink. This room is something to remember!
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expandedDel}
            onClick={DeluxeExpandClick}
            aria-expanded={expandedDel}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedDel} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>            Comfortable Accommodation: The Deluxe Room provides spacious and well-appointed accommodation, ensuring a relaxing environment during your stay.
            Modern Furnishings: The room is furnished with modern amenities and stylish decor to create a welcoming atmosphere.
            Luxurious Bedding: You'll enjoy a plush, comfortable bed with high-quality linens and pillows, ensuring a restful night's sleep.
            Private Bathroom: Each Deluxe Room comes with a private bathroom equipped with modern fixtures, a shower, and complimentary toiletries for your convenience.
            In-Room Entertainment: Stay entertained with a flat-screen TV offering a variety of channels, perfect for unwinding after a day of exploring Riget Zoo and its surroundings.
            Work Desk: For those who need to stay productive during their stay, the Deluxe Room includes a spacious work desk and complimentary Wi-Fi access.
            Complimentary Refreshments: Enjoy complimentary tea and coffee-making facilities in your room, allowing you to relax with a hot beverage at any time.
            Room Service: Take advantage of room service to enjoy delicious meals and snacks in the comfort of your room, available at your convenience.</Typography>
          </CardContent>
        </Collapse>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="Super Luxury -- £65PN"
      />
        <CardMedia
          component= "img"
          height="194"
          sx={{
            backgroundImage: `url(${superLuxury})`
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          The Super Luxury Room at Riget Zoo offers unparalleled elegance, 
          featuring spacious accommodation with opulent decor and luxurious finishes. 
          Guests can enjoy a king-sized bed with premium bedding and a lavish ensuite 
          bathroom equipped with a deep soaking tub and deluxe bath amenities.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expandedSup}
            onClick={superLuxuryClick}
            aria-expanded={expandedSup}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedSup} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Spacious Accommodation: The Super Luxury Room boasts generous space, providing ample room to relax and unwind in style.
                Elegant Decor: Indulge in the opulent surroundings of the Super Luxury Room, featuring elegant furnishings, sophisticated decor, and luxurious finishes throughout.
                Premium Bedding: Sink into a sumptuous, king-sized bed adorned with premium linens, plush pillows, and a luxurious duvet, ensuring the utmost comfort for a restful night's sleep.
                Luxurious Bathroom: Step into a lavish ensuite bathroom equipped with a deep soaking tub, a separate walk-in rain shower, deluxe bath amenities, and plush robes and slippers, offering a spa-like experience in the comfort of your room.
                State-of-the-Art Technology: Enjoy the latest in-room technology, including a large flat-screen TV with premium channels, high-speed Wi-Fi connectivity, and integrated smart home features for ultimate convenience.
                Personalized Service: Experience personalized service with dedicated concierge assistance, ensuring all your needs are met promptly and efficiently throughout your stay.
                Exclusive Amenities: Benefit from exclusive access to additional amenities, such as a private lounge area, complimentary minibar stocked with premium beverages and snacks, and a dedicated dining area for intimate meals.
                Panoramic Views: Take in breathtaking views of the surrounding cityscape or natural landscape from expansive floor-to-ceiling windows, offering a picturesque backdrop to your stay</Typography>
          </CardContent>
        </Collapse>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
      <CardHeader
       title="Royal Luxury -- £100PN"
      />
        <CardMedia
          component= "img"
          height="194"
          sx={{
            backgroundImage: `url(${royalLuxury})`
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            The Royal Luxury Room epitomizes Opulence with its grand space,
            regal decor and majestic ambience. Indulge in the finest Bedding
            and amenities on offer for a truly royal experience.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expandedRoy}
            onClick={royalLuxuryClick}
            aria-expanded={expandedRoy}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedRoy} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
            Opulent Space: The Royal Luxury Room exudes grandeur with its expansive layout, offering abundant space for indulgent living and relaxation.
            Regal Decor: Immerse yourself in the lavish ambiance adorned with regal furnishings, exquisite decor, and luxurious accents that elevate the room to a realm of sophistication.
            Luxurious Bedding: Drift off into a realm of luxury on a majestic, king-sized bed adorned with the finest linens, plush pillows, and a deluxe duvet, ensuring unparalleled comfort for a truly regal slumber.
            Palatial Bathroom: Experience sheer indulgence in the opulent ensuite bathroom, featuring a lavish soaking tub, a decadent walk-in rain shower, premium bath amenities, and plush robes and slippers fit for royalty.
            Cutting-Edge Technology: Encounter the epitome of modernity with state-of-the-art in-room technology, including a deluxe entertainment system with a large-screen TV, premium channels, high-speed Wi-Fi connectivity, and advanced smart home features for seamless convenience.
            Impeccable Service: Revel in the highest level of personalized service with dedicated butler assistance, ensuring every desire and whim is met with utmost attention to detail throughout your majestic stay.
            Exclusive Privileges: Embrace the exclusivity of royal living with access to a private royal lounge, a fully stocked complimentary minibar with top-tier beverages and gourmet snacks, and a private dining area for intimate royal feasts</Typography>
          </CardContent>
        </Collapse>
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

export default Hotel;