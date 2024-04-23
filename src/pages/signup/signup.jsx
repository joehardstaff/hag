import * as React from 'react';
import { useState } from 'react';
import { db, auth } from '../../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom'; //This must be imported in order to link pages together, otherwise this will not work;
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import img1 from '../login/assets/Riget_Zoo.png';
import { collection, addDoc } from 'firebase/firestore'; 

const defaultTheme = createTheme();


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        
        // Save user information to Firestore
        try {
          const docRef = await addDoc(collection(db, 'users'), {
            email: user.email,
            // Add additional fields as needed
          });
          console.log("Document written with ID: ", docRef.id);
          setSuccess("Sign up successful!");
          setError(null);
        } catch (error) {
          console.error("Error adding document: ", error);
          setError("An error occurred while signing up. Please try again later.");
          setSuccess(null);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Email or password incorrect. Please try again.");
        setSuccess(null);
      });
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
              Sign Up
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
                type="submit"
                size="md"
                onClick={function(){}}
                variant="contained"
                sx={{ 
                    mt: 15, 
                    mb: 2,
                    bgcolor: '#272829', 
                    variant:{color:'white'},
                    width: '250px',
                    borderRadius: '12px',
                }}
              >
                Sign Up
              </Button>
              {(error || success) && (
            <Alert 
            icon={<CheckIcon fontSize="inherit" />} 
            severity={error ? "error" : "success"}>
            {error && <p style={{ color: 'red' }}>{error}</p>}  
            {success && <p style={{ color: 'green' }}>{success}</p>}
            </Alert>
          )}
              {/* program really hates if these arent here*/}
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
              {/* I fucking hate the blue shit, its so ugly jesus christ */}
              <Link
                component={RouterLink}
                to="/"
                variant="body2"
              >
                {"Have an account? LogIn"}
                </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignUp;