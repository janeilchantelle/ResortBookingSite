import React from 'react';
import Nav from '../components/Nav';
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const RoomBooking = ({user}) => {
  console.log(user);
  //fetch params from last page here: TODO

  let start = useLocation().state.end
  let end = useLocation().state.start
  let room = useLocation().state.room

  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  
  const bookRoom = async () => {
    try{
      /*
      let url = `http://localhost:8080/api/rooms/book?user_id=${user_id}&room_id=${room_id}&start=${start}&end=${end}`;
      const response = await fetch(url);
      */
      
      
      const response = await fetch("http://localhost:8080/api/rooms/book", {
        method: 'POST',
        body: JSON.stringify({
            username: user.username,
            room_id: room.room_id,
            start: start,
            end: end
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
    bookRoom();
  }
  
 
  if(error == null){
    if(sent === true){
      return (
        <div>
          <h1>SUCCESS</h1>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Booking</h1>
          <p> Confirm booking for room {room.room_name} from {start} to {end} </p>
          <form onSubmit={handleSubmit}>
            <div>
              <button type="submit"> Submit</button>
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
  

export default RoomBooking;
