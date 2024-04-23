import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Paper } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Alert from '@mui/material/Alert';
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
    <div>
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      <Paper style={{ padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
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
            variant="outlined"
          />
          <Button
            type="submit"
            size="medium"
            onClick={triggerResetEmail}
            variant="contained"
            fullWidth
            style={{ marginTop: '15px' }}
          >
            Send email
          </Button>
          {error && (
            <Alert severity="error" style={{ marginTop: '15px' }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" style={{ marginTop: '15px' }}>
              {success}
            </Alert>
          )}
      </Paper>
    </div>
  );
};

export default ResetPassword;
