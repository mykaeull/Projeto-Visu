import React, { useState, useEffect } from "react";
import { GlobalStyle } from "./styles/global";
import * as d3 from "d3";
import pokemonCSV from "./data/pokemons.csv";
import { BarChart } from "./components/BarChart";
import { RadarChart } from "./components/RadarChart";

export function App() {
  const [defaultData, setDefaultData] = useState([]);

  useEffect(() => {
    const getFormattedData = async () => {
      try {
        const formattedData = await d3.csv(pokemonCSV, (data) => data);
        setDefaultData(formattedData);
      } catch (err) {
        console.error(err);
      }
    };

    getFormattedData();
  }, []);

  const colorsByType = [
    { type: "Bug", color: "#6b8e23" },
    { type: "Rock", color: "#705848" },
    { type: "Dragon", color: "#7038F8" },
    { type: "Electric", color: "#F8D030" },
    { type: "Fighting", color: "#C03028" },
    { type: "Fire", color: "#F08030" },
    { type: "Ghost", color: "#705898" },
    { type: "Grass", color: "#78C850" },
    { type: "Normal", color: "#A8A878" },
    { type: "Poison", color: "#A040A0" },
    { type: "Psychic", color: "#F85888" },
    { type: "Water", color: "#6890F0" },
    { type: "Dark", color: "#000033" },
    { type: "Ground", color: "#663300" },
    { type: "Ice", color: "#99d6ff" },
    { type: "Fairy", color: "#9999ff" },
    { type: "Steel", color: "#4d4d4d" },
    { type: "Flying", color: "#d9d9d9" },
  ];

  const arrayStatus = [
    { label: "Ataque", value: "Att" },
    { label: "Defesa", value: "Def" },
    { label: "HP", value: "HP" },
    { label: "Ataque Especial", value: "Spa" },
    { label: "Defesa Especial", value: "Spd" },
    { label: "Velocidade", value: "Spe" },
  ];

  return (
    <>
      <BarChart
        defaultData={defaultData}
        colors={colorsByType}
        arrayOptions={arrayStatus}
      />
      <RadarChart defaultData={defaultData} colors={colorsByType} />
      <GlobalStyle />
    </>
  );
}

export default App;
