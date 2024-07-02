import React, { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import './BottomSheet.css';
import '../../pages/authenticate/SignUp/ProfileInfo.css';

function BottomSheet({Content, isBottomSheetOpen, closeBottomSheet, contentProps}) {
  const [{ y, height }, set] = useSpring(() => ({ y: 0, height: window.innerHeight }));
  const bottomSheetRef = useRef(null);
  const openHeight = window.innerHeight; // Bottom Sheet 열림 높이 (px)
  const maxDragUp = -30; // 위로 30px 드래그 가능
  const maxDragDown = openHeight * 0.5; // 아래로 50% 드래그 시 닫힘

  useEffect(() => {
    if (isBottomSheetOpen) {
      set({y: 0, height: window.innerHeight});
    }
  })

  const bind = useDrag(({ last, movement: [, my], memo = y.get() }) => {
    if (last) {
      if (my > maxDragDown) {
        closeBottomSheet();
      } else {
        set({ y: 0, height: openHeight });
      }
    } else {
      const newY = Math.max(my + memo, maxDragUp);
      set({ y: newY, height: openHeight - newY  });
    }
    return memo;
  }, { from: () => [0, y.get()] });

  return (
    <>
      {/* <button onClick={openBottomSheet}>open</button> */}
      {isBottomSheetOpen && <div className="bottom-sheet-overlay" onClick={closeBottomSheet} />}
      <animated.div
        className={`bottom-sheet ${isBottomSheetOpen ? 'open' : ''}`}
        style={{ transform: y.to(y => `translateY(${y}px)`), height }}
        {...bind()}
        ref={bottomSheetRef}
      >
        <div className="bottom-sheet-handle"></div>
        <div className="Profile--content-container">
          <Content contentProps={contentProps}/>
        </div>
      </animated.div>
    </>
  );
}

export default BottomSheet;