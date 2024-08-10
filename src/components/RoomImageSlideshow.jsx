import React, {useState } from 'react';
import '../styles/room-image-slideshow.css';

const RoomImageSlideshow = ({imagesList}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesList.length);
//     }, 8000);

//     return () => clearInterval(interval);
//   }, [imagesList]);

  const setSlide = (index) => {
    setCurrentIndex(index);
  };

  return (

    <div className="roomImageSlideshow-container">
      {imagesList.map((image, index) => (
        image?(
        <div
          className={`slide-${index === currentIndex ? 'active' : ''}`}
          key={index}
        >
          <img src={image} alt={`Slide-${index + 1}`} />
        </div>
        ) : null
      ))}
      <div className="dots2">
        {imagesList.map((image, index) => (
            image?(
            <div
                key={index}
                className={`dot-${index === currentIndex ? 'active' : ''}`}
                onClick={() => setSlide(index)}
            ></div>
            ) : null
        ))}
      </div>
    </div>

  );
};

export default RoomImageSlideshow;