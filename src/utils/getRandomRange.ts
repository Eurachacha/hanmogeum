interface getRandomRangeProps {
  min: number;
  max: number;
}

const getRandomRange = ({ min, max }: getRandomRangeProps) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default getRandomRange;
