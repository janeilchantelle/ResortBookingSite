import React, { useState } from 'react';
import UserDetails from '../components/UserDetails';
import RoomBookings from '../components/RoomBookings';
import ActivityBookings from '../components/ActivityBookings';
import '../styles/account.css';
import { Link } from 'react-router-dom';

const Account = ({ signOut, user }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [username, setUsername] = useState(null);

  const handleFetchUserDetails = (details) => {
    setUsername(details.username);
    setUserDetails(details);
  };

  return (
    <>
      <UserDetails user={user} onFetchUserDetails={handleFetchUserDetails} />
      {userDetails && (
        <>
          <div className="topNav"></div>
          <div className="accountHeader">
            <h1>See you soon, {userDetails.firstName} {userDetails.lastName}!</h1>
          </div>

          <div className="mainDiv">
            <div className="accountDetails">
              <div className="div1">
                <h2>Account Details</h2>
                <p>Username: {username}</p>
                <p>Name: {userDetails.firstName} {userDetails.lastName}</p> 
                <p>Email: {userDetails.email}</p>
              </div>

              <div className="div2">
                <Link to="/room-availability">
                  <h3 className="links1">Book a Room</h3>
                </Link>
                <Link to="/activity-availability">
                  <h3 className="links1">Book an Activity</h3>
                </Link> 
                <h3 className="links1" onClick={signOut}>Sign Out</h3>
              </div>

              <img
                className="beachfeet"
                src="https://img.freepik.com/free-photo/back-view-woman-s-feet-beach-sands_23-2148614770.jpg?uid=R106210913&ga=GA1.1.75415720.1720630919&semt=ais_hybrid"
                alt="beach"
              />
            </div>
          </div>

          <div className="bookingHeader">
            <h2 className="bookingH2">Bookings</h2>
          </div>
            
          <div className="bookings">
            <img
              src="https://img.freepik.com/free-photo/landscape-resort-holiday-pool-tropical_1203-5202.jpg?uid=R106210913&ga=GA1.1.75415720.1720630919&semt=ais_hybrid"
              alt="pool"
              className="poolImg"
            />

            <div className="roomDiv">
              <RoomBookings user={user} />
            </div>

            <div className="activityDiv">
              <ActivityBookings />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
