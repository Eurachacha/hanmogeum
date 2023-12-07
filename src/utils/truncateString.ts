interface TruncateStringProps {
  fullString: string;
  maxLength: number;
}

/**
 *  긴 문자열을 특정 길이로 제한하고, 초과하는 부분을 "..." (세 개의 점)으로 대체하는 유틸리티 함수
 * @param param0
 * @returns
 */
const truncateString = ({ fullString, maxLength }: TruncateStringProps): string => {
  if (fullString.length <= maxLength) {
    return fullString;
  }
  return `${fullString.substring(0, maxLength - 3)}...`;
};
export default truncateString;
