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
import { Pie } from "react-chartjs-2";
import { Select } from "../ReactSelect";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function PieChart({ defaultData, arrayStatus }) {
  // const [dataSet, setDataSet] = useState([]);
  const [statusPokemon, setStatusPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({
    label: "Bulbasaur",
    value: "1",
  });

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

    const pokemon = defaultData.find((e) => e.Number === selectedPokemon.value);

    if (pokemon !== undefined) {
      setStatusPokemon([
        Number(pokemon.Att),
        Number(pokemon.Def),
        Number(pokemon.HP),
        Number(pokemon.Spa),
        Number(pokemon.Spd),
        Number(pokemon.Spe),
      ]);
    }

    // console.log(pokemon);
  }, [defaultData, selectedPokemon]);

  const dataObject = {
    datasets: [
      {
        data: statusPokemon,
        backgroundColor: arrayStatus.map((e) => e.color),
      },
    ],
    labels: arrayStatus.map((e) => e.label),
  };

  return (
    <Container>
      {defaultData.length !== 0 && (
        <Content>
          <span>Status geral do pokemon</span>
          <div className="select-container">
            <div>
              <p>Pokemon</p>
              <Select
                arrayOptions={arrayOptions}
                defaultValue={selectedPokemon}
                changeValue={setSelectedPokemon}
              />
            </div>
          </div>
          <Pie data={dataObject} />
        </Content>
      )}
    </Container>
  );
}
