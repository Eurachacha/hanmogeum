const isValidPhoneNumber = (rawNumber: string) => {
  const regex = /^(010|011|016|017|018|019)-?([0-9]{3,4})-?([0-9]{4})$/;
  return regex.test(rawNumber);
};
export default isValidPhoneNumber;
