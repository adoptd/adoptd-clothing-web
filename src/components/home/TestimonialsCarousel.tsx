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
      className="relative max-w-5xl mx-auto px-4 sm:px-8 py-4 sm:py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Teal Quote Circle */}
      <div className="w-14 h-14 bg-[#00736a] rounded-full flex items-center justify-center mx-auto shadow-sm mb-6">
        <Quote className="w-7 h-7 text-white fill-white" />
      </div>

      {/* Main Carousel View Area with Left/Right Navigation */}
      <div className="relative flex items-center justify-between gap-3 sm:gap-6">
        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous testimony"
          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white/80"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Testimonial Quote Content */}
        <div className="flex-1 text-center min-h-[160px] sm:min-h-[140px] flex flex-col justify-center px-2 sm:px-6">
          <blockquote className="text-white text-xs sm:text-sm md:text-base font-extrabold leading-relaxed uppercase tracking-wide transition-opacity duration-300">
            {current.quote}
          </blockquote>
          <p className="mt-3 text-white/90 text-xs sm:text-sm font-black tracking-widest uppercase">
            — {current.author}
          </p>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          aria-label="Next testimony"
          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white/80"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Pagination Indicators / Dots */}
      <div className="flex items-center justify-center space-x-2.5 pt-6">
        {testimonials.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to testimony ${idx + 1}`}
            className={`transition-all duration-300 rounded-full focus:outline-none ${
              idx === currentIndex
                ? 'w-7 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
