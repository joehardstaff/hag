import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; 
import CheckIcon from '@mui/icons-material/Check';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const triggerResetEmail = async () => {
    const auth = getAuth(); 
    await sendPasswordResetEmail(auth, email)
      .then((userCredential) => {
        console.log(userCredential);
        setSuccess("Email Sent"); 
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError("This Email does not exist, please try again");
        setSuccess(null);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid black',
        width:'700px',
        padding: '20px',
        margin: '100px auto'
      }}
    >
      <Typography
        component="h2"
        variant="h5"
        sx={{
          mt: 13,
          ml: 4.5,
          color: '#000',
        }}
      >
        Please Enter Your Email
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="reset"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        variant="filled"
        sx={{
          mt: 9,
          bgcolor: '#272829',
          input: { color: '#FFFFFF' },
          label: { color: '#FFFFFF' },
          borderRadius: '12px',
        }}
      />
      <Button
        type="submit"
        size="md"
        onClick={triggerResetEmail}
        variant="contained"
        fullWidth
        sx={{
          mt: 15,
          mb: 2,
          width:'400px',
          bgcolor: '#272829',
          variant: { color: 'white' },
          borderRadius: '12px',
        }}
      >
        Send email
      </Button>
      {(error || success) && (
            <Alert 
            icon={<CheckIcon fontSize="inherit" />} 
            severity={error ? "error" : "success"}>
            {error && <p style={{ color: 'red' }}>{error}</p>}  
            {success && <p style={{ color: 'green' }}>{success}</p>}
            </Alert>
          )}
    </Box>
  );
};

export default ResetPassword;
