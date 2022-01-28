import { useState, useEffect } from "react";
import { Container, Content } from "./styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Select } from "../ReactSelect";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function RadarChart({ defaultData, colors }) {
  const [selectedPokemon1, setSelectedPokemon1] = useState({
    label: "Bulbasaur",
    value: "1",
  });
  const [selectedPokemon2, setSelectedPokemon2] = useState({
    label: "Ivysaur",
    value: "2",
  });
  const [dataSet, setDataSet] = useState([]);
  const [chartDataState, setChartDataState] = useState(null);
  const [arrayOptions, setArrayOptions] = useState([]);

  useEffect(() => {
    setArrayOptions(
      defaultData.map((e) => {
        return {
          label: e.Name,
          value: e.Number,
        };
      })
    );

    function getFormattedPokemon(id) {
      const pokemon = defaultData.find((e) => e.Number === id);

      if (pokemon !== undefined) {
        return {
          label: pokemon.Name,
          data: [
            Number(pokemon.Att),
            Number(pokemon.Def),
            Number(pokemon.Spa),
            Number(pokemon.Spd),
            Number(pokemon.Spe),
            Number(pokemon.HP),
          ],
          backgroundColor: `${
            colors.find((e) => e.type === pokemon["Type 1"]).color
          }50`,
          borderColor: colors.find((e) => e.type === pokemon["Type 1"]).color,
          pointHoverBackgroundColor: "#fff",
        };
      }

      return;
    }

    // setPokemon1(getFormattedPokemon(selectedPokemon1.value));
    // setPokemon2(getFormattedPokemon(selectedPokemon2.value));

    // console.log(pokemon1, "<--- pokemon1");
    // console.log(pokemon2, "<--- pokemon2");

    // if (pokemon1 !== undefined && pokemon2 !== undefined) {
    //   console.log(pokemon1, "<--- aqui");
    //   setDataSet([pokemon1, pokemon2]);
    // }

    const pokemon1Found = getFormattedPokemon(selectedPokemon1.value);
    const pokemon2Found = getFormattedPokemon(selectedPokemon2.value);

    if (pokemon1Found !== undefined && pokemon2Found !== undefined) {
      // setPokemon1(pokemon1Found);
      // setPokemon2(pokemon2Found);
      // console.log(pokemon1Found, "<--- pokemon1Found");
      // console.log(pokemon1);
      setDataSet([pokemon1Found, pokemon2Found]);
    }
  }, [selectedPokemon1, selectedPokemon2, defaultData]);

  useEffect(() => {
    if (dataSet.length !== 0) {
      // console.log(pokemon1);
      // console.log(dataSet);
      const chartData = {
        labels: [
          "Ataque",
          "Defesa",
          "Ataque Especial",
          "Defesa Especial",
          "Velocidade",
          "HP",
        ],
        datasets: dataSet,
      };

      console.log(chartData);
      setChartDataState(chartData);
    }
  }, [dataSet]);

  return (
    <Container>
      {chartDataState !== null && (
        <Content>
          <span>Comparação de status entre pokemons</span>
          <div className="select-container">
            <div>
              <p>Atributo X</p>
              <Select
                arrayOptions={arrayOptions}
                defaultValue={selectedPokemon1}
                changeValue={setSelectedPokemon1}
              />
            </div>
            <div>
              <p>Atributo Y</p>
              <Select
                arrayOptions={arrayOptions}
                defaultValue={selectedPokemon2}
                changeValue={setSelectedPokemon2}
              />
            </div>
          </div>
          <Radar data={chartDataState} />
        </Content>
      )}
    </Container>
  );
}
