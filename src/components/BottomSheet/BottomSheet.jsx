import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import './BottomSheet.css';
import '../../pages/authenticate/SignUp/ProfileInfo.css';

function BottomSheet({ Content, isBottomSheetOpen, closeBottomSheet, contentProps, onClickFilterOptions, resetFilter }) {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const openHeight = viewportHeight * 0.88; // Bottom Sheet 열림 높이 (px), 88% 높이 사용
  const [{ y }, set] = useSpring(() => ({ y: viewportHeight }));
  const bottomSheetRef = useRef(null);
  const maxDragUp = -5; // 위로 5px 드래그 가능
  const dragThreshold = 10; // 드래그로 인식할 최소 거리

  useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.innerHeight;
      setViewportHeight(vh);
      if (isBottomSheetOpen) {
        set({ y: vh * 0.12 });
      } else {
        set({ y: vh });
      }
    };

    window.addEventListener('resize', updateViewportHeight);
    updateViewportHeight(); // 초기 실행

    return () => window.removeEventListener('resize', updateViewportHeight);
  }, [isBottomSheetOpen, set]);

  const bind = useDrag(({ down, movement: [, my], memo = y.get() }) => {
    if (down) {
      const newY = Math.max(my + memo, maxDragUp); // 위로 5px만 드래그 가능
      set({ y: newY });
    } else {
      if (my > viewportHeight * 0.5) {
        closeBottomSheet();
      } else {
        set({ y: viewportHeight * 0.12 });
      }
    }
    return memo;
  }, { from: () => [0, y.get()], threshold: dragThreshold });

  return (
    <>
      {isBottomSheetOpen && <div className="bottom-sheet-overlay" onClick={closeBottomSheet} />}
      <animated.div
        className={`bottom-sheet ${isBottomSheetOpen ? 'open' : ''}`}
        style={{ transform: y.to(y => `translateY(${y}px)`), height: openHeight }}
        {...bind()}
        ref={bottomSheetRef}
      >
        <div className="bottom-sheet-handle"></div>
        <div className="Profile--content-container">
          <Content 
            contentProps={contentProps} 
            onClickFilterOptions={onClickFilterOptions}
            resetFilter={resetFilter}
          />
        </div>
      </animated.div>
    </>
  );
}

export default BottomSheet;