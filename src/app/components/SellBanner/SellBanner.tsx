"use client";
import { ParallaxBanner } from "react-scroll-parallax";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS for animations
import { useEffect } from "react";

const SellBanner = () => {
  // Initialize AOS animation when the component is mounted
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="relative">
      <ParallaxBanner
        layers={[
          { 
            image: '/assets/sell-banner.jpg', 
            speed: -20 
          },
          {
            speed: -15,
            children: (
              <div
                className="absolute inset-0 flex items-center justify-center"
                data-aos="fade-up" // AOS fade-up animation on this div
              >
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
                <div
                  className="relative z-10 text-center text-white px-6 md:px-12"
                  data-aos="fade-up" // AOS fade-up animation for the text block
                >
                  <p className="text-sm uppercase tracking-wide mb-4">
                    From chic dresses to sophisticated accessories
                  </p>
                  <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    Discover Your Style With Our Trendsetting
                    <br />
                    Fashion Which is <span className="text-yellow-400">50% Off</span> Now
                  </h1>
                  <button className="px-8 py-4 bg-white text-black uppercase font-semibold rounded-md hover:bg-gray-300 transition">
                    Shop Now
                  </button>
                </div>
              </div>
            ),
          },
        ]}
        className="h-[70vh] mx-auto"
      />
    </div>
  );
};

export default SellBanner;
