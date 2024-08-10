import "../styles/room-availability.css"
import RoomDetails from "../components/RoomDetails";
// import Nav from "../components/Nav"
import RoomSearchBar from "../components/RoomSearchBar"
import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";

const RoomAvailability = ({
    allRoomData,
    checkInDate, 
    setCheckInDate, 
    checkOutDate, 
    setCheckOutDate, 
    guests, 
    setGuests, 
    type, 
    setType
}) => {
    // console.log(allRoomData);

    const { checkInDate: paramCheckIn, checkOutDate: paramCheckOut, requestedOccupancy: paramOccupancy, roomType: paramType} = useParams();
    const [filteredRooms, setFilteredRooms] = useState(allRoomData);
    // const [filteredRoom, setFilteredRoom] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
    
        const fetchRooms = async () => {
            setLoading(true);
            setError(null);
            try {
              const checkIn = paramCheckIn || checkInDate;
              const checkOut = paramCheckOut || checkOutDate;
              const occupancy = paramOccupancy || guests;
              const roomType = paramType || type;
          
              let url = 'http://localhost:8080/api/rooms';
          
              if (paramCheckIn && paramCheckOut && paramOccupancy && !paramType || paramType === "Select your preferred accommodation") {
                url = `http://localhost:8080/api/rooms/availability/occupancy?startDate=${checkIn}&endDate=${checkOut}&requestedOccupancy=${occupancy}`;
              } else if (paramCheckIn && paramCheckOut && paramOccupancy && paramType && paramType !== "Select your preferred accommodation") {
                url = `http://localhost:8080/api/rooms/availability/occupancy/type?startDate=${checkIn}&endDate=${checkOut}&requestedOccupancy=${occupancy}&roomType=${roomType}`;
              }
          
              const response = await fetch(url);
              const result = await response.json();
              console.log('Fetch result:', result); // Log the result for debugging
          
              setFilteredRooms(result);
            } catch (err) {
              setError(err);
            } finally {
              setLoading(false);
            }
          };
          
        fetchRooms();
      }, [paramCheckIn, paramCheckOut, paramOccupancy, paramType, checkInDate, checkOutDate, guests, type]);


    return (
    <div>

        <RoomSearchBar 
        checkInDate={checkInDate} 
        setCheckInDate={setCheckInDate} 
        checkOutDate={checkOutDate} 
        setCheckOutDate={setCheckOutDate} 
        guests={guests} 
        setGuests={setGuests} 
        type={type} 
        setType={setType} 
        allRoomData={allRoomData}/>

        <div className="roomData">
            {filteredRooms.length>1? filteredRooms.map((room) => (
                <RoomDetails key={room.room_id} room={room} start={checkOutDate} end={checkInDate} />
            )) : (
                <RoomDetails room={filteredRooms} start={checkOutDate} end={checkInDate}/>
            )}
        </div>

        {/* <div className="roomData">
            {allRoomLoading && <h3 id="loading">Loading...</h3>}
            {allRoomError && <h3 id="error">Error: {allRoomError.message}</h3>}
            {allRoomData && allRoomData.map(room => (
                <RoomDetails key={room.room_id} room={room}/>
            ))}
        </div> */}
        
    </div>

  );
};

export default RoomAvailability;