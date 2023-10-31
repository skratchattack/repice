"use client";
import { Box, Button, Container, Flex, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, useFieldArray, Controller } from "react-hook-form";
import { RecipeForm, RecipeSchema, recipeSchemaDefaultValues } from "@/models/Recipe";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const RecipeFormPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
  } = useForm<RecipeForm>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: recipeSchemaDefaultValues,
  });

  const { fields, append } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<RecipeForm> = async (data, event) => {
    console.log("RecipeForm Data", data);
    event?.preventDefault();
    try {
      await axios.post("/api/recipes", data);
      router.push("/recipes");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      append({
        ingredientName: "",
        ingredientAmount: "",
        ingredientMeasurementUnit: "",
      });
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
        <Flex direction="column" gap="1">
          {fields.map((field, index) => (
            <Flex gap="1" key={field.id}>
              <Box width="100%">
                <TextField.Input
                  type="text"
                  placeholder="Ingredient Name"
                  {...register(`ingredients.${index}.ingredientName`)}
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
            </Flex>
          ))}
        </Flex>
        <Controller name='instructions' control={control} render={({ field }) => <SimpleMDE className="mt-8" {...field}/>}/>
        
        <Button type="button" size="4" onClick={handleSubmit(onSubmit, onInvalid)}>
          Submit New Recipe
        </Button>
      </Container>
    </form>
  );
};

export default RecipeFormPage;
