import ActivityAvailability from "../pages/ActivityAvailability";
import { Link } from "react-router-dom";
import "../styles/activity-details.css"

const ActivityDetails = ({activity, dateToBook}) => {
  console.log(activity);
  if (!activity) {
    return <div>Loading activity details...</div>; // Provide feedback if activity is not available
  }
  return (
    <form className="activity-form">
      <h3 className="activity-name">{activity.name}</h3>
      <div className="activity-image-text">
        {activity.image1 ? (
          <img src={activity.image1} alt="Activity" className="activityImage" />
        ) : (
          <div>No image available</div> // Handle missing image case
        )}
        <div className="activity-textbox">
            <p id="activityDescription">{activity.description}</p>
            <p id="activityDate">Occurs daily at {activity.time}</p>
            <p>{dateToBook}</p>
            <Link to='/activity-booking' state={{date: dateToBook, activity: activity}}>
              <button type="submit">BOOK NOW</button>
            </Link>
        </div>
      </div>
    </form>
  );
};

export default ActivityDetails;
