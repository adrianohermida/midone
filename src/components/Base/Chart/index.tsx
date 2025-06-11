import { useRef, useEffect, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ChartProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width?: number;
  height?: number;
  type?: "line" | "bar" | "pie" | "doughnut" | "polar" | "radar";
  data?: any;
  options?: any;
}

type ChartRef = React.ComponentPropsWithRef<"canvas">["ref"];

const Chart = forwardRef((props: ChartProps, ref: ChartRef) => {
  const {
    width = 400,
    height = 400,
    type = "line",
    data,
    options,
    ...computedProps
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && data) {
      // Chart initialization would go here
      // For now, we'll just have a placeholder
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#f1f5f9";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#64748b";
        ctx.font = "16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Chart Placeholder", width / 2, height / 2);
      }
    }
  }, [data, width, height]);

  return (
    <canvas
      {...computedProps}
      ref={ref || canvasRef}
      width={width}
      height={height}
      className={twMerge(["block", props.className])}
    />
  );
});

export default Chart;
