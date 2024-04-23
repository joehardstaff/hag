import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CustomDrawerList from '../../components/CustomDrawerList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

const Education = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  //The inquiry send 
  const handleSendEmailEnquiry = () => {
    // Simulate sending email // isnt functional and wont do anything
    alert('Your inquiry has been sent!');
    setOpen(false);
  };
  
  const handleClick = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleSendEmail = () => {
    // Simulate sending email // isnt functional and wont do anything
    alert('Your Email has been sent!');
    setOpen1(false);
  };

  const drawerWidth = 240;

  return (
    <div>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: '#2B3336',
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
          {/* Top Bar for Navigation */}
          <CustomDrawerList />
          {/* Top Bar for Navigation */}
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#ffffff',
          p: 3,
          mt: '64px',
        }}
      >
        <Typography variant="h1" sx={{ mb: 3, fontSize:'30px', textAlign:'center' }}>
          Education Programs at Riget Zoo
        </Typography>

        {/* Animals Information */}
        <Typography variant="h2" sx={{ mb: 2, fontSize:'30px' }}>
          Animals
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Learn about our fascinating animals from around the world! From lions to penguins, we have it all. <br />
          <Link href="../../Riget Zoo Endangered Animals.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant='contained' sx={{mt:3}}>
            Click here to view the PDF
            </Button>
          </Link>
        </Typography>

        {/* Inquiry Email System */}
        <Typography variant="h2" sx={{ mb: 2, fontSize:'30px' }}>
          Inquiry
        </Typography>
        <Typography>
        All education rate tickets, and other paid-for services such as workshops, 
        must be confirmed and paid for at least two weeks before the date of the trip/activity 
        via one of the following ways: <br />
        <br />
        BACS payment. You must include your Order Number as reference with the payment in order 
        for us to match the payment to your trip. Failure to do so may result in us being 
        unable to identify your trip as paid-for and may result in delays to your visit.
        <br />
        <br />Debit or credit card. Please call 0344 225 1826 to make payment in this way, 
        and quote your booking Order Number
        </Typography>
        <Button variant="contained" onClick={handleClickOpen} sx={{mt:3}}>
          Send Inquiry
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="name" label="Your Name" fullWidth />
            <TextField margin="dense" id="email" label="Your Email" fullWidth />
            <TextField margin="dense" id="message" label="Message" fullWidth multiline rows={4} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSendEmail} color="primary">Send</Button>
          </DialogActions>
        </Dialog>

        {/* Educational Resources */}
        <Typography variant="h1" sx={{ mb: 2, mt:2, fontSize:'30px' }}>
          Educational Resources
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Explore our educational resources to enhance your learning experience at Riget Zoo. 
          From worksheets to videos, we have it all!
          <br />
          <Button variant='contained'sx={{mt:3}}>
            Click here to see
          </Button>
        </Typography>

        {/* Invoice Information */}
        <Typography variant="h2" sx={{ mb: 2, fontSize:'30px' }}>
          Invoice Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Please find below the invoice information for our educational programs:
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>School Group (per person)</TableCell>
                <TableCell>£5.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>College Group (per person)</TableCell>
                <TableCell>£7.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Club Group (per person)</TableCell>
                <TableCell>£8.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
        <Link href="#" onClick={handleClick}>
          Send us an email
        </Link>
      </Typography>
      <Dialog open={open1} onClose={handleClose}>
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
          <Button onClick={handleClose1} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSendEmailEnquiry} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="body2" paragraph>
        Phone: 07932446018
      </Typography>
    </Box>
    </div>
  );
};

export default Education;
