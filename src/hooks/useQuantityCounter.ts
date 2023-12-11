import { useState } from "react";

const useQuantityCounter = (stock: number) => {
  const [quantityInput, setQuantityInput] = useState(1);

  const handleQuantityInput = (action: string, event?: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const { value, valueAsNumber } = event.target;
      if (Number.isNaN(value) || value === "") {
        setQuantityInput(0);
        return;
      }
      if (valueAsNumber < 1 || valueAsNumber > stock) return;
      setQuantityInput(valueAsNumber);
    }
    if (action === "plus") {
      if (quantityInput + 1 <= stock) {
        setQuantityInput(quantityInput + 1);
      }
    } else if (action === "minus") {
      if (quantityInput - 1 > 0) {
        setQuantityInput(quantityInput - 1);
      }
    }
  };

  return { handleQuantityInput, quantityInput };
};

export default useQuantityCounter;
