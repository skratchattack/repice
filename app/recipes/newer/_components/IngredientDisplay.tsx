"use client";
import styles from "./IngredientDisplay.module.css";
import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Draggable } from "@hello-pangea/dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import IngredientComponent from "./Ingredients";
import { RecipeForm } from "@/models/Recipe";
import { MdDragIndicator } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { useForm } from "react-hook-form";

const IngredientDisplay = () => {
  const [ingredientList, setIngredientList] = useState<RecipeForm[]>([]);
  const [order, setOrder] = useState(ingredientList);
  const { register, handleSubmit, control, getValues } = useForm<RecipeForm>();

  useEffect(() => {
    setOrder(ingredientList);
  }, [ingredientList]);

  useEffect(() => {
    console.log("Updated Order:", order);
  }, [order]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(order);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setOrder(items);
  }

  const addIngredient = (newIngredient: RecipeForm) => {
    setIngredientList([...ingredientList, newIngredient]);
  };

  return (
    <div className={styles.ingredientListContainer}>
      <h2>Ingredients</h2>
      <form>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <StrictModeDroppable droppableId="ingredients">
            {(provided) => (
              <ul className={styles.ingredientList} {...provided.droppableProps} ref={provided.innerRef}>
                {order.map((ingredient, index) => (
                  <Draggable
                    key={ingredient.ingredients[index].id}
                    draggableId={ingredient.ingredients[index].id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        key={ingredient.ingredients[index].id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${
                          snapshot.isDragging ? styles.ingredientListItemBeingDragged : styles.ingredientListItem
                        }`}
                      >
                        <div className={styles.buttons}>
                          <MdDragIndicator size={23} />
                        </div>
                        <input
                          type="text"
                          defaultValue={ingredient.ingredients[index].ingredientName}
                          className={styles.ingredientName}
                        />
                        <input
                          type="number"
                          defaultValue={ingredient.ingredients[index].ingredientAmount}
                          className={styles.ingredientAmount}
                        />
                        <input
                          type="text"
                          defaultValue={ingredient.ingredients[index].ingredientMeasurementUnit}
                          className={styles.ingredientUnits}
                        />
                        <div className={styles.buttons}>
                          {!snapshot.isDragging && (
                            <button
                              className={styles.deleteButton}
                              onClick={() => {
                                setIngredientList(
                                  ingredientList.filter(
                                    (ingredientItem) =>
                                      ingredientItem.ingredients[index].id !== ingredient.ingredients[index].id
                                  )
                                );
                              }}
                              type="button"
                            >
                              <TiDelete size={21} className={styles.deleteIcon} />
                            </button>
                          )}
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </form>
    </div>
  );
};

export default IngredientDisplay;
