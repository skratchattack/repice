"use client";
import styles from "./Ingredients.module.css";
import { IoMdAddCircle } from "react-icons/io";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { RecipeForm } from "@/models/Recipe";

interface IngredientComponentProps {
  onIngredientSubmit: (data: RecipeForm) => void;
}

const IngredientComponent = ({ onIngredientSubmit }: IngredientComponentProps) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const newIngredient: RecipeForm = {
      ingredients: [
        {
          id: uuidv4(),
          ingredientName: ingredientNameRef.current?.value || "",
          ingredientAmount: ingredientAmountRef.current?.value || "",
          ingredientMeasurementUnit: ingredientUnitRef.current?.value || "",
        },
      ],
    };
    appendIngredient(newIngredient);
  };

  const ingredientNameRef = useRef<HTMLInputElement>(null);
  const ingredientAmountRef = useRef<HTMLInputElement>(null);
  const ingredientUnitRef = useRef<HTMLInputElement>(null);

  const appendIngredient = (data: RecipeForm) => {
    onIngredientSubmit(data);
  };

  return (
    <div className={styles.ingredientWrap}>
      <div>
        <label htmlFor="ingredientName">Ingredient Name</label>
        <input type="text" className={styles.ingredientName} ref={ingredientNameRef} />
      </div>
      <div>
        <label htmlFor="ingredientAmount">Amount</label>
        <input type="number" className={styles.ingredientAmount} ref={ingredientAmountRef} />
      </div>
      <div>
        <label htmlFor="ingredientUnit">Unit</label>
        <input type="text" className={styles.ingredientUnit} ref={ingredientUnitRef} />
      </div>
      <button type="button" onClick={handleButtonClick}>
        <IoMdAddCircle size={23} className={styles.addButton} />
      </button>
    </div>
  );
};

export default IngredientComponent;
