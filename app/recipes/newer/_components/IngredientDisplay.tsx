"use client";
import styles from "./IngredientDisplay.module.css";
import { useState, useEffect } from "react";
import { DragDropContext, Draggable } from "@hello-pangea/dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import IngredientComponent from "./Ingredients";
import { v4 as uuidv4 } from "uuid";
import { MdDragIndicator } from "react-icons/md";
import { TiDelete } from "react-icons/ti";


interface Ingredient {
  id: string;
  ingredientName: string;
  ingredientAmount: number;
  ingredientMeasurementUnit: string;
}

const IngredientDisplay = () => {
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [order, setOrder] = useState(ingredientList);

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

  const addIngredient = (newIngredient: Ingredient) => {
    const ingredientWithId = {
      ...newIngredient,
      id: uuidv4(),
    };

    setIngredientList((prevList) => [...prevList, ingredientWithId]);
  };

  return (
    <div className={styles.ingredientListContainer}>
      <IngredientComponent onIngredientSubmit={addIngredient} />
      <h2>Ingredients</h2>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <StrictModeDroppable droppableId="ingredients">
          {(provided) => (
            <ul className={styles.ingredientList} {...provided.droppableProps} ref={provided.innerRef}>
              {order.map((ingredient, index) => (
                <Draggable key={ingredient.id} draggableId={ingredient.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      key={ingredient.id}
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
                      <input type="text" defaultValue={ingredient.ingredientName} className={styles.ingredientName} />
                      <input type="number" defaultValue={ingredient.ingredientAmount} className={styles.ingredientAmount} />
                      <input
                        type="text"
                        defaultValue={ingredient.ingredientMeasurementUnit}
                        className={styles.ingredientUnits}
                      />
                      <div className={styles.buttons}>
                        {!snapshot.isDragging && (
                          <button
                            className={styles.deleteButton}
                            onClick={() => {
                              setIngredientList(
                                ingredientList.filter((ingredientItem) => ingredientItem.id !== ingredient.id)
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
    </div>
  );
};

export default IngredientDisplay;
