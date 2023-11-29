"use client";
import { IngredientForm, RecipeForm, InstructionsForm } from "@/models/Recipe";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import { IoMdAddCircle } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { TiDelete } from "react-icons/ti";
import { MdDragIndicator } from "react-icons/md";
import { StrictModeDroppable } from "./_components/StrictModeDroppable";
import { DragDropContext, Draggable } from "@hello-pangea/dnd";
import { Box, Grid } from "@radix-ui/themes";

export default function NewRecipePage() {
  const [ingredientList, setIngredientList] = useState<IngredientForm[]>();
  const [instructions, setInstructions] = useState<InstructionsForm[]>();

  const titleRef = useRef<HTMLInputElement>(null);
  const ingredientNameRef = useRef<HTMLInputElement>(null);
  const ingredientAmountRef = useRef<HTMLInputElement>(null);
  const ingredientUnitRef = useRef<HTMLInputElement>(null);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(ingredientList || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setIngredientList(items);
  }

  function handleInstructionsOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(instructions || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setInstructions(items);
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const recipeTitle = titleRef.current?.value;
    const recipeIngredients = ingredientList;
    const recipeInstructions = instructions;

    const newRecipe: RecipeForm = {
      title: recipeTitle || "",
      ingredients: recipeIngredients || [],
      instructions: recipeInstructions || [],
    };

    console.log(newRecipe);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const addIngredient = (newIngredient: IngredientForm) => {
      setIngredientList([...(ingredientList || []), newIngredient]);
    };
    const newIngredient: IngredientForm = {
      id: uuidv4(),
      ingredientName: ingredientNameRef.current?.value || "",
      ingredientAmount: ingredientAmountRef.current?.value || "",
      ingredientMeasurementUnit: ingredientUnitRef.current?.value || "",
    };
    addIngredient(newIngredient);
  };

  const handleInstructionsButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const addInstruction = (newInstruction: InstructionsForm) => {
      setInstructions([...(instructions || []), newInstruction]);
    };
    const newInstruction: InstructionsForm = {
      id: uuidv4(),
      instructions: instructionsRef.current?.value || "",
    };
    addInstruction(newInstruction);
    console.log(instructions);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedIngredients = [...(ingredientList || [])];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setIngredientList(updatedIngredients);
  };

  const handleIngredientKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const addIngredient = (newIngredient: IngredientForm) => {
        setIngredientList([...(ingredientList || []), newIngredient]);
      };
      const newIngredient: IngredientForm = {
        id: uuidv4(),
        ingredientName: ingredientNameRef.current?.value || "",
        ingredientAmount: ingredientAmountRef.current?.value || "",
        ingredientMeasurementUnit: ingredientUnitRef.current?.value || "",
      };
      addIngredient(newIngredient);
      ingredientNameRef.current?.focus();
      ingredientNameRef.current!.value = "";
      ingredientAmountRef.current!.value = "";
      ingredientUnitRef.current!.value = "";
    }
  };

  const handleInstructionsKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const addInstruction = (newInstruction: InstructionsForm) => {
        setInstructions([...(instructions || []), newInstruction]);
      };
      const newInstruction: InstructionsForm = {
        id: uuidv4(),
        instructions: instructionsRef.current?.value || "",
      };
      addInstruction(newInstruction);
      instructionsRef.current?.focus();
      instructionsRef.current!.value = "";
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
      <div className={styles.pageContainer}>
        <div className={styles.recipeTitle}>
          <label htmlFor="recipeTitle" hidden>
            Title
          </label>
          <input type="text" className={styles.recipeTitleInput} ref={titleRef} placeholder="Recipe Title" />
        </div>

        <Grid columns={{ initial: "1", lg: "2" }} gap="9" justify="center" pt="9">
          <Box className={styles.ingredientColumn}>
            <div className={styles.ingredientWrap}>
              <div>
                <label htmlFor="ingredientName">Ingredient Name</label>
                <input type="text" className={styles.ingredientName} ref={ingredientNameRef} />
              </div>
              <div>
                <label htmlFor="ingredientAmount">Amount</label>
                <input type="text" className={styles.ingredientAmount} ref={ingredientAmountRef} />
              </div>
              <div>
                <label htmlFor="ingredientUnit">Unit</label>
                <input
                  type="text"
                  className={styles.ingredientUnit}
                  ref={ingredientUnitRef}
                  onKeyDown={handleIngredientKeyDown}
                />
              </div>
              <button type="button" onClick={handleButtonClick}>
                <IoMdAddCircle size={23} className={styles.addButton} />
              </button>
            </div>
            <div className={styles.ingredientListContainer}>
              <h2>Ingredients</h2>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <StrictModeDroppable droppableId="ingredients">
                  {(provided) => (
                    <ul className={styles.ingredientList} {...provided.droppableProps} ref={provided.innerRef}>
                      {ingredientList?.map((ingredient, index) => (
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
                              <input
                                type="text"
                                defaultValue={ingredient.ingredientName}
                                className={styles.displayIngredientName}
                                id="ingredientName"
                                onChange={(e) => handleInputChange(index, "ingredientName", e.target.value)}
                              />
                              <input
                                type="text"
                                defaultValue={ingredient.ingredientAmount}
                                className={styles.displayIngredientAmount}
                                id="ingredientAmount"
                                onChange={(e) => handleInputChange(index, "ingredientAmount", e.target.value)}
                              />
                              <input
                                type="text"
                                defaultValue={ingredient.ingredientMeasurementUnit}
                                className={styles.displayIngredientUnits}
                                id="ingredientUnit"
                                onChange={(e) => handleInputChange(index, "ingredientMeasurementUnit", e.target.value)}
                              />
                              <div className={styles.buttons}>
                                {!snapshot.isDragging && (
                                  <button
                                    className={styles.deleteButton}
                                    onClick={() => {
                                      setIngredientList(
                                        ingredientList?.filter((ingredientItem) => ingredientItem.id !== ingredient.id)
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
          </Box>
          <Box className={styles.instructionsColumn}>
            <div className={styles.instructionsTextEditor}>
              {/* <ReactQuill modules={modules} theme="snow" ref={instructionsRef} className={styles.qlEditor} />
               */}
              <div className={styles.ingredientWrap}>
                <div>
                  <label htmlFor="ingredientName">Instruction</label>
                  <textarea
                    className={styles.instructionsTextarea}
                    ref={instructionsRef}
                    rows={2}
                    onKeyDown={handleInstructionsKeyDown}
                  />
                </div>
                <button type="button" onClick={handleInstructionsButtonClick}>
                  <IoMdAddCircle size={23} className={styles.addButton} />
                </button>
              </div>
            </div>
            <div className={styles.instructionsListContainer}>
              <h2>Instructions</h2>
              <DragDropContext onDragEnd={handleInstructionsOnDragEnd}>
                <StrictModeDroppable droppableId="instructions">
                  {(provided) => (
                    <ul className={styles.instructionsList} {...provided.droppableProps} ref={provided.innerRef}>
                      {instructions?.map((instruction, index) => (
                        <Draggable key={instruction.id} draggableId={instruction.id} index={index}>
                          {(provided, snapshot) => (
                            <li
                              key={instruction.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${
                                snapshot.isDragging ? styles.instructionsListItemBeingDragged : styles.instructionsListItem
                              }`}
                            >
                              <div className={styles.instructionIndex}>
                                <p>{index + 1}</p>
                                {/* <MdDragIndicator size={23} /> */}
                              </div>
                              <textarea
                                defaultValue={instruction.instructions}
                                className={styles.displayInstructions}
                                id="instructions"
                                onChange={(e) => handleInputChange(index, "instructions", e.target.value)}
                              />
                              <div className={styles.buttons}>
                                {!snapshot.isDragging && (
                                  <button
                                    className={styles.ingredientDeleteButton}
                                    onClick={() => {
                                      setInstructions(
                                        instructions?.filter((instructionItem) => instructionItem.id !== instruction.id)
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
          </Box>
        </Grid>
      </div>
    </form>
  );
}
