export const validateYear = (bornYear) => {
  const yearPattern = /^[0-9]{4}$/;
  return yearPattern.test(bornYear);
};

export const validateMonth = (bornMonth) => {
  const monthPattern = /^(0?[1-9]|1[0-2])$/; // Matches 1-12 with optional leading zero
  return monthPattern.test(bornMonth);
};

export const validateDay = (bornDay) => {
  const dayPattern = /^(0?[1-9]|[12][0-9]|3[01])$/; // Matches 1-31 with optional leading zero
  return dayPattern.test(bornDay);
};

export const validateDateOfBirth = (DOB) => {
  const { year, month, day } = DOB;
  
  return validateYear(year) && validateMonth(month) && validateDay(day);
};