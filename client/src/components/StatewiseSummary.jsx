import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import Treemap from "react-d3-treemap";
import { Chart } from "chart.js/auto";

Chart.register({
  id: "category",

  type: "category",
});
const StateWiseSummary = () => {
  const [selectedState, setSelectedState] = useState(null);

  const stateData = [
    {
      name: "State1",
      temp: 32,
      population: 5000000,
      cities: [
        { name: "City1", temp: 25 },
        { name: "City2", temp: 30 },
        { name: "City3", temp: 35 },
      ],
    },
    {
      name: "State2",
      temp: 28,
      population: 6000000,
      cities: [
        { name: "City1", temp: 20 },
        { name: "City2", temp: 25 },
        { name: "City3", temp: 30 },
      ],
    },
    {
      name: "State3",
      temp: 30,
      population: 7000000,
      cities: [
        { name: "City1", temp: 27 },
        { name: "City2", temp: 29 },
        { name: "City3", temp: 32 },
      ],
    },
    {
      name: "State4",
      temp: 25,
      population: 4000000,
      cities: [
        { name: "City1", temp: 22 },
        { name: "City2", temp: 24 },
        { name: "City3", temp: 26 },
      ],
    },
    {
      name: "State5",
      temp: 35,
      population: 8000000,
      cities: [
        { name: "City1", temp: 33 },
        { name: "City2", temp: 34 },
        { name: "City3", temp: 36 },
      ],
    },
    {
      name: "State6",
      temp: 20,
      population: 3000000,
      cities: [
        { name: "City1", temp: 18 },
        { name: "City2", temp: 19 },
        { name: "City3", temp: 21 },
      ],
    },
  ];
  const ErrorBoundary = ({ children }) => {
    return <div>{children}</div>;
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getStateColor = (state) => {
    const minTemp = Math.min(...stateData.map((s) => s.temp));

    if (state.temp <= minTemp) {
      return getRandomColor();
    } else {
      const tempRange = Math.max(...stateData.map((s) => s.temp)) - minTemp;

      const tempPercent = (state.temp - minTemp) / tempRange;

      const red = Math.floor(255 * tempPercent);

      const green = Math.floor(255 * (1 - tempPercent));

      return `rgb(${red}, 0, ${green})`;
    }
  };

  const chartData = {
    labels: stateData.map((state) => state.name),
    datasets: [
      {
        label: "Temperature",
        data: stateData.map((state) => state.temp),
        backgroundColor: stateData.map(getStateColor),
        borderColor: stateData.map(getStateColor),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const state = stateData[tooltipItem.index];
          return `Name: ${state.name}<br/>Temperature: ${state.temp}<br/>Population: ${state.population}`;
        },
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const handleStateClick = (event, state) => {
    setSelectedState(state);
  };
  const datasetClick = (e, datasetIndex) => {
    const state = stateData[datasetIndex];

    handleStateClick(e, state);
  };
  const cityData = selectedState ? selectedState.cities : [];

  const treeData = {
    name: "Cities",
    children: cityData.map((city) => ({
      name: city.name,
      value: city.temp,
    })),
  };

  const treeOptions = {
    size: {
      height: 500,
      width: 800,
    },
  };
  const stateDoughnutData = {
    labels: stateData.map((state) => state.name),

    datasets: [
      {
        label: "Temperature",

        data: stateData.map((state) => state.temp),

        backgroundColor: stateData.map(getStateColor),

        borderColor: stateData.map(getStateColor),

        borderWidth: 1,
      },
    ],
  };

  const doughnutChartOptions = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const state = stateData[tooltipItem.index];

          return `Name: ${state.name}<br/>Temperature: ${state.temp}`;
        },
      },
    },
  };
  return (
    <div className="state-wise-summary-container">
      <h1 className="text-4xl font-semibold text-center mb-8">
        State-wise Summary
      </h1>
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="mb-4">
            <Line
              data={chartData}
              options={chartOptions}
              width={100}
              height={50}
              onClick={datasetClick}
            />
          </div>
          <div className="mb-4">
            <Doughnut
              data={stateDoughnutData}
              options={doughnutChartOptions}
              width={100}
              height={50}
            />
          </div>
          <div>
            <ErrorBoundary>
              <div>
                <Treemap data={treeData} options={treeOptions} />
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </div>
      {selectedState && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedState.name}
            </h2>
            <div className="flex mb-4">
              <div className="w-1/2">
                <p className="text-gray-700 mb-2">Temperature:</p>
                <p className="text-xl font-semibold">{selectedState.temp}</p>
              </div>
              <div className="w-1/2">
                <p className="text-gray-700 mb-2">Population:</p>
                <p className="text-xl font-semibold">
                  {selectedState.population}
                </p>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Cities:</h3>
            <ul className="list-disc list-inside">
              {cityData.map((city, index) => (
                <li key={index} className="text-gray-700 mb-2">
                  {city.name}: {city.temp}
                </li>
              ))}
            </ul>
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setSelectedState(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StateWiseSummary;
