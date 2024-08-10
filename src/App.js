import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Home from './pages/Home';
import RoomAvailability from './pages/RoomAvailability';
import ActivityAvailability from './pages/ActivityAvailability';
import RoomBooking from './pages/RoomBooking';
import ActivityBooking from './pages/ActivityBooking';
import Account from './pages/Account';
import Nav from './components/Nav';
import useFetch from './hooks/useFetch';

  // Custom hook for fetching data
  function useFetchData(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          console.log('Fetched data:', result); 
          setData(result);
        } catch (error) {
          console.error('Fetch error:', error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return { data, loading, error };
  }

// Function to get today's date
function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}

function App() {
  const { data: allActivityData, loading: allActivityLoading, error: allActivityError } = useFetchData('http://localhost:8080/api/activities');
  const { data: allRoomData, loading: allRoomLoading, error: allRoomError } = useFetchData('http://localhost:8080/api/rooms');

  console.log(allRoomData)

  const [activityDate, setActivityDate] = React.useState(getToday());
  const [activityName, setActivityName] = React.useState("Please select your activity");
  const [checkInDate, setCheckInDate] = React.useState(getToday());
  const [checkOutDate, setCheckOutDate] = React.useState('');
  const [guests, setGuests] = React.useState('');
  const [type, setType] = React.useState("Select your preferred accommodation")
  const [user, setUser] = React.useState(null);

  const handleAuthStateChange = (authUser) => {
    setUser(authUser);
  };
  

  return (
    <>
      <Nav isAuthenticated={!!user} handleSignOut={() => setUser(null)} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        
        <Route
          path="/room-availability"
          element={
            <RoomAvailability
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              guests={guests}
              setGuests={setGuests}
              type={type}
              setType={setType}
              allRoomData={allRoomData}
              allRoomLoading={allRoomLoading}
              allRoomError={allRoomError}
            />
          }
        />

        <Route
          path={`/room-availability/:checkInDate/:checkOutDate/:requestedOccupancy/:roomType`}
          element={
            <RoomAvailability
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              guests={guests}
              setGuests={setGuests}
              type={type}
              setType={setType}
              allRoomData={allRoomData}
              allRoomLoading={allRoomLoading}
              allRoomError={allRoomError}
            />
          }
        />

        <Route
          path="/activity-availability"
          element={
            <ActivityAvailability
              activityDate={activityDate}
              setActivityDate={setActivityDate}
              activityName={activityName}
              setActivityName={setActivityName}
              allActivityData={allActivityData}
              allActivityLoading={allActivityLoading}
              allActivityError={allActivityError}
            />
          }
        />

      <Route
        path={`/activity-availability/:activityDate/:activityName`}
        element={
          <ActivityAvailability
            activityDate={activityDate}
            setActivityDate={setActivityDate}
            activityName={activityName}
            setActivityName={setActivityName}
            allActivityData={allActivityData}
            allActivityLoading={allActivityLoading}
            allActivityError={allActivityError}
          />
        }
      />

        {/* Protected routes */}
        <Route
          path="/room-booking"
          element={
            <Authenticator>
              {({ signOut, user: authUser }) => {
                handleAuthStateChange(authUser);
                return <RoomBooking user={authUser} />;
              }}
            </Authenticator>
          }
        />
        <Route
          path="/activity-booking"
          element={
            <Authenticator>
              {({ signOut, user: authUser }) => {
                handleAuthStateChange(authUser);
                return <ActivityBooking user={authUser} />;
              }}
            </Authenticator>
          }
        />
        <Route
          path="/account"
          element={
            <Authenticator>
              {({ signOut, user: authUser }) => {
                handleAuthStateChange(authUser);
                return <Account signOut={signOut} user={authUser} />;
              }}
            </Authenticator>
          }
        />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </>
  );
}

export default App;
