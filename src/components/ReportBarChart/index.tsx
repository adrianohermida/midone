import Chart, { ChartElement } from "@/components/Base/Chart";
import { ChartData, ChartOptions } from "chart.js/auto";
import { getColor } from "@/utils/colors";
import { selectColorScheme } from "@/stores/colorSchemeSlice";
import { selectDarkMode } from "@/stores/darkModeSlice";
import { useAppSelector } from "@/stores/hooks";
import { useMemo, useEffect, useRef } from "react";

interface MainProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width?: number | "auto";
  height?: number | "auto";
}

function Main({ width = "auto", height = "auto", className = "" }: MainProps) {
  const props = {
    width: width,
    height: height,
    className: className,
  };
  const reportBarChartRef = useRef<{ instance: ChartElement | null }>();
  const colorScheme = useAppSelector(selectColorScheme);
  const darkMode = useAppSelector(selectDarkMode);

  // Fake visitor data
  const reportBarChartData = new Array(40).fill(0).map((data, key) => {
    if (key % 3 == 0 || key % 5 == 0) {
      return Math.ceil(Math.random() * (0 - 20) + 20);
    } else {
      return Math.ceil(Math.random() * (0 - 7) + 7);
    }
  });

  // Fake visitor bar color
  const reportBarChartColor = useMemo(() => {
    return reportBarChartData.map((data) => {
      if (data >= 8 && data <= 14) {
        return colorScheme ? getColor("primary", 0.65) : "";
      } else if (data >= 15) {
        return colorScheme ? getColor("primary") : "";
      }

      return colorScheme ? getColor("primary", 0.35) : "";
    });
  }, [colorScheme, darkMode]);

  const data: ChartData = useMemo(() => {
    return {
      labels: reportBarChartData,
      datasets: [
        {
          label: "Html Template",
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          data: reportBarChartData,
          backgroundColor: reportBarChartColor,
        },
      ],
    };
  }, [colorScheme, darkMode]);

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
      },
      layout: {
        padding: 0,
      },
    };
  }, [colorScheme, darkMode]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (reportBarChartRef.current?.instance) {
      intervalId = setInterval(() => {
        const chartInstance = reportBarChartRef.current?.instance;
        if (
          chartInstance &&
          chartInstance.config &&
          chartInstance.config.data
        ) {
          try {
            const chartConfig = chartInstance.config;
            const datasets = chartConfig.data.datasets;

            if (
              datasets &&
              datasets[0] &&
              datasets[0].data &&
              Array.isArray(datasets[0].data) &&
              datasets[0].data.length > 0
            ) {
              // Ensure chart is fully initialized before updating
              if (
                chartInstance.ctx &&
                chartInstance.platform &&
                chartInstance.width > 0
              ) {
                // Swap visitor data
                const newData = datasets[0].data[0];
                datasets[0].data.shift();
                datasets[0].data.push(newData);

                // Swap visitor bar color
                if (
                  Array.isArray(datasets[0].backgroundColor) &&
                  datasets[0].backgroundColor.length > 0
                ) {
                  const newColor = datasets[0].backgroundColor[0];
                  datasets[0].backgroundColor.shift();
                  datasets[0].backgroundColor.push(newColor);
                }

                // Use requestAnimationFrame to ensure proper timing
                requestAnimationFrame(() => {
                  if (chartInstance && chartInstance.ctx) {
                    chartInstance.update("none");
                  }
                });
              }
            }
          } catch (error) {
            console.warn("Chart update error:", error);
          }
        }
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [reportBarChartRef.current?.instance]);

  return (
    <Chart
      type="bar"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
      getRef={(el) => {
        reportBarChartRef.current = el;
      }}
    />
  );
}

export default Main;
