"use client";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import Button from "@/components/ui/Button";

interface Slide {
  image: string;
  title: string;
  subtitle?: string;
  category?: string;
  date?: string;
}

interface BackgroundSliderProps {
  slides: Slide[];
  duration?: number;
  zoomScale?: number;
  className?: string;
}

export default function BackgroundSlider({
  slides,
  duration = 5000,
  zoomScale = 1.1,
  className = "",
}: BackgroundSliderProps) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [textVisible, setTextVisible] = useState(true);

  const [scale, setScale] = useState(1);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    setScale(1);
    const start = performance.now();

    function animate(t: number) {
      const elapsed = t - start;
      if (elapsed < duration) {
        const newScale = 1 + ((zoomScale - 1) * elapsed) / duration;
        setScale(newScale);
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        setScale(zoomScale);
      }
    }
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [current, duration, zoomScale]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false);

      setTimeout(() => {
        setPrevious(current);
        setCurrent((prev) => (prev + 1) % slides.length);
        setTextVisible(true);
      }, 500);
    }, duration);

    return () => clearInterval(interval);
  }, [current, duration, slides.length]);

  return (
    <div className={` relative w-full h-screen overflow-hidden  ${className}`}>
      {previous !== null && (
        <div
          key={previous}
          className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
          style={{
            backgroundImage: `url(${slides[previous].image})`,
            opacity: 0,
            transform: `scale(${zoomScale})`,
          }}
        />
      )}

      <div
        key={current}
        className="absolute inset-0 bg-cover bg-center z-10 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${slides[current].image})`,
          opacity: 1,
          transform: `scale(${scale})`,
        }}
      />

      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 to-black/10" />

      <div
        className={clsx(
          "absolute inset-0 z-30 flex flex-col justify-end px-3 md:px-60 pb-30 md:pb-8 white-text transition-opacity duration-700 ease-in-out",
          textVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {slides[current].category && (
          <div className="uppercase tracking-widest white-text text-lg md font-semibold mb-2">
            <span className="mr-2">•</span>
            {slides[current].category}
          </div>
        )}

        <div
          className={clsx(
            "transition-all duration-1000 ease-out",
            textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <h1 className="heading font-bold">{slides[current].title}</h1>
        </div>

        {slides[current].subtitle && (
          <p className="mt-4 text-lg md:text-2xl">{slides[current].subtitle}</p>
        )}

        <div className="mt-6">
          <Button variant="darkPrimary" className="text-xl font-semibold px-10">
            Read it now
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 z-50 flex items-center justify-between w-full wrapper ">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setPrevious(current);
                setCurrent(index);
                setTextVisible(true);
              }}
              className={clsx(
                "w-8 h-8 rounded-full transition",
                index === current ? "bg-white" : "bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>
        <div>
          {slides[current].date && (
            <time className="white-text uppercase text-lg md:text-4xl">
              {new Date(slides[current].date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </div>
    </div>
  );
}
