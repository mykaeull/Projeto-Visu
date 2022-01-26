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
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart({ defaultData }) {
  const [pokemons, setPokemons] = useState([]);
  const [chartDataState, setChartDataState] = useState();
  const [optionsState, setOptionsState] = useState();

  useEffect(() => {
    const averageAll = defaultData.map((item) => {
      const { Att, Def } = item;

      return {
        ...item,
        averageValue: (Number(Att) + Number(Def)) / 2,
      };
    });

    const sortedAll = averageAll.sort(
      (a, b) => b.averageValue - a.averageValue
    );

    setPokemons(sortedAll.slice(0, 7));
  }, [defaultData]);

  useEffect(() => {
    const chartData = {
      labels: pokemons.map((pokemon) => pokemon.Name),
      datasets: [
        {
          label: `Pokémons mais fortes - Média ataque / defesa`,
          data: pokemons.map((pokemon, index) => {
            return {
              ...pokemon,
              valueX: Number(pokemon.Att),
              valueY: Number(pokemon.Def),
              x: pokemon.averageValue,
              y: index,
            };
          }),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    setChartDataState(chartData);

    const options = {
      indexAxis: "y",
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const pokemon = context?.raw;
              return `Tipo: ${pokemon["Type 1"]}`;
            },
            afterLabel: (context) => {
              const pokemon = context?.raw;
              return [
                `$ataque: ${pokemon.valueX}`,
                `$defesa: ${pokemon.valueY}`,
                `Média: ${pokemon.x}`,
              ];
            },
          },
        },
      },
    };
    setOptionsState(options);
  }, [pokemons]);

  console.log(pokemons);

  return (
    <Container>
      {pokemons.length !== 0 && (
        <Content>
          <Bar data={chartDataState} options={optionsState} />
        </Content>
      )}
    </Container>
  );
}
