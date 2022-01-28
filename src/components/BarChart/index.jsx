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
import { Select } from "../ReactSelect";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart({ defaultData, colors, arrayOptions }) {
  const [pokemons, setPokemons] = useState([]);
  const [chartDataState, setChartDataState] = useState();
  const [optionsState, setOptionsState] = useState();
  const [atributoX, setAtributoX] = useState({ label: "Ataque", value: "Att" });
  const [atributoY, setAtributoY] = useState({ label: "Defesa", value: "Def" });

  // console.log(defaultData);

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

    setPokemons(sortedAll.slice(0, 10));
  }, [defaultData]);

  useEffect(() => {
    const chartData = {
      labels: pokemons.map((pokemon) => pokemon.Name),
      datasets: [
        {
          label: `Pokémons mais fortes - Média ${atributoX.label} / ${atributoY.label}`,
          data: pokemons.map((pokemon, index) => {
            return {
              ...pokemon,
              valueX: Number(pokemon[atributoX.value]),
              valueY: Number(pokemon[atributoY.value]),
              x: pokemon.averageValue,
              y: index,
            };
          }),
          backgroundColor: (context) => {
            const pokemon = context?.raw;
            if (pokemon !== undefined) {
              const color = colors.find(
                (e) => e.type === pokemon["Type 1"]
              ).color;

              return color;
            }
          },
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
                `${atributoX.label}: ${pokemon.valueX}`,
                `${atributoY.label}: ${pokemon.valueY}`,
                `Média: ${pokemon.x}`,
              ];
            },
          },
        },
      },
    };
    setOptionsState(options);
  }, [pokemons]);

  useEffect(() => {
    const averageAll = defaultData.map((item) => {
      return {
        ...item,
        averageValue:
          (Number(item[atributoX.value]) + Number(item[atributoY.value])) / 2,
      };
    });

    const sortedAll = averageAll.sort(
      (a, b) => b.averageValue - a.averageValue
    );

    setPokemons(sortedAll.slice(0, 10));
  }, [atributoX, atributoY]);

  return (
    <Container>
      {pokemons.length !== 0 && (
        <Content>
          <span>Top 10 pokemons mais poderosos</span>
          <div className="select-container">
            <div>
              <p>Atributo X</p>
              <Select
                arrayOptions={arrayOptions}
                defaultValue={atributoX}
                changeValue={setAtributoX}
              />
            </div>
            <div>
              <p>Atributo Y</p>
              <Select
                arrayOptions={arrayOptions}
                defaultValue={atributoY}
                changeValue={setAtributoY}
              />
            </div>
          </div>
          <Bar data={chartDataState} options={optionsState} />
        </Content>
      )}
    </Container>
  );
}
