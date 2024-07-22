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
    navigate(-1); // go back to the previous page
  };

}

export const calculateGeneration = (campus, graduationYear) => {
	console.log(campus, graduationYear)
	switch (campus) {
		case "음성":
			return parseInt(graduationYear) - 2005;
		case "문경":
			return parseInt(graduationYear) - 2013;
		case "미국":
			return parseInt(graduationYear) - 2016;
		default:
			return 0;
	}
}

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
	console.log(document.cookie);
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const isLoggedIn = () => {
  const sessionId = getCookie('JSESSIONID');
  return sessionId !== undefined;
}