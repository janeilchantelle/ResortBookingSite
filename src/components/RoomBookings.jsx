import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RoomBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const start = location.state?.start;
  const end = location.state?.end;
  const room = location.state?.room;

  const fetchRoomBookings = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/rooms/book", {
        method: 'POST',
        body: JSON.stringify({
          username: user.username,
          room_id: room.room_id,
          start: start,
          end: end,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("No current bookings found.");
      }

      const result = await response.json();
      if (result) {
        setSent(true);
        return result;  // Assuming result contains bookings
      } else {
        setError("No room bookings found.");
        return [];
      }
    } catch (err) {
      setError("No room bookings found.");
      return [];
    }
  };

  useEffect(() => {
    const loadBookings = async () => {
      const data = await fetchRoomBookings();
      setBookings(data);
    };

    loadBookings();
  }, []);

  return (
    <div>
      <h3>Room Bookings:</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {bookings.length === 0 && !error ? (
        <p>No room bookings found.</p>
      ) : (
        <div>
          {bookings.map(booking => (
            <div key={booking.id} className="bookingItem">
              <p><strong>Rm #:</strong> {booking.room_number}</p>
              <h4 className="roomName">{booking.roomName}</h4>
              <p className="bookingDetails">
                <strong>Date:</strong> {booking.date} <br />
                <strong>Time:</strong> {booking.time}
              </p>
              <br />
            </div>
          ))}
        </div>
      )}
      {sent && !error && <p style={{ color: 'green' }}>Booking successful!</p>}
    </div>
  );
};

export default RoomBookings;
