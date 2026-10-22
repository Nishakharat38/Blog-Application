import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroImg from "../assets/image.png.gif";

const Hero = () => {
  return (
    <div className="px-7 md:px-0 mt-0 pt-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center h[100px] md:my-0">
        {/* Text Section */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Explore the Latest Tech & Web Trends
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-6">
            Stay ahead with in-death article, tutorials, and insights on web
            development, digital marketing, and text innovations.
          </p>
          <div className="flex space-x-4">
            <Link to={'/dashboard/write-blog'}>
              <Button className="text-lg mb-4">Get Started</Button>
            </Link>
            <Link to={'/about'}>
              <Button
                variant="outline"
                className="border-white px-6 py-3 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        {/* Image Section */}
        <div className="flex items-center justify-center mb-3">
          <img src={heroImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
