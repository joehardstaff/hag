import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import img1 from './assets/Riget_Zoo.png';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"; 
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const defaultTheme = createTheme();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [openTermsDialog, setOpenTermsDialog] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError("Please accept the terms & conditions to proceed.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess("Login successful!");
        successfulAuth(email);
        setError(null); 
      })
      .catch((error) => {
        setError("Email or Password incorrect, Please try again"); 
        setSuccess(null); 
      });
  };

  const Navigate = useNavigate();

  const successfulAuth = () => {
    Navigate('/home'); 
  };

  const handleTermsDialogOpen = () => {
    setOpenTermsDialog(true);
  };

  const handleTermsDialogClose = () => {
    setOpenTermsDialog(false);
  };

  return (
    <ThemeProvider 
    theme={defaultTheme}
    >
      <Grid 
      container 
      component="main" 
      sx={{ height: '100vh' }}
      >
        <CssBaseline />
        {/* This Display the Picture to the left half of the screen, currently using a website hosting it, must change */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // Background styling
            backgroundImage: `url(${img1})`, // Use the imported image as a background
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#2B3336',
          }}
        />

        {/* This is the left box in its entirety, any modifications to it has to be done within the sx tag */}
        <Grid 
        item xs={12} 
        sm={8} 
        md={5} 
        component={Paper} 
        elevation={6} 
        sx={{
            bgcolor: '#2B3336'
            }}
        square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* This is the top of the page (yes that login) font needs changing but apart from that this is all good to go */}
            <Typography 
            component="h2" 
            variant="h5" 
            sx={{ 
                mt: 13,
                color: '#FFFFFF',
            }}
            >
              Login
            </Typography>
            {/* This holds email box and password box*/}
            <Box 
            textAlign='center' 
            component="form" 
            noValidate 
            onSubmit={handleSignIn} 
            sx={{ 
                mt: 1
                }}
            >
                {/* This makes the email text go white/ensures that user
                input is sent off to firebase for verification before allowing
                user through */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ 
                    mt: 9,
                    bgcolor: '#272829',
                    input:{color: '#FFFFFF'},
                    label:{color: '#FFFFFF'},
                    borderRadius: '12px',
                }}
              />
              {/* Self explanatory really */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                type="password"
                variant="filled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ 
                    bgcolor: '#272829',
                    mt: 9,
                    label:{color: '#FFFFFF'},
                    input:{color: '#FFFFFF'},
                    borderRadius: '12px',
                }}
              />
              {/* This is the button at the bottom, all sorted i have no issues with it so good stuff all round (i think) */}
              <Button
                onClick= {useNavigate}
                type="submit"
                size="md"
                variant="contained"
                sx={{ 
                    mt: 15, 
                    mb: 2,
                    bgcolor: '#272829', 
                    variant:{color:'white'},
                    width: '200px',
                    borderRadius: '12px',
                }}
              >
                Login
              </Button>
            {(error || success) && (
            <Alert 
            icon={<CheckIcon fontSize="inherit" />} 
            severity={error ? "error" : "success"}>
            {error && <p style={{ color: 'red' }}>{error}</p>}  
            {success && <p style={{ color: 'green' }}>{success}</p>}
            </Alert>
          )}
          {/* program really hates if these arent here */}
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
              <Link
                component={RouterLink}
                to="/signup"
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
                </Link>
                <Link
                component={RouterLink}
                to="/reset-password"
                variant="body2"
                sx={{
                  marginLeft: '30px'
                }}
              >
                {"Forgot your Password?"}
                </Link>
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
                    label={<Link component="button" onClick={handleTermsDialogOpen}>I agree to the Terms & Conditions and Privacy Policy</Link>}
                  />
                </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Terms & Conditions Dialog */}
      <Dialog open={openTermsDialog} onClose={handleTermsDialogClose}>
        <DialogContent>
          {/* Place your terms & conditions and privacy policy content here */}
          <Typography variant="h6">Terms & Conditions</Typography>
          <Typography paragraph>
          Terms and Conditions

These terms and conditions ("Terms") govern your use of our services and website.

By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the services.

1. Use of Services

You agree to use our services only for lawful purposes and in accordance with these Terms. You may not use our services for any illegal or unauthorized purpose.

2. Intellectual Property

All content included on our website, such as text, graphics, logos, images, and software, is the property of our company and is protected by copyright laws.

3. Privacy

Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect, use, and disclose your personal information.

4. Limitation of Liability

In no event shall our company be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our services.

5. Governing Law

These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.

6. Changes to Terms

We reserve the right to modify these Terms at any time. You are advised to review these Terms periodically for any changes.

7. Contact Us

If you have any questions about these Terms, please contact us...
          </Typography>
          <Typography variant="h6">Privacy Policy</Typography>
          <Typography paragraph>
          Privacy Policy

This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services or visit our website.

1. Information We Collect

We may collect various types of information, including:

Personal Information: We may collect personal information such as your name, email address, and contact details when you register for an account or communicate with us.
Usage Information: We may collect information about how you interact with our services, including your IP address, browser type, and device information.
Cookies: We may use cookies and similar technologies to collect information about your browsing activities and preferences.
2. How We Use Your Information

We may use the information we collect for various purposes, including:

Providing and maintaining our services
Personalizing your experience
Communicating with you
Analyzing usage trends and improving our services
Protecting our rights and interests
3. Sharing Your Information

We may share your information with third parties in the following circumstances:

With service providers: We may share your information with third-party service providers who assist us in providing our services.
With affiliates: We may share your information with our affiliates for business purposes.
With legal authorities: We may disclose your information in response to legal requests or to comply with legal obligations.
4. Data Security

We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.

5. Your Choices

You may choose not to provide certain information, but this may limit your ability to access certain features of our services.

6. Children's Privacy

Our services are not directed to individuals under the age of 18, and we do not knowingly collect personal information from children.

7. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

8. Contact Us

If you have any questions about this Privacy Policy, please contact us.
          </Typography>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default Login;
