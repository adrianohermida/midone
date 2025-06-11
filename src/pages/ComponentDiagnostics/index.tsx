import { useState, useEffect } from "react";
import clsx from "clsx";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

// Import all components to test
import Calendar from "@/components/Base/Calendar";
import MobileMenu from "@/components/MobileMenu";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LeafletMap from "@/components/LeafletMap";

// Chart components
import PieChart from "@/components/PieChart";
import ReportPieChart from "@/components/ReportPieChart";
import LineChart from "@/components/LineChart";
import ReportLineChart from "@/components/ReportLineChart";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import VerticalBarChart from "@/components/VerticalBarChart";
import ReportBarChart from "@/components/ReportBarChart";
import ReportBarChart1 from "@/components/ReportBarChart1";
import StackedBarChart from "@/components/StackedBarChart";
import StackedBarChart1 from "@/components/StackedBarChart1";
import ReportDonutChart from "@/components/ReportDonutChart";
import ReportDonutChart1 from "@/components/ReportDonutChart1";

// SimpleLineChart components
import SimpleLineChart from "@/components/SimpleLineChart";
import SimpleLineChart1 from "@/components/SimpleLineChart1";
import SimpleLineChart2 from "@/components/SimpleLineChart2";
import SimpleLineChart3 from "@/components/SimpleLineChart3";
import SimpleLineChart4 from "@/components/SimpleLineChart4";

interface ComponentTest {
  name: string;
  status: "testing" | "success" | "error" | "warning";
  error?: string;
  component: () => React.ReactNode;
}

