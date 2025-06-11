import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  LineController,
  BarController,
  DoughnutController,
  PieController,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  LineController,
  BarController,
  DoughnutController,
  PieController,
  PolarAreaController,
  RadarController,
);

interface ChartProps {
  type: "line" | "bar" | "doughnut" | "pie" | "polarArea" | "radar";
  data: any;
  options?: any;
  width?: number | string;
  height?: number | string;
  className?: string;
  getRef?: (ref: { instance: ChartJS | null }) => void;
}

const Chart: React.FC<ChartProps> = ({
  type,
  data,
  options = {},
  width,
  height,
  className,
  getRef,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    // Destroy existing chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    try {
      // Create new chart instance with error handling
      chartInstance.current = new ChartJS(ctx, {
        type,
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          ...options,
        },
      });

      // Call getRef callback if provided
      if (getRef) {
        getRef({ instance: chartInstance.current });
      }
    } catch (error) {
      console.error("Failed to create chart instance:", error);
      if (getRef) {
        getRef({ instance: null });
      }
    }

    return () => {
      if (chartInstance.current) {
        try {
          chartInstance.current.destroy();
        } catch (error) {
          console.warn("Error destroying chart:", error);
        }
        chartInstance.current = null;
      }
    };
  }, [type, data, options]);

  return (
    <div className={className} style={{ width, height }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export type ChartElement = ChartJS;
export default Chart;
