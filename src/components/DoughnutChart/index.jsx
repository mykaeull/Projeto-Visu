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
import { Doughnut } from "react-chartjs-2";
import { Select } from "../ReactSelect";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function DoughnutChart({ defaultData, colors, arrayOptions }) {
  const [dataSet, setDataSet] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({
    label: "Ataque",
    value: "Att",
  });

  useEffect(() => {
    const averageStatusByType = colors.map((e) => {
      const pokemonsByType = defaultData.filter(
        (element) => element["Type 1"] === e.type
      );

      const sumStatus = pokemonsByType.reduce(
        (pokemon, currentPokemon) => {
          // console.log(pokemon, "<--- Pokemon");
          // console.log(currentPokemon, "<--- currentPokemon");
          pokemon.status += Number(currentPokemon[selectedStatus.value]);
          return pokemon;
        },
        {
          status: 0,
        }
      );

      const averageStatus = sumStatus.status / pokemonsByType.length;

      return {
        color: e.color,
        type: e.type,
        averageStatus: Number(averageStatus.toFixed(2)),
      };
    });

    setDataSet(averageStatusByType);
  }, [defaultData, selectedStatus]);

  const dataObject = {
    datasets: [
      {
        data: dataSet.map((e) => e.averageStatus),
        backgroundColor: dataSet.map((e) => e.color),
      },
    ],
    labels: dataSet.map((e) => e.type),
  };

  return (
    <Container>
      {defaultData.length !== 0 && (
        <Content>
          <span>Distribuição da média de status dos pokemons por tipo</span>
          <div className="select-container">
            <div>
              <p>Status</p>
              <Select
                arrayOptions={arrayOptions}
                defaultValue={selectedStatus}
                changeValue={setSelectedStatus}
              />
            </div>
          </div>
          <Doughnut data={dataObject} />
        </Content>
      )}
    </Container>
  );
}
