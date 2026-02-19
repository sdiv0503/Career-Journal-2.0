"use client"; // <--- This magic line fixes the error

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Register ChartJS components locally in this client component
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface ResumeChartProps {
  data: number[];
  labels: string[];
}

export function ResumeChart({ data, labels }: ResumeChartProps) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Your Profile",
        data: data,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: { color: "rgba(0,0,0,0.1)" },
        grid: { color: "rgba(0,0,0,0.1)" },
        pointLabels: { font: { size: 12, weight: "bold" as const } },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: { legend: { display: false } },
  };

  return <Radar data={chartData} options={chartOptions} />;
}