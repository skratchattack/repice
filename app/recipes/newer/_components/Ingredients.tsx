"use client";
import { useForm } from "react-hook-form";
import styles from "./Ingredients.module.css";
import { IoMdAddCircle } from "react-icons/io";


interface Ingredient {
  id: string;
  ingredientName: string;
  ingredientAmount: number;
  ingredientMeasurementUnit: string;
}

interface IngredientComponentProps {
  onIngredientSubmit: (data: Ingredient) => void;
}

const IngredientComponent = ({ onIngredientSubmit }: IngredientComponentProps) => {
  const { register, handleSubmit } = useForm<Ingredient>();

  const appendIngredient = (data: Ingredient) => {
    onIngredientSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(appendIngredient)} className={styles.ingredientWrap}>
      <div>
        <label htmlFor="ingredientName">Ingredient Name</label>
        <input type="text" className={styles.ingredientName} {...register("ingredientName")} />
      </div>
      <div>
        <label htmlFor="ingredientAmount">Amount</label>
        <input type="number" className={styles.ingredientAmount} {...register("ingredientAmount")} />
      </div>
      <div>
        <label htmlFor="ingredientUnit">Unit</label>
        <input type="text" className={styles.ingredientUnit} {...register("ingredientMeasurementUnit")} />
      </div>
      <button type="submit" ><IoMdAddCircle size={23} className={styles.addButton} /></button>
    </form>
  );
};

export default IngredientComponent;


