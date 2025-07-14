import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const CarouselBanner = () => {
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1484327973588-c31f829103fe?w=1440&auto=format&fit=crop&q=60",
      title: "New Arrivals",
      description: "Explore the latest trends & exclusive collections.",
      link: "/shop",
    },
    {
      img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1440&auto=format&fit=crop&q=60",
      title: "Winter Collection",
      description: "Stay warm and stylish with our new winter collection.",
      link: "/shop",
    },
    {
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1440&auto=format&fit=crop&q=60",
      title: "Luxury Fashion",
      description: "Premium quality and elegant designs for every occasion.",
      link: "/shop",
    },
  ];

  return (
    <div className="relative">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={4000}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40">
              <h1 className="text-white text-5xl font-semibold">{slide.title}</h1>
              <p className="text-white text-lg mt-4">{slide.description}</p>
              <Link
                to={slide.link}
                className="mt-6 px-6 py-3 bg-white text-black font-medium text-lg hover:bg-gray-200"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselBanner;
