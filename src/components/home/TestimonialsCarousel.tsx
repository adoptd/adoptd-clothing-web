'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "I’M REALLY GLAD I FOUND ADOPTD CHRISTIAN CLOTHING. THE T-SHIRT I BOUGHT IS MORE THAN JUST SOMETHING TO WEAR — IT’S A SIMPLE, MEANINGFUL WAY TO SHARE MY FAITH. I LOVE THAT THE MESSAGE ON IT SERVES AS A GENTLE REMINDER FOR ANYONE WHO SEES IT TO THINK ABOUT GOD AND JESUS. IT’S SUBTLE, POSITIVE, AND EXACTLY THE KIND OF WAY I WANT TO SPREAD HOPE AND FAITH IN EVERYDAY LIFE.",
    author: 'PAUL KERSHAW',
  },
  {
    id: '2',
    quote: "THE QUALITY OF THE HEAVYWEIGHT HOODIE EXCEEDED ALL MY EXPECTATIONS. IT’S COMFORTABLE, INCREDIBLY WELL-CRAFTED, AND HAS ALREADY SPARKED GENUINE CONVERSATIONS ABOUT SCRIPTURE WITH FRIENDS AND STRANGERS ALIKE. TRULY CLOTHING WITH A PURPOSE!",
    author: 'SARAH JENKINS',
  },
  {
    id: '3',
    quote: "I PURCHASED THE TOTE BAGS FOR OUR CHURCH MINISTRY TEAM. THE ORGANIC CANVAS IS THICK AND DURABLE, AND THE MINIMALIST FAITH DESIGN LOOKS STUNNING. IT’S A REAL BLESSING TO SUPPORT AN INDEPENDENT FAITH-LED BRAND.",
    author: 'DAVID & RACHEL M.',
  },
  {
    id: '4',
    quote: "FINDING CHRISTIAN STREETWEAR IN THE UK THAT COMBINES MODERN STYLE WITH UNCOMPROMISING GOSPEL TRUTH IS RARE. ADOPTD NAILED THE BALANCE. FAST DISPATCH AND EXCEPTIONAL ATTENTION TO DETAIL.",
    author: 'JAMES T.',
  },
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  // Auto-advance every 8 seconds unless paused by mouse hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const current = testimonials[currentIndex];

  return (
    <div
      className="relative max-w-6xl xl:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Teal Quote Circle */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00736a] rounded-full flex items-center justify-center mx-auto shadow-md mb-8">
        <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
      </div>

      {/* Main Carousel View Area with Left/Right Navigation */}
      <div className="relative flex items-center justify-between gap-4 sm:gap-8 lg:gap-12">
        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous testimony"
          className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white shadow-sm"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Testimonial Quote Content */}
        <div className="flex-1 text-center min-h-[180px] sm:min-h-[160px] lg:min-h-[180px] flex flex-col justify-center px-2 sm:px-6">
          <blockquote className="text-white text-base sm:text-xl md:text-2xl lg:text-[28px] font-extrabold leading-relaxed uppercase tracking-wide transition-opacity duration-300">
            {current.quote}
          </blockquote>
          <p className="mt-5 text-white/95 text-sm sm:text-base md:text-lg lg:text-xl font-black tracking-widest uppercase">
            — {current.author}
          </p>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          aria-label="Next testimony"
          className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white shadow-sm"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Pagination Indicators / Dots */}
      <div className="flex items-center justify-center space-x-3 pt-8 sm:pt-10">
        {testimonials.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to testimony ${idx + 1}`}
            className={`transition-all duration-300 rounded-full focus:outline-none ${
              idx === currentIndex
                ? 'w-8 sm:w-10 h-3 bg-white'
                : 'w-3 h-3 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
