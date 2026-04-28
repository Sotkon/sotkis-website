import React, { useState, useEffect, type ReactNode } from 'react';
import './MobileCarousel.css';

export interface MobileCarouselProps {
  children: ReactNode[];
  className?: string;
  mobileBreakpoint?: number;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({
  children,
  className = '',
  mobileBreakpoint = 768,
  currentIndex: controlledIndex,
  onIndexChange,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const childArray = React.Children.toArray(children);

  const goToSlide = (index: number) => {
    if (isControlled) onIndexChange?.(index);
    else setInternalIndex(index);
  };

  const goToPrevious = () => {
    const prevIndex = activeIndex > 0 ? activeIndex - 1 : childArray.length - 1;
    goToSlide(prevIndex);
  };

  const goToNext = () => {
    const nextIndex = activeIndex < childArray.length - 1 ? activeIndex + 1 : 0;
    goToSlide(nextIndex);
  };

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className={`mobile-carousel ${className}`}>
      <div className="mobile-carousel__container">
        <div className="mobile-carousel__slide">
          {childArray[activeIndex]}
        </div>
        <div className="mobile-carousel__navigation">
          <div className="mobile-carousel__dots-container">
            {childArray.map((_, index) => (
              <button
                key={index}
                className={`mobile-carousel__dot ${index === activeIndex ? 'mobile-carousel__dot--active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="mobile-carousel__arrows">
            <button
              onClick={goToPrevious}
              className="mobile-carousel__arrow-button mobile-carousel__arrow-button--left"
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="mobile-carousel__arrow-button mobile-carousel__arrow-button--right"
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
