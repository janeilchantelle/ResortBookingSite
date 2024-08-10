import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import useFetch from '../hooks/useFetch'; // Import your useFetch hook implementation
import '../styles/activity-room-search-bars.css';

const ActivitySearchBar = ({
    activityDate,
    setActivityDate,
    activityName,
    setActivityName,
    allActivityData
}) => {
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();
   
  const handleInputChange = (e) => {
    // Update state based on input changes
    if (e.target.name === 'activity-name') {
      setActivityName(e.target.value);
    } else if (e.target.name === 'activity-date') {
      setActivityDate(e.target.value);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();

    // Clear previous date error
    setDateError('');

    if (!activityDate) {
      setDateError('Please select the activity date you wish to search.');
      return;
    }

    // Construct URL based on the selected filters
    let url = `/activity-availability/${activityDate}/`;
    if (activityName && activityName !== "") {
        url += `${activityName}`;
    }

    // Navigate to the search results page with selected parameters
    navigate(url);
  };

  return (
    <>
      <div className="search-header">
        <h1>YOUR ADVENTURE AWAITS</h1>
        <h3>Search. Find. Explore.</h3>
      </div>

      <form className="search-info" onSubmit={handleSearch}>
        <div className="activity-date">
          <div className="date-name-boxes">
            <label htmlFor="activity-date">DATE: </label>
            <input
              type="date"
              name="activity-date"
              id="activity-date"
              value={activityDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="date-name-boxes">
            <label htmlFor="activity-name">ACTIVITY NAME: </label>
            <select
              name="activity-name"
              className="select-activity-name"
              onChange={handleInputChange}
              value={activityName}
            >
              <option value="Please select your activity">Please select your activity</option>
              {allActivityData &&
                allActivityData.map(activity => (
                  <option
                    key={activity.activity_id}
                  >
                    {activity.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {dateError && <p style={{ color: 'red' }}>{dateError}</p>}

        <button type="submit">SEARCH</button>
      </form>
    </>
  );
};

export default ActivitySearchBar;