export const validateYear = (bornYear) => {
  const yearPattern = /^[0-9]{4}$/;
  return bornYear && yearPattern.test(bornYear);
};

export const validateMonth = (bornMonth) => {
  const monthPattern = /^(0[1-9]|1[0-2])$/; // Matches 01-12 for month
  return bornMonth && monthPattern.test(bornMonth);
};

export const validateDay = (bornDay) => {
  const dayPattern = /^(0[1-9]|[12][0-9]|3[01])$/; // Matches 01-31 for day
  return bornDay && dayPattern.test(bornDay);
};

export const validateDateOfBirth = ({ bornYear, bornMonth, bornDay }) => {
  return validateYear(bornYear) && validateMonth(bornMonth) && validateDay(bornDay);
};