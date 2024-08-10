import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '@aws-amplify/auth';

const UserDetails = ({ onFetchUserDetails }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isFetched, setIsFetched] = useState(false); // Add state to track if data has been fetched

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (isFetched) return; // Prevent fetching if data is already fetched

      try {
        const currentUser = await getCurrentUser();
        const username = currentUser?.username; // Optional chaining for safety
        console.log('Current user:', username);
        
        if (username) {
          const response = await fetch(`http://localhost:8080/api/users/${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }

          const result = await response.json();
          setUserDetails(result);
          console.log('User details:', result);

          // Pass the details back to the parent
          onFetchUserDetails(result);
          setIsFetched(true); // Mark as fetched
        }
      } catch (err) {
        console.error('Error fetching current user or user details:', err);
        setError('Cannot find user details, try again later.');
      }
    };

    fetchCurrentUser();
  }, [onFetchUserDetails, isFetched]); // Add isFetched to dependency array to ensure it only runs once

  if (error) {
    return <p>{error}</p>;
  }

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return null; // No need to render anything directly
};

export default UserDetails;