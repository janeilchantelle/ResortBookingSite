import { useState } from "react";
import "../styles/activity-room-search-bars.css"
import { useNavigate } from "react-router-dom";

const RoomSearchBar = ({checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, guests, setGuests, type, setType, allRoomData}) => {
    
    const navigate = useNavigate();

    const [dateError, setDateError] = useState(null);
    const [guestError, setGuestError] = useState(null);

    const handleInputChange = (e) => {
        // Update state based on input changes
        if (e.target.name === 'checkin-date') {
            setCheckInDate(e.target.value);
        } else if (e.target.name === 'checkout-date') {
            setCheckOutDate(e.target.value);
            setDateError(null);
        } else if(e.target.name === "guests"){
            setGuests(e.target.value);
            setGuestError(null);
        }
    };

    const handleTypeChange = (event) =>{
        setType(event.target.value)
    }

    const handleSearch = (event) => {
        event.preventDefault();

        if (!checkInDate || !checkOutDate) {
            setDateError('Both check-in and check-out dates are required.');
            return;
        }
        if (!guests){
            setGuestError("Please select the number of guests.")
            return;
        }

        // Example: Log the dates to the console or send them to an API
        console.log(`Check-In Date: ${checkInDate}`);
        console.log(`Check-Out Date: ${checkOutDate}`);
        // // Clear error and reset form or redirect as needed
        setGuestError('');
        setDateError('');

         // Construct URL based on the selected filters
         let url = `/room-availability/${checkInDate}/${checkOutDate}/${guests}/`;
         if (type && type !== "") {
             url += `${type}`;
         }
     
         // Navigate to the search results page with selected parameters
         navigate(url);
    }
  
    return (
        <>
            <div className="search-header">
                <h1>YOUR STAY BEGINS HERE</h1>
                <h3>Check availability now</h3>
            </div>

            <form className="search-info" onSubmit={handleSearch}>

                <div className="checkin-checkout-guests">
                    <div className="checkin-checkout-boxes">
                        <label htmlFor="checkin-date">CHECK-IN DATE: </label>
                        <input 
                        type="date" 
                        name="checkin-date" 
                        id="checkin-date" 
                        value={checkInDate}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="checkin-checkout-boxes">
                        <label htmlFor="checkout-date">CHECK-OUT DATE: </label>
                        <input
                            type="date" 
                            name="checkout-date" 
                            id="checkout-date" 
                            value={checkOutDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="guests">
                        <label htmlFor="guests">GUESTS: </label>
                        <input type="number" name="guests" id="guests" value={guests} onChange={handleInputChange}/>
                    </div>
                    <div className="type">
                        <label htmlFor="type">TYPE: </label>
                        <select name="type" className="select-room-type" onChange={handleTypeChange}>
                            <option>Select your preferred accommodation</option>
                            <option value="room">Room</option>
                            <option value="suite">Suite</option>
                            <option value="villa">Villa</option>
                            {/* {allRoomData && allRoomData.map(room => (
                                <option key={room.room_id}>{room.type}</option>
                            ))} */}
                        </select>
                    </div>
                </div>

                {dateError && <p style={{ color: 'red' }}>{dateError}</p>}
                {guestError && <p style={{ color: 'red' }}>{guestError}</p>}

                <button type="submit">SEARCH</button>

            </form>
        </>
    )
};

export default RoomSearchBar;