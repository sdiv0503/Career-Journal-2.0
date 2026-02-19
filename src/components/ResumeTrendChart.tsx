"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ResumeTrendChartProps {
  data: { date: string; score: number; fileName: string }[];
}

export function ResumeTrendChart({ data }: ResumeTrendChartProps) {
  // Sort data by date (oldest to newest) to show progression
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const chartData = {
    labels: sortedData.map((d) => {
      // Format date nicely (e.g., "Feb 10")
      return new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }),
    datasets: [
      {
        fill: true,
        label: "Resume Score",
        data: sortedData.map((d) => d.score),
        borderColor: "rgb(59, 130, 246)", // Blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)", // Blue-500 transparent
        tension: 0.4, // Smooth curves
        pointRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend since we only have one dataset
      },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 13 },
        displayColors: false,
        callbacks: {
          // Show the filename in the tooltip so they know WHICH resume this was
          afterLabel: function (context: any) {
            return `File: ${sortedData[context.dataIndex].fileName}`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        ticks: {
          font: { size: 11 },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <div className="h-[300px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}
