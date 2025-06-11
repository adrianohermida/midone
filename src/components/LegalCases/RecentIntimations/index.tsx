import React from "react";
import type { Intimation } from "@/types/legal-cases";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";

interface RecentIntimationsProps {
  intimations: Intimation[];
  loading?: boolean;
  onViewAll?: () => void;
}

const RecentIntimations: React.FC<RecentIntimationsProps> = ({
  intimations,
  loading = false,
  onViewAll,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="border-b border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Intimações Recentes
            </h3>
            {intimations.filter((i) => !i.lido).length > 0 && (
              <span className="ml-3 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {intimations.filter((i) => !i.lido).length}
              </span>
            )}
          </div>
          {onViewAll && (
            <Button variant="outline-secondary" size="sm" onClick={onViewAll}>
              Ver Todas
            </Button>
          )}
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingIcon icon="oval" className="w-6 h-6 mr-2" />
            <span className="text-slate-600 dark:text-slate-400">
              Carregando intimações...
            </span>
          </div>
        ) : intimations.length > 0 ? (
          <div className="space-y-4">
            {intimations.map((intimation) => (
              <div
                key={intimation.id}
                className={`p-4 rounded-lg border transition-colors duration-200 ${
                  intimation.lido
                    ? "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        intimation.lido ? "bg-slate-400" : "bg-blue-500"
                      }`}
                    />
                    <span className="font-mono text-sm text-slate-600 dark:text-slate-400">
                      {intimation.numeroProcesso}
                    </span>
                    {intimation.urgente && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200">
                        <Lucide icon="AlertTriangle" className="w-3 h-3 mr-1" />
                        Urgente
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(intimation.dataMovimento)}
                    </span>
                    {!intimation.lido && (
                      <button
                        className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                        onClick={() => {
                          // Mark as read functionality would go here
                        }}
                      >
                        Marcar como lida
                      </button>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-3">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {truncateText(intimation.conteudo)}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center">
                      <Lucide icon="Building" className="w-3 h-3 mr-1" />
                      <span>{intimation.tribunal}</span>
                    </div>
                    {intimation.vara && (
                      <div className="flex items-center">
                        <Lucide icon="MapPin" className="w-3 h-3 mr-1" />
                        <span>{intimation.vara}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Lucide icon="Tag" className="w-3 h-3 mr-1" />
                      <span>{intimation.fonte}</span>
                    </div>
                  </div>

                  {intimation.dataLimitePrazo && (
                    <div className="flex items-center text-xs text-amber-600 dark:text-amber-400">
                      <Lucide icon="Clock" className="w-3 h-3 mr-1" />
                      <span>
                        Prazo:{" "}
                        {new Date(
                          intimation.dataLimitePrazo,
                        ).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Lucide
              icon="Bell"
              className="w-12 h-12 text-slate-400 mx-auto mb-3"
            />
            <p className="text-slate-600 dark:text-slate-400">
              Nenhuma intimação recente
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              As intimações aparecerão aqui quando forem capturadas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentIntimations;
