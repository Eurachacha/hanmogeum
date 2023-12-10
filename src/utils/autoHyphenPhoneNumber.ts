const autoHyphenPhoneNumber = (rawString: string) => {
  const numberString: string = rawString.replace(/[^0-9]/g, "");
  let result = "";
  if (numberString.length < 4) {
    return numberString;
  }
  if (numberString.length < 7) {
    result += numberString.substring(0, 3);
    result += "-";
    result += numberString.substring(3);
    return result;
  }
  if (numberString.length < 11) {
    result += numberString.substring(0, 3);
    result += "-";
    result += numberString.substring(3, 6);
    result += "-";
    result += numberString.substring(6);
    return result;
  }
  result += numberString.substring(0, 3);
  result += "-";
  result += numberString.substring(3, 7);
  result += "-";
  result += numberString.substring(7);
  return result;
};

export default autoHyphenPhoneNumber;
