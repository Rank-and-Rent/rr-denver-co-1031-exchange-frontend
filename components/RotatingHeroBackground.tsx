"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/hero-images/denver-1.jpg",
  "/hero-images/denver-2.jpg",
  "/hero-images/denver-3.jpg",
];

export function RotatingHeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Denver, Colorado ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}
      {/* Warm brown overlay for luxury aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#785530]/70 via-[#785530]/60 to-[#4A3520]/80" />
    </div>
  );
}


