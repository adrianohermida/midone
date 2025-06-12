import React from "react";
import type { CaseAnalytics } from "@/types/legal-cases";
import Lucide from "@/components/Base/Lucide";

interface CaseStatsCardsProps {
  analytics: CaseAnalytics;
}

const CaseStatsCards: React.FC<CaseStatsCardsProps> = ({ analytics }) => {
  const statsCards = [
    {
      title: "Total de Processos",
      value: analytics.totalCases,
      icon: "FileText",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Processos Ativos",
      value: analytics.activeCases,
      icon: "Play",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Intimações Não Lidas",
      value: analytics.unreadIntimations,
      icon: "Bell",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      change: "-5%",
      changeType: "negative" as const,
    },
    {
      title: "Prazos Vencendo",
      value: analytics.overdueDeadlines,
      icon: "Clock",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      change: "+2",
      changeType: "neutral" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {card.value.toLocaleString("pt-BR")}
              </p>
              <div className="flex items-center mt-2">
                <span
                  className={`text-xs font-medium ${
                    card.changeType === "positive"
                      ? "text-green-600"
                      : card.changeType === "negative"
                        ? "text-red-600"
                        : "text-slate-600"
                  }`}
                >
                  {card.change}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                  vs. mês anterior
                </span>
              </div>
            </div>
            <div
              className={`p-3 rounded-lg ${card.bgColor} ${card.borderColor} border`}
            >
              <Lucide
                icon={card.icon as any}
                className={`w-6 h-6 ${card.color}`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseStatsCards;
