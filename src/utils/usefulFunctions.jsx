import React from "react";
import { useNavigate } from "react-router-dom";


export const handleCopyClipBoard = async (text) => {
	try {
		await navigator.clipboard.writeText(text);
		alert("클립보드에 링크가 복사되었어요.");
	} catch (err) {
		console.log(err);
	}
};

export const useGoBack = () => {
  const navigate = useNavigate();

  return () => {
    navigate(-1); // 이전 페이지로 이동
  };

}