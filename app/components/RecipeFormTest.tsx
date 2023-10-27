"use client";
import * as z from "zod";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@radix-ui/themes";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
};

const RecipeFormTest = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
    },
  });
  const { control, register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "phNumbers",
  });

  return (
    <form>
      <div>
        <label htmlFor="">List of Phone Numbers</label>
        <div>
          {fields.map((field, index) => {
            return (
              <div className="form-control" key={field.id}>
                <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            );
          })}
          <button type="button" onClick={() => append({ number: "" })}>
            Add Phone Number
          </button>
        </div>
      </div>
    </form>
  );
};

export default RecipeFormTest;
