import React from 'react';
import Nav from '../components/Nav';
import { useParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/activity-confirmation.css"

const ActivityBooking = ({user}) => {
  //fetch params from last page here: TODO
  let date = useLocation().state.date
  let activity = useLocation().state.activity
  console.log(useLocation());
  console.log(date);
  console.log(activity);
  console.log(activity.activityId);
  console.log(user)

  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const bookActivity = async () => {
    try{
      const response = await fetch("http://localhost:8080/api/activities/book", {
        method: 'POST',
        body: JSON.stringify({
            userName: user.username,
            activityId: activity.activityId,
            date: date
          }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      });
      
      console.log(response);
      const result = await response.json();
      if(result != null){
        setSent(true);
      }
      else(setError("Booking did not go through; head back to booking page and try again"))
    }catch(err){
      setError("Booking did not go through; head back to booking page and try again")
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    bookActivity();
  }
  
 
  if(error == null){
    if(sent === true){
      return (
        <div className='activity-booking'>
          <h1 className='activity-heading'>Thank-you! Your activity has been reserved.</h1>
          <div className='success-div'>
            <div className='confirmation-textbox'>
              <p>Activity: {activity.name}</p>
              <p>Date: {date}</p>
              <p>Time: {activity.time}</p>
              <button className="account-button"><Link to="/account">View All Bookings</Link></button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='activity-booking'>
          <h1 className='activity-heading'>Please Confirm Your Booking</h1>
          <form onSubmit={handleSubmit} className="activity-confirmation-form">
            <div className='confirmation-textbox'>
              <p>Activity: {activity.name}</p>
              <p>Date: {date}</p>
              <p>Time: {activity.time}</p>
              <p>Do you wish to continue?</p>
              <button type="submit" className="confirmation-button">Confirm</button>
            </div>
          </form>
        </div>
      )
    }
  } else {
    console.log(error);
    return(
      <div>
        <h1>Booking</h1>
        <p>{error}</p>
      </div>
    )
  };
  
}
  

export default ActivityBooking;
