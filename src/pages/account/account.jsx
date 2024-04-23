import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Button, TextField, Grid, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomDrawerList from '../../components/CustomDrawerList';
import Reset from '../resetPassword/Reset';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const AccountPage = ({ email }) => {
    const [profileData, setProfileData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [contactMode, setContactMode] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const handleDeleteAccount = () => {
        setOpenConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                // Delete user document from Firestore
                await db.collection('users').doc(currentUser.uid).delete();
                
                // Delete user account
                await currentUser.delete();

                // Redirect or notify user
                // You can add your logic here
            }
        } catch (error) {
            console.error("Error deleting account: ", error);
        }
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    const q = query(collection(db, 'users'), where("email", "==", currentUser.email));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setProfileData(doc.data());
                    });
                } else {
                    console.error("No user is currently authenticated");
                }
            } catch (error) {
                console.error("Error fetching profile data: ", error);
            }
        };
        
        fetchProfileData();
    }, []);

    const handleContactProfile = () => {
        setContactMode(true);
    };

    const handleContactSave = async () => {
        setContactMode(false);
        await saveProfileData();
    };

    const handleEditProfile = () => {
        setEditMode(true);
    };

    const handleSaveProfile = async () => {
        setEditMode(false);
        await saveProfileData();
    };

    const saveProfileData = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userProfileData = { ...profileData };
                const userId = currentUser.uid;
                const usersCollection = collection(db, 'account');

                // Add user profile data to Firestore
                await addDoc(usersCollection, {
                    userId: userId,
                    ...userProfileData
                });

                console.log("Profile data saved successfully!");
            } else {
                console.error("No user is currently authenticated");
            }
        } catch (error) {
            console.error("Error saving profile data: ", error);
        }
    };

    return (
        <div>
            <AppBar position="fixed">
                <CustomDrawerList />
            </AppBar>
            <div style={{ marginLeft: '20px', marginTop: '64px', padding: '16px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Account
                        </Typography>
                        <Paper style={{ padding: '16px' }}>
                            {profileData ? (
                                <>
                                    {editMode ? (
                                        <>
                                            <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="First Name"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Last Name"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Age"
                                        type="number"
                                        value={profileData.age}
                                        onChange={(e) => setProfileData({ ...profileData, age: parseInt(e.target.value, 10) })}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Bio"
                                        multiline
                                        rows={4}
                                        value={profileData.bio}
                                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                    />
                                    <Button variant="contained" color="primary" onClick={handleSaveProfile}>
                                        Save
                                    </Button>
                                        </>
                                    ) : (
                                        <>       
                                    <Typography variant="body1" gutterBottom>
                                        <strong>First Name:</strong> {profileData.firstName}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Last Name:</strong> {profileData.lastName}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Email:</strong> {profileData.email}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Age:</strong> {profileData.age}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Bio:</strong> {profileData.bio}
                                    </Typography>
                                    <Button startIcon={<EditIcon />} onClick={handleEditProfile}>
                                        Edit
                                    </Button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <Typography>Loading...</Typography>
                                )}
                                </Paper>
                            </Grid>
                            {/* Accessibility Settings */}
                            <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Accessibility
                            </Typography>
                            <Paper sx={{ p: 2 }}>
                                <div>
                                    <FormControlLabel
                                        control={<Checkbox disabled />}
                                        label="High Contrast Mode"
                                    />
                                </div>
                                <div>
                                    <FormControlLabel
                                        control={<Checkbox disabled />}
                                        label="Larger Font Size"
                                    />
                                </div>
                            </Paper>
                            </Grid>
                            {/* Contact Information */}
                            <Grid item xs={12}>
                                <Typography variant="h4" gutterBottom>
                                    Contact Information
                                </Typography>
                                <Paper style={{ padding: '16px' }}>
                                {profileData ? (
                                <>
                                    {editMode ? (
                                        <>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                label="Phone Number"
                                                value={profileData.phoneNumber}
                                                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                                            />
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                label="Address"
                                                value={profileData.address}
                                                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                            />
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                label="Additional Contact Details"
                                                value={profileData.additionalContactDetails}
                                                onChange={(e) => setProfileData({ ...profileData, additionalContactDetails: e.target.value })}
                                            />
                                                <Button variant="contained" color="primary" onClick={handleContactSave}>
                                                    Save
                                                </Button>
                                        
                                        </>
                                    ) : (
                                        <>
                                            <Typography variant="body1" gutterBottom>
                                                <strong>Phone Number:</strong> {profileData.phoneNumber}
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                <strong>Address:</strong> {profileData.address}
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                <strong>Additional Contact Details:</strong> {profileData.additionalContactDetails}
                                            </Typography>
                                            <Button startIcon={<EditIcon />} onClick={handleEditProfile}>
                                        Edit
                                    </Button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <Typography>Loading...</Typography>
                                )}
                                </Paper>
                            </Grid>
                                <Button variant="contained" color="secondary" onClick={handleDeleteAccount}>
                                    Delete Account
                                </Button>
                            </Grid>                         
                    </div>
                </div>
    );
};

export default AccountPage;
