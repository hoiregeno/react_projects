import { useRef, useEffect } from "react";
import {
  ImgOne,
  ImgTwo,
  ImgThree,
  ImgFour,
  NextIcon,
  PrevIcon,
} from "../assets/index";
import "../styles/ImageSlider.css";

const ImageSlider = () => {
  const intervalIdRef = useRef(null);
  const slideIndexRef = useRef(0); // tracks the current slide without causing re-renders.
  const slidesRef = useRef([]); // stores DOM nodes of the slides for direct manipulation.

  // Initializes slides and sets up the auto-slide interval.
  useEffect(() => {
    slidesRef.current = document.querySelectorAll(".slide");
    slidesRef.current[0].classList.add("show"); // Show the first slide.

    intervalIdRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalIdRef.current);
  }, []);

  // Displays a specific slide when given an index
  const displaySlide = (index) => {
    slidesRef.current.forEach((slide) => slide.classList.remove("show"));
    slidesRef.current[index].classList.add("show");
  };

  // Moves to the next slide.
  const nextSlide = () => {
    slideIndexRef.current =
      (slideIndexRef.current + 1) % slidesRef.current.length;
    displaySlide(slideIndexRef.current);
  };

  // Moves to the previous slide.
  const prevSlide = () => {
    slideIndexRef.current =
      (slideIndexRef.current - 1 + slidesRef.current.length) %
      slidesRef.current.length;
    displaySlide(slideIndexRef.current);
  };

  return (
    <div className="slider">
      <div className="slides">
        <img src={ImgOne} className="slide" alt="image 1" />
        <img src={ImgTwo} className="slide" alt="image 2" />
        <img src={ImgThree} className="slide" alt="image 3" />
        <img src={ImgFour} className="slide" alt="image 4" />
      </div>

      <button
        onClick={prevSlide}
        className="prev-btn"
        aria-label="previous button"
      >
        <PrevIcon width="32" height="32" fill="hsl(180, 100%, 60%)" />
      </button>

      <button onClick={nextSlide} className="next-btn" aria-label="next button">
        <NextIcon width="32" height="32" fill="hsl(180, 100%, 60%)" />
      </button>
    </div>
  );
};

export default ImageSlider;
