"use client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import { StrictModeDroppable } from "./StrictModeDroppable";

const DndPage = ({ recipes }) => {
  const [recipeTitles, updateRecipeTitles] = useState(recipes);
 


  function handleOnDragEnd(result: { source: { index: number }; destination: { index: number } }) {
    console.log(result);

    if (!result.destination) return;
    const items = Array.from(recipeTitles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const newOrder = [items];
    updateRecipeTitles(items);
    console.log(newOrder)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StrictModeDroppable droppableId="recipes">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {recipeTitles.map(({ id, ingredientName, ingredientAmount, ingredientMeasurementUnit }, index) => {
              return (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      <p>
                        {ingredientName} - {ingredientAmount} {ingredientMeasurementUnit}
                      </p>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default DndPage;
