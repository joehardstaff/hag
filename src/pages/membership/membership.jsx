import React from 'react';
import Silver from '../../assets/Membership/silver.jpg';
import Bronze from '../../assets/Membership/bronze.jpg';
import Gold from '../../assets/Membership/gold.jpg'
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomerDrawerList from '../../components/CustomDrawerList';
import { Button } from '@mui/material';

const Membership = () => {
  return (
    <div style={{ position: 'relative' }}> {/* Ensure relative positioning */}
      <CustomerDrawerList style={{ position: 'fixed', top: 0, left: 0, width: '100%' }} /> {/* Adjust positioning */}
    <Stack justifyContent="center" direction="row" spacing={5} sx={{ mt: 40 }}>
        <Card sx={{ backgroundImage: `url(${Bronze})`, maxWidth: 345 }}>
        <CardHeader
        justifycontent="centre"
        direction="row"  
        title="Bronze Reward Scheme - £50 Per Year"
        />
        <CardContent>
        <Typography variant="body2" color="text.secondary">
        With the bronze reward scheme at Riget Zoo, 
        visitors receive benefits such as discounted admission rates, 
        exclusive access to members-only events, priority booking for popular attractions, 
        special offers on merchandise and concessions, and occasional free or discounted 
        guest passes 
        </Typography>
        <Button variant='contained' sx={{mt:3}}>
          Select
        </Button>
        </CardContent>
        </Card>
        <Card sx={{ backgroundImage: `url(${Silver})`, maxWidth: 345 }}>
        <CardHeader
        title="Silver Reward Scheme - £150 Per Year"
        />
        <CardContent>
        <Typography variant="body2" color="text.secondary">
        The silver membership at Riget Zoo typically offers enhanced benefits compared to the bronze level, 
        including additional perks such as unlimited admission throughout the year, 
        complimentary parking, discounts on food and beverages, invitations to behind-the-scenes 
        tours or VIP experiences, and priority access to new exhibits or attractions.
        </Typography>
        <Button variant='contained'sx={{mt:0.5}}>
          Select
        </Button>
        </CardContent>
        </Card>
        <Card sx={{ backgroundImage: `url(${Gold})`, maxWidth: 345 }}>
        <CardHeader
        title="Gold Reward Scheme - £200 Per Year"
        />
        <CardContent>
        <Typography  variant="body2" color="text.secondary">
        The gold reward scheme at Riget Zoo provides top-tier benefits, 
        including unlimited year-round admission, exclusive access to 
        premium experiences like animal encounters or private tours, 
        priority seating at shows and events, complimentary refreshments, 
        personalized services such as dedicated guest assistance, 
        and special recognition or gifts for loyal members.
        </Typography>
        <Button variant='contained'sx={{mt:2}}>
          Select
        </Button>
        </CardContent>
        </Card>
    </Stack>
    </div>
  );
};

export default Membership;
