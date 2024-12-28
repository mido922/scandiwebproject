import React from 'react';
import LeftArrow from "../assets/LeftArrow.png";
import RightArrow from "../assets/RightArrow.png";

type ImageType = {
  url: string;
};

type CarouselProps = {
  galleries: ImageType[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Carousel: React.FC<CarouselProps> = ({ galleries, currentIndex, setCurrentIndex }) => {

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleries.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleries.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container">
      <img onClick={goToPrevious} className="carouselButton prev-button" src={LeftArrow} />
      <div className="carousel-image">
        {galleries.map((image, index) => (
          <div
            key={index}
            style={{
              display: index === currentIndex ? 'block' : 'none', // Show only the current image
            }}
          >
            <img
              src={image.url}
              alt={`carousel ${index}`}
            />
          </div>
        ))}
      </div>
      <img onClick={goToNext} className="carouselButton next-button" src={RightArrow} />
    </div>
  );
};

export default Carousel;
