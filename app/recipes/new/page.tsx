// "use client";
// import { Box, Button, Container, Flex, TextField } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";
// import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { RecipeForm, RecipeSchema, recipeSchemaDefaultValues } from "@/models/Recipe";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ListManager } from "react-beautiful-dnd-grid";
// import IngredientLine from "@/app/components/RecipeFormComponents/IngredientLine";

// const RecipeFormPage = () => {
//   const list = [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
//   const router = useRouter();
//   const { register, handleSubmit, control, getValues } = useForm<RecipeForm>({
//     resolver: zodResolver(RecipeSchema),
//     defaultValues: recipeSchemaDefaultValues,
//   });

//   const onSubmit: SubmitHandler<RecipeForm> = async (data, event) => {
//     console.log("RecipeForm Data", data);
//     event?.preventDefault();
//     try {
//       await axios.post("/api/recipes", data);
//       router.push("/recipes");
//       router.refresh();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const test = getValues('ingredients')
//   console.log(test)

//   const onInvalid = (data: any) => console.error(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Container size="2">
//         <Flex className="mb-5" direction="column">
//           <Box>
//             <TextField.Root>
//               <TextField.Input placeholder="Title" className="text-center" size="3" {...register("title")}></TextField.Input>
//             </TextField.Root>
//           </Box>
//         </Flex>
//         <Flex direction="column" gap="1" className="relative">
//           <IngredientLine register={register} control={control}/>
//         </Flex>
//         <Controller
//           name="instructions"
//           control={control}
//           render={({ field }) => <SimpleMDE className="mt-8" {...field} />}
//         />

//         <Button type="button" size="4" onClick={handleSubmit(onSubmit, onInvalid)}>
//           Submit New Recipe
//         </Button>
//       </Container>
//     </form>
//   );
// };

// export default RecipeFormPage;

// SAVING THIS IN CASE I FUCK EVERYTHING UP
"use client";
import { Box, Button, Container, Flex, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, useFieldArray, Controller } from "react-hook-form";
import { RecipeForm, RecipeSchema, recipeSchemaDefaultValues } from "@/models/Recipe";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { TiDelete } from "react-icons/ti";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import styles from "./page.module.css";

const RecipeFormPage = () => {
  const list = [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
  const [value, setValue] = useState("");
  const router = useRouter();
  const { register, handleSubmit, control, getValues, setFocus } = useForm<RecipeForm>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: recipeSchemaDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<RecipeForm> = async (data, event) => {
    event?.preventDefault();
    try {
      await axios.post("/api/recipes", data);
      router.push("/recipes");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      append({
        id: "",
        ingredientName: "",
        ingredientAmount: "",
        ingredientMeasurementUnit: "",
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      setFocus("instructions");
    }
  };

  const handleIngredientFieldEnterKey = (e: { key: string }) => {
    const ingredientNameValue = getValues("ingredients.0.ingredientName");
    if (!ingredientNameValue && e.key === "Enter") {
    }
  };
  const onInvalid = (data: any) => console.error(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container size="2">
        <Flex className="mb-5" direction="column">
          <Box>
            <TextField.Root>
              <TextField.Input placeholder="Title" className="text-center" size="3" {...register("title")}></TextField.Input>
            </TextField.Root>
          </Box>
        </Flex>
        <Flex direction="column" gap="1" className="relative">
          {fields.map((field, index) => (
            <Flex gap="1" key={field.id}>
              <Box width="100%">
                <TextField.Input
                  type="text"
                  placeholder="Ingredient Name"
                  {...register(`ingredients.${index}.ingredientName`)}
                  onKeyDown={handleIngredientFieldEnterKey}
                />
              </Box>
              <Box width="auto">
                <TextField.Input type="number" placeholder="Amount" {...register(`ingredients.${index}.ingredientAmount`)} />
              </Box>
              <Box width="9">
                <TextField.Input
                  type="text"
                  placeholder="Units"
                  {...register(`ingredients.${index}.ingredientMeasurementUnit`)}
                  onKeyDown={handleKeyDown}
                />
              </Box>
              <div className="absolute -right-8">
                <button
                  disabled={fields.length < 2}
                  type="button"
                  onClick={() => remove(index)}
                  className={`text-red-300 align-middle ${fields.length > 1 ? "hover:text-red-500" : ""}`}
                >
                  <TiDelete size={20} />
                </button>
              </div>
            </Flex>
          ))}
        </Flex>
        <Controller
          name="instructions"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <ReactQuill theme="snow" className={styles.qlEditor} ref={ref} {...field} />
          )}
        />

        <Button type="button" size="4" onClick={handleSubmit(onSubmit, onInvalid)}>
          Submit New Recipe
        </Button>
      </Container>
    </form>
  );
};

export default RecipeFormPage;
