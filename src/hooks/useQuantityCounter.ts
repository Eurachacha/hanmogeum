import { useState } from "react";

const useQuantityCounter = (initQuantity: number, stock: number) => {
  const [quantityInput, setQuantityInput] = useState(initQuantity);

  const handleQuantityInput = (action: string, event?: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const { value, valueAsNumber } = event.target;
      if (Number.isNaN(value) || value === "") {
        setQuantityInput(0);
        return;
      }
      if (valueAsNumber < 0 || valueAsNumber > stock) return;
      setQuantityInput(valueAsNumber);
    }
    if (action === "plus") {
      if (quantityInput + 1 <= stock) {
        setQuantityInput(quantityInput + 1);
      }
    } else if (action === "minus") {
      if (quantityInput - 1 >= 0) {
        setQuantityInput(quantityInput - 1);
      }
    }
  };

  const setQuantityInputAsStock = (quantity: number) => {
    if (stock < quantity) {
      setQuantityInput(stock);
    } else setQuantityInput(quantity);
  };

  return { handleQuantityInput, quantityInput, setQuantityInputAsStock };
};

export default useQuantityCounter;