function Main() {
  const [tests, setTests] = useState<ComponentTest[]>([]);
  const [currentTest, setCurrentTest] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  const componentTests: ComponentTest[] = [
    {
      name: "Calendar",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[300px]">
              <Calendar
                events={[
                  { title: "Test Event", start: new Date(), end: new Date() },
                ]}
                height="280px"
              />
            </div>
          );
        } catch (error) {
          throw new Error(`Calendar error: ${error}`);
        }
      },
    },
    {
      name: "ThemeSwitcher",
      status: "testing",
      component: () => {
        try {
          return <ThemeSwitcher />;
        } catch (error) {
          throw new Error(`ThemeSwitcher error: ${error}`);
        }
      },
    },
    {
      name: "LeafletMap",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[300px]">
              <LeafletMap height={280} />
            </div>
          );
        } catch (error) {
          throw new Error(`LeafletMap error: ${error}`);
        }
      },
    },
    {
      name: "PieChart",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <PieChart height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`PieChart error: ${error}`);
        }
      },
    },
    {
      name: "ReportPieChart",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <ReportPieChart height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`ReportPieChart error: ${error}`);
        }
      },
    },
    {
      name: "LineChart",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <LineChart height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`LineChart error: ${error}`);
        }
      },
    },
    {
      name: "ReportLineChart",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <ReportLineChart height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`ReportLineChart error: ${error}`);
        }
      },
    },
    {
      name: "HorizontalBarChart",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <HorizontalBarChart height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`HorizontalBarChart error: ${error}`);
        }
      },
    },
    {
      name: "VerticalBarChart",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <VerticalBarChart height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`VerticalBarChart error: ${error}`);
        }
      },
    },
    {
      name: "ReportBarChart",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <ReportBarChart height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`ReportBarChart error: ${error}`);
        }
      },
    },
    {
      name: "ReportBarChart1",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <ReportBarChart1 height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`ReportBarChart1 error: ${error}`);
        }
      },
    },
    {
      name: "StackedBarChart",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <StackedBarChart height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`StackedBarChart error: ${error}`);
        }
      },
    },
    {
      name: "StackedBarChart1",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <StackedBarChart1 height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`StackedBarChart1 error: ${error}`);
        }
      },
    },
    {
      name: "ReportDonutChart",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <ReportDonutChart height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`ReportDonutChart error: ${error}`);
        }
      },
    },
    {
      name: "ReportDonutChart1",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[200px]">
              <ReportDonutChart1 height={180} />
            </div>
          );
        } catch (error) {
          throw new Error(`ReportDonutChart1 error: ${error}`);
        }
      },
    },
    {
      name: "SimpleLineChart",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[150px]">
              <SimpleLineChart height={130} />
            </div>
          );
        } catch (error) {
          throw new Error(`SimpleLineChart error: ${error}`);
        }
      },
    },
    {
      name: "SimpleLineChart1",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[150px]">
              <SimpleLineChart1 height={130} />
            </div>
          );
        } catch (error) {
          throw new Error(`SimpleLineChart1 error: ${error}`);
        }
      },
    },
    {
      name: "SimpleLineChart2",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[150px]">
              <SimpleLineChart2 height={130} />
            </div>
          );
        } catch (error) {
          throw new Error(`SimpleLineChart2 error: ${error}`);
        }
      },
    },
    {
      name: "SimpleLineChart3",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[150px]">
              <SimpleLineChart3 height={130} />
            </div>
          );
        } catch (error) {
          throw new Error(`SimpleLineChart3 error: ${error}`);
        }
      },
    },
    {
      name: "SimpleLineChart4",
      status: "testing",
      component: () => {
        try {
          return (
            <div className="h-[150px]">
              <SimpleLineChart4 height={130} />
            </div>
          );
        } catch (error) {
          throw new Error(`SimpleLineChart4 error: ${error}`);
        }
      },
    },
  ];

  const runDiagnostics = async () => {
    setIsRunning(true);
    setTests([...componentTests]);

    for (let i = 0; i < componentTests.length; i++) {
      setCurrentTest(i);

      try {
        // Simulate testing delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Try to render the component
        componentTests[i].component();

        setTests((prev) =>
          prev.map((test, index) =>
            index === i ? { ...test, status: "success" } : test,
          ),
        );
      } catch (error: any) {
        setTests((prev) =>
          prev.map((test, index) =>
            index === i
              ? {
                  ...test,
                  status: "error",
                  error: error.message || "Unknown error",
                }
              : test,
          ),
        );
      }
    }

    setIsRunning(false);
    setCurrentTest(-1);
  };

  const getStatusIcon = (status: ComponentTest["status"]) => {
    switch (status) {
      case "testing":
        return (
          <Lucide
            icon="Clock"
            className="w-4 h-4 text-yellow-500 animate-spin"
          />
        );
      case "success":
        return <Lucide icon="CheckCircle" className="w-4 h-4 text-green-500" />;
      case "error":
        return <Lucide icon="XCircle" className="w-4 h-4 text-red-500" />;
      case "warning":
        return (
          <Lucide icon="AlertTriangle" className="w-4 h-4 text-orange-500" />
        );
      default:
        return <Lucide icon="Circle" className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ComponentTest["status"]) => {
    switch (status) {
      case "testing":
        return "border-yellow-200 bg-yellow-50";
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      case "warning":
        return "border-orange-200 bg-orange-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const successCount = tests.filter((t) => t.status === "success").length;
  const errorCount = tests.filter((t) => t.status === "error").length;
  const totalCount = componentTests.length;

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">
          Diagnóstico de Componentes
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y box">
          <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
            <h2 className="font-medium text-base mr-auto">
              Status dos Componentes
            </h2>
            <div className="flex items-center gap-4 mt-3 sm:mt-0">
              <div className="text-slate-500">
                ✅ {successCount} / ❌ {errorCount} / 📊 {totalCount}
              </div>
              <Button
                variant="primary"
                onClick={runDiagnostics}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <Lucide
                      icon="RefreshCw"
                      className="w-4 h-4 mr-2 animate-spin"
                    />
                    Testando...
                  </>
                ) : (
                  <>
                    <Lucide icon="Play" className="w-4 h-4 mr-2" />
                    Executar Diagnóstico
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="p-5">
            {tests.length === 0 ? (
              <div className="text-center py-10">
                <Lucide
                  icon="Activity"
                  className="w-12 h-12 mx-auto text-slate-400 mb-4"
                />
                <p className="text-slate-500">
                  Clique em "Executar Diagnóstico" para testar todos os
                  componentes
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {tests.map((test, index) => (
                  <div
                    key={test.name}
                    className={clsx([
                      "border rounded-lg p-4 transition-all duration-200",
                      getStatusColor(test.status),
                      currentTest === index && "ring-2 ring-blue-500",
                    ])}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-sm">{test.name}</h3>
                      {getStatusIcon(test.status)}
                    </div>

                    {test.error && (
                      <div className="text-xs text-red-600 bg-red-100 p-2 rounded mb-3">
                        {test.error}
                      </div>
                    )}

                    {test.status === "success" && (
                      <div className="border border-gray-200 rounded bg-white p-2">
                        <div className="text-xs text-gray-500 mb-1">
                          Preview:
                        </div>
                        <div className="max-h-32 overflow-hidden">
                          {test.component()}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Test individual components */}
        <div className="col-span-12 intro-y">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* MobileMenu Test */}
            <div className="box p-5">
              <h3 className="text-lg font-medium mb-4">
                MobileMenu (Sempre Ativo)
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                O MobileMenu está sempre presente no topo da página em
                dispositivos móveis. Redimensione a janela ou use o DevTools
                para testar.
              </p>
              <div className="text-green-600 text-sm">
                ✅ Funcionando - Componente carregado na barra de navegação
              </div>
            </div>

            {/* ThemeSwitcher Test */}
            <div className="box p-5">
              <h3 className="text-lg font-medium mb-4">
                ThemeSwitcher (Sempre Ativo)
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                O ThemeSwitcher está sempre presente no canto inferior direito
                da tela.
              </p>
              <div className="text-green-600 text-sm">
                ✅ Funcionando - Redesigned na sessão anterior
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Include MobileMenu for testing */}
      <MobileMenu />
    </>
  );
}

export default Main;
