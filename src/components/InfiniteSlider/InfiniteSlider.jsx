import React, {useRef, useEffect} from "react";
import './InfiniteSlider.css';
import Card from '../Card/Card';

function InfiniteSlider() {
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
  ]

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;
    let isScrolling = false;
    const speed = 1; // Adjust the speed as necessary

    const scroll = () => {
      if (isScrolling) {
        scrollAmount += speed;
        slider.scrollLeft = scrollAmount;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
          scrollAmount = 0;
        }
      }
      requestAnimationFrame(scroll);
    };

    slider.addEventListener('mouseenter', () => {
      isScrolling = false;
    });

    slider.addEventListener('mouseleave', () => {
      isScrolling = true;
    });

    isScrolling = true;
    scroll();

    return () => {
      slider.removeEventListener('mouseenter', () => {
        isScrolling = false;
      });
      slider.removeEventListener('mouseleave', () => {
        isScrolling = true;
      });
    };
  }, []);

  return (
    <div className="Landing--ddg-card-container" ref={sliderRef}>
      {
        data.map(function(element, i) {
          return (
            <div className="Landing--ddg-card-animation">
              <Card key={i} data={element} index={i}/>
            </div>
          )
        })
      }
      {
        data.map(function(element, i) {
          return (
            <div className="Landing--ddg-card-animation" key={`duplicate-${i}`}>
              <Card key={i} data={element} index={i}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default InfiniteSlider;