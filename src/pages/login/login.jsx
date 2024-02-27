import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import img1 from './assets/HAG-logos.jpeg'; //Need this imported in order to bring logo to life
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"; 
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const defaultTheme = createTheme();

// copied this off youtube, still yet to be used, i dont know what it does i dont know how to use it 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setSuccess("Login successful!");
        successfulAuth();
        setError(null); 
      })
      .catch((error) => {
        console.log(error);
        setError("Email or Password incorrect, Please try again"); 
        setSuccess(null); 
      });
  };

  const Navigate = useNavigate();

  const successfulAuth = () => {
    Navigate('/profile')
  }

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
            backgroundImage: `url(${img1})`, // Use the imported image as a background
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
            {/* Not a fucking clue what this does i just know i need it because the styling goes to shit otherwise */}
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
            {/* This holds emal box im pretty sure, again the program goes to shit otherwise, so we will go with this  */}
            <Box 
            textAlign='center' 
            component="form" 
            noValidate 
            onSubmit={handleSignIn} 
            sx={{ 
                mt: 1
                }}
            >
                {/* This makes the email text go white, box black ect ect any modications to the actual text and box must go here cheers future me */}
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
              {/* Bunch of useless shit, will clear when done with the program, fuck you for sortening the deadline
              to add to this also i cant get rid of any of this because the program decided it cant be fucked to put anything where its meant to go */}
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
              {/* I fucking hate the blue shit, its so ugly jesus christ */}
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
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;