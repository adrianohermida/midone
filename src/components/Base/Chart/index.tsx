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
} from "chart.js";

ChartJS.register(
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
);

interface ChartProps {
  type: "line" | "bar" | "doughnut" | "pie" | "polarArea" | "radar";
  data: any;
  options?: any;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Chart: React.FC<ChartProps> = ({
  type,
  data,
  options = {},
  width,
  height,
  className,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    // Destroy existing chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance
    chartInstance.current = new ChartJS(ctx, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...options,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
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
