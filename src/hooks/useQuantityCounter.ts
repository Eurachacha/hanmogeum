import { useState } from "react";

const useQuantityCounter = (initQuantity: number, stock: number) => {
  const [quantityInput, setQuantityInput] = useState(initQuantity);
  const [updated, setUpdated] = useState(false);

  const handleQuantityInput = (action: string, event?: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const { value, valueAsNumber } = event.target;
      if (Number.isNaN(value) || value === "") {
        setQuantityInput(0);
        return;
      }
      if (valueAsNumber < 0 || valueAsNumber > stock) return;
      setQuantityInput(valueAsNumber);
      setUpdated(false);
    }
    if (action === "plus") {
      if (quantityInput + 1 <= stock) {
        setQuantityInput(quantityInput + 1);
        setUpdated(false);
      }
    } else if (action === "minus") {
      if (quantityInput - 1 >= 0) {
        setQuantityInput(quantityInput - 1);
        setUpdated(false);
      }
    }
  };

  const setQuantityInputAsStock = (quantity: number) => {
    if (stock < quantity) {
      setQuantityInput(stock);
      setUpdated(true);
    } else setQuantityInput(quantity);
  };

  return { handleQuantityInput, quantityInput, setQuantityInputAsStock, updated };
};

export default useQuantityCounter;
