"use client";
import React, { useEffect, useRef, useState } from 'react';

const timelineData = [
  { year: 2013, milestone: 'Octoze Technologies begins with 4 employees' },
  { year: 2014, milestone: 'Camu launches with the first customer going live' },
  { year: 2015, milestone: 'Adds customers in Malaysia and Thailand, introduces mobile app' },
  { year: 2016, milestone: 'Adds customers in Dubai, taking user base to 100,000+, introduces Outcome Based Education and Choice Based Credit System' },
  { year: 2017, milestone: 'User base exceeds 500,000+' },
  { year: 2018, milestone: 'Establishes presence in Africa by signing Ashesi University, the No. 1 University in Ghana and among the world\'s top 400 universities' },
  { year: 2019, milestone: 'Signs up Deshpande Education Trust, India\'s premier NGO with a focus on Skill Development' },
  { year: 2020, milestone: 'Launches Virtual Classroom, user base exceeds 1 million mark with 550+ institutions across 12 countries' },
  { year: 2021, milestone: 'Enters UAE market' },
  { year: 2022, milestone: 'Launches LMS 2.0 and enters Thailand and Hong Kong' },
  { year: 2024, milestone: 'Enters Cambodia and Australia markets, launches CamuEngage, a skilling platform for HigherEd' },
  { year: 2025, milestone: 'Introduces AI capabilities in the product' },
];

const Timeline = () => {
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const [showNextSection, setShowNextSection] = useState(false);
  let animationFrameId = null;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !timelineRef.current) return;

      // Cancel any existing animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Request new animation frame for smooth updates
      animationFrameId = requestAnimationFrame(() => {
        const container = containerRef.current;
        const timeline = timelineRef.current;

        // Calculate the scroll position
        const scrollTop = window.scrollY;
        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calculate the scroll progress (0 to 1) within the container
        const scrollProgress = Math.min(
          Math.max((scrollTop - containerTop) / (containerHeight - windowHeight), 0),
          1
        );

        // Show next section when timeline is complete
        if (scrollProgress >= 0.99) {
          setShowNextSection(true);
        } else {
          setShowNextSection(false);
        }

        // Calculate the total width of the timeline content
        const timelineWidth = timeline.scrollWidth;
        const viewportWidth = window.innerWidth;

        // Calculate the maximum scrollable distance, adjusted to avoid extra space
        const maxScroll = timelineWidth - viewportWidth - parseFloat(getComputedStyle(timeline).paddingLeft) || 0;

        // Ultra-smooth translation with easing
        const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress); // Ease-out cubic for smoother end
        const translateX = -easedProgress * maxScroll;
        timeline.style.transform = `translateX(${translateX}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Set initial position to start with 2013
    timelineRef.current.style.transform = `translateX(0px)`;

    // Initial call to set the position
    handleScroll();

    // Cleanup event listener and animation frame on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      <div className="min-h-[400vh] bg-white" ref={containerRef}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden relative">
          <div
            ref={timelineRef}
            className="flex items-center transition-transform duration-200 ease-out absolute left-0" 
            // style={{ 
            //   paddingLeft: '310vw', 
            //   paddingRight: '0', 
            // }}
          >
            {/* Horizontal Line */}
            <div className="absolute h-[2px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 top-1/2 transform -translate-y-1/2 left-0 right-0 shadow-2xl"></div>

            {/* Timeline Items */}
            {timelineData.map((item, index) => {
              const isOdd = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="timeline-item flex flex-col items-center mx-16 sm:mx-20 md:mx-24 lg:mx-32 xl:mx-40 relative"
                  style={{ minWidth: '10rem' }} // Consistent width for each item
                >
                  {/* Circle Marker */}
                  {/* <div className="circle-marker absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white z-10 shadow-xl" style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}></div> */}

                  <div className='absolute top-[31px] transform -translate-y-1/2'>
                    <img src="/milestone_down.svg" alt="milestone" className={`${
                      isOdd ? 'rotate-180 -mt-[106px]' : 'rotate-0'
                    }`} />
                  </div>

                  {/* Year */}
                  <div
                    className={`year-text absolute poppins_700_20_30 ${
                      isOdd ? 'top-12' : 'bottom-12'
                    } transform ${isOdd ? '-translate-y-4' : 'translate-y-4'}`}
                  >
                    {item.year}
                  </div>

                  {/* Milestone */}
                  <div
                    className={`milestone-text absolute poppins_600_16_24 text-center text-gray-700 w-64 sm:w-72 md:w-80 ${
                      isOdd ? 'bottom-32' : 'top-32'
                    } transform ${isOdd ? 'translate-y-4' : '-translate-y-4'}`}
                  >
                    {item.milestone}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;