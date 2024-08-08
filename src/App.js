import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Home from './pages/Home';
import RoomAvailability from './pages/RoomAvailability';
import ActivityAvailability from './pages/ActivityAvailability';
import Booking from './pages/Booking';

import ActivityBooking from './pages/ActivityBooking';
import Account from './pages/Account';
import BookingConfirmation from './pages/BookingConfirmation';

// Custom hook for fetching data
function useFetchData(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
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
  // Fetch data
  const { data: allActivityData, loading: allActivityLoading, error: allActivityError } = useFetchData('http://localhost:8080/api/activities');
  const { data: allRoomData, loading: allRoomLoading, error: allRoomError } = useFetchData('http://localhost:8080/api/rooms');

  // States
  const [activityDate, setActivityDate] = React.useState(getToday());
  const [activityName, setActivityName] = React.useState("Please select your activity");
  const [checkInDate, setCheckInDate] = React.useState(null);
  const [checkOutDate, setCheckOutDate] = React.useState(null);
  const [guests, setGuests] = React.useState('');

  return (
    <Routes>
      {/* Public routes accessible without authentication */}
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


      {/* Authenticated routes handled by Authenticator */}
      <Route
        path="/*"
        element={
          <Authenticator>
          {({ signOut, user }) => (
              <Routes>
                <Route path="/booking" element={<Booking />} />
                {/* <Route path="/booking-confirmation" element={<BookingConfirmation />} /> */}
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/booking" element={<Booking user = {user}/>} />
                <Route path="/activity-booking" element={<ActivityBooking user = {user}/>} />
                <Route path="/account" element={<Account signOut={signOut} />} />
              </Routes>
         
          )}
        </Authenticator>
        }
      />
    </Routes>
  );
}


export default App;
