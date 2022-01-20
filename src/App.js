import React, { useState, useEffect } from "react";
import { GlobalStyle } from "./styles/global";
import * as d3 from "d3";
import pokemonCSV from "./data/pokemons.csv";
import { BarChart } from "./components/BarChart";

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

  return (
    <>
      <BarChart defaultData={defaultData} />
      <GlobalStyle />
    </>
  );
}

export default App;
