import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImgCarousel = () => {
  return (
    <Carousel className="img-carousel" autoPlay infiniteLoop>
      <div>
        <img src="src/assets/carousel/img1.jpg" alt="Image 1"></img>
      </div>
      <div>
        <img src="src/assets/carousel/img2.jpg" alt="Image 2"></img>
      </div>
      <div>
        <img src="src/assets/carousel/img3.jpg" alt="Image 3"></img>
      </div>
      <div>
        <img src="src/assets/carousel/img4.jpg" alt="Image 4"></img>
      </div>
    </Carousel>
  );
};

export default ImgCarousel;
