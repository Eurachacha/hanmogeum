const autoHyphenPhoneNumber = (rawString: string) => {
  const phone = rawString.replace(/[^0-9]/g, ""); // 숫자가 아닌 문자 제거
  const phoneLength = phone.length;

  if (phoneLength < 4) {
    return phone;
  }
  if (phoneLength < 7) {
    return phone.replace(/(\d{3})(\d+)/, "$1-$2");
  }
  if (phoneLength < 11) {
    return phone.replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  }
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

export default autoHyphenPhoneNumber;
