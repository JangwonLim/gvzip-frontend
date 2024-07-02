import React, { useState, useRef, useEffect } from "react";
import './MobileSlider.css';
import '../../styles/defaultDesign.css';
import Card from "../Card/Card";

function MobileSlider() {
  const data = [
    {
      korName: "김지민",
      engName: "Jimin Kim",
      campus: "음성",
      isAlumni: true,
      generation: 16,
    },
    {
      korName: "임장원",
      engName: "Jangwon Lim",
      campus: "음성",
      isAlumni: true,
      generation: 15,
    },
    {
      korName: "박정민",
      engName: "Jeongmin Park",
      campus: "음성",
      isAlumni: true,
      generation: 15,
    },
    {
      korName: "김다현",
      engName: "Dahyun Kim",
      campus: "음성",
      isAlumni: true,
      generation: 15,
    },
    {
      korName: "이동욱",
      engName: "Dongwook Lee",
      campus: "음성",
      isAlumni: true,
      generation: 14,
    },
    {
      korName: "이다빈",
      engName: "Dabin Lee",
      campus: "음성",
      isAlumni: true,
      generation: 15,
    },
    {
      korName: "정경민",
      engName: "Kyungmin Jeong",
      campus: "음성",
      isAlumni: true,
      generation: 14,
    },
    {
      korName: "이호리",
      engName: "Hori Lee",
      campus: "음성",
      isAlumni: true,
      generation: 18
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(1);
  const [realIndex, setRealIndex] = useState(1);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);
  
  const totalSlides = data.length;
  const moveDistance = 50;

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(totalSlides);
      setRealIndex(totalSlides);
    } else if (currentIndex === totalSlides + 1) {
      setCurrentIndex(1);
      setRealIndex(1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      sliderRef.current.style.transition = 'none';
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    } else {
      sliderRef.current.style.transition = 'transform 0.5s ease';
    }
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    if (currentIndex === 0) {
      setRealIndex(totalSlides);
    } else if (currentIndex === totalSlides + 1) {
      setRealIndex(1);
    } else {
      setRealIndex(currentIndex);
    }
  }, [currentIndex, totalSlides]);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;

    const touchX = e.touches[0].clientX;
    const distance = startX.current - touchX;

    if (distance > moveDistance) {
      handleNext();
      isDragging.current = false;
    } else if (distance < -moveDistance) {
      handlePrev();
      isDragging.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  return(
    <>
      <div className="MobileSlider--page-container">
        <div className="MobileSlider--page-wrapper">
          <span className="b2-12-sb">
            <span style={{color: 'white'}}>{realIndex}</span> | {totalSlides}
          </span>
        </div>
      </div>
      
      <div 
        className="MobileSlider--container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
        className="MobilSlider--wrapper"
        ref={sliderRef}
        onTransitionEnd={handleTransitionEnd}
        style={{ transform: `translateX(-${currentIndex * 100}%)`}}
        >
          <div className="MobileSlider--card">
            <Card data={data[totalSlides - 1]} />
          </div>
          {
            data.map(function(element, i) {
              return (
                <div className="MobileSlider--card">
                  <Card key={i} data={element} index={i}/>
                </div>
              )
            })
          }
          <div className="MobileSlider--card">
            <Card data={data[0]} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileSlider;