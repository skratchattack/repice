"use client";
import axios from "axios";
import React, { useRef } from "react";


const NutritionPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const api = "25ddd64ee88804d2ff4baaf65aaf4d1d";
  const appId = "5df0176f"
  
  
  const handleSearchClick = async () => {

    const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${api}&ingr=${inputRef.current?.value}`;
    
    // Make the request using fetch
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        console.log(data);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
      });
  
  };


  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleSearchClick}> Get Data</button>
    </div>
  );
};

export default NutritionPage;
