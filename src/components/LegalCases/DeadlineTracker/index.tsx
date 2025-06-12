import React, { useState, useEffect } from "react";
import type { Deadline } from "@/types/legal-cases";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

interface DeadlineTrackerProps {
  onViewAll?: () => void;
}

const DeadlineTracker: React.FC<DeadlineTrackerProps> = ({ onViewAll }) => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  // Mock data for deadlines - in a real app this would come from the API
  useEffect(() => {
    const mockDeadlines: Deadline[] = [
      {
        id: "1",
        caseId: "case-1",
        titulo: "Contestação - Ação de Indenização",
        descricao:
          "Prazo para apresentar contestação no processo 0001234-56.2024.8.26.0100",
        dataLimite: "2024-02-15T23:59:59.000Z",
        tipo: "prazo_processual",
        prioridade: "alta",
        status: "pendente",
        responsavel: "Dr. João Silva",
        alertas: [],
      },
      {
        id: "2",
        caseId: "case-2",
        titulo: "Recurso de Apelação",
        descricao: "Prazo para interposição de recurso de apelação",
        dataLimite: "2024-02-18T23:59:59.000Z",
        tipo: "prazo_recursal",
        prioridade: "alta",
        status: "pendente",
        responsavel: "Dra. Maria Santos",
        alertas: [],
      },
      {
        id: "3",
        caseId: "case-3",
        titulo: "Audiência de Instrução",
        descricao: "Comparecimento à audiência de instrução e julgamento",
        dataLimite: "2024-02-20T14:30:00.000Z",
        tipo: "audiencia",
        prioridade: "media",
        status: "pendente",
        responsavel: "Dr. Carlos Oliveira",
        alertas: [],
      },
      {
        id: "4",
        caseId: "case-4",
        titulo: "Pagamento de Custas",
        descricao: "Pagamento de custas processuais",
        dataLimite: "2024-02-25T23:59:59.000Z",
        tipo: "pagamento",
        prioridade: "media",
        status: "pendente",
        responsavel: "Financeiro",
        alertas: [],
      },
      {
        id: "5",
        caseId: "case-5",
        titulo: "Protocolo de Petição",
        descricao: "Protocolo de petição de juntada de documentos",
        dataLimite: "2024-03-01T18:00:00.000Z",
        tipo: "protocolo",
        prioridade: "baixa",
        status: "pendente",
        responsavel: "Secretaria",
        alertas: [],
      },
    ];

    setDeadlines(mockDeadlines);
  }, []);

  const getDeadlineStatus = (deadline: Deadline) => {
    const now = new Date();
    const limitDate = new Date(deadline.dataLimite);
    const diffDays = Math.ceil(
      (limitDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays < 0) {
      return {
        status: "vencido",
        color: "text-red-600 bg-red-50 border-red-200",
        days: Math.abs(diffDays),
      };
    } else if (diffDays <= 3) {
      return {
        status: "urgente",
        color: "text-orange-600 bg-orange-50 border-orange-200",
        days: diffDays,
      };
    } else if (diffDays <= 7) {
      return {
        status: "próximo",
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        days: diffDays,
      };
    } else {
      return {
        status: "normal",
        color: "text-green-600 bg-green-50 border-green-200",
        days: diffDays,
      };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "text-red-600 bg-red-50 border-red-200";
      case "media":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "baixa":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "prazo_processual":
        return "Clock";
      case "prazo_recursal":
        return "ArrowUp";
      case "audiencia":
        return "Calendar";
      case "julgamento":
        return "Gavel";
      case "pagamento":
        return "CreditCard";
      case "protocolo":
        return "Upload";
      default:
        return "Clock";
    }
  };

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Sort deadlines by urgency and date
  const sortedDeadlines = deadlines
    .map((deadline) => ({
      ...deadline,
      statusInfo: getDeadlineStatus(deadline),
    }))
    .sort((a, b) => {
      // First sort by status (vencido, urgente, próximo, normal)
      const statusOrder = { vencido: 0, urgente: 1, próximo: 2, normal: 3 };
      const statusDiff =
        statusOrder[a.statusInfo.status as keyof typeof statusOrder] -
        statusOrder[b.statusInfo.status as keyof typeof statusOrder];

      if (statusDiff !== 0) return statusDiff;

      // Then sort by date
      return (
        new Date(a.dataLimite).getTime() - new Date(b.dataLimite).getTime()
      );
    })
    .slice(0, 5); // Show only first 5

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="border-b border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Controle de Prazos
            </h3>
            {deadlines.filter(
              (d) =>
                getDeadlineStatus(d).status === "vencido" ||
                getDeadlineStatus(d).status === "urgente",
            ).length > 0 && (
              <span className="ml-3 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {
                  deadlines.filter(
                    (d) =>
                      getDeadlineStatus(d).status === "vencido" ||
                      getDeadlineStatus(d).status === "urgente",
                  ).length
                }
              </span>
            )}
          </div>
          {onViewAll && (
            <Button variant="outline-secondary" size="sm" onClick={onViewAll}>
              Ver Todos
            </Button>
          )}
        </div>
      </div>

      <div className="p-6">
        {sortedDeadlines.length > 0 ? (
          <div className="space-y-4">
            {sortedDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-sm transition-shadow duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
                      <Lucide
                        icon={getTypeIcon(deadline.tipo) as any}
                        className="w-4 h-4 text-slate-600 dark:text-slate-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100">
                        {deadline.titulo}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {deadline.descricao}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(deadline.prioridade)}`}
                    >
                      {deadline.prioridade}
                    </span>
                  </div>
                </div>

                {/* Status and Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center">
                      <Lucide icon="User" className="w-3 h-3 mr-1" />
                      <span>{deadline.responsavel}</span>
                    </div>
                    <div className="flex items-center">
                      <Lucide icon="Calendar" className="w-3 h-3 mr-1" />
                      <span>{formatDateTime(deadline.dataLimite)}</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${deadline.statusInfo.color}`}
                    >
                      {deadline.statusInfo.status === "vencido" ? (
                        <>
                          <Lucide
                            icon="AlertTriangle"
                            className="w-3 h-3 mr-1"
                          />
                          Vencido há {deadline.statusInfo.days} dia
                          {deadline.statusInfo.days !== 1 ? "s" : ""}
                        </>
                      ) : deadline.statusInfo.status === "urgente" ? (
                        <>
                          <Lucide icon="Clock" className="w-3 h-3 mr-1" />
                          {deadline.statusInfo.days === 0
                            ? "Hoje"
                            : `${deadline.statusInfo.days} dia${deadline.statusInfo.days !== 1 ? "s" : ""}`}
                        </>
                      ) : deadline.statusInfo.status === "próximo" ? (
                        <>
                          <Lucide icon="Calendar" className="w-3 h-3 mr-1" />
                          {deadline.statusInfo.days} dia
                          {deadline.statusInfo.days !== 1 ? "s" : ""}
                        </>
                      ) : (
                        <>
                          <Lucide icon="CheckCircle" className="w-3 h-3 mr-1" />
                          {deadline.statusInfo.days} dia
                          {deadline.statusInfo.days !== 1 ? "s" : ""}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Lucide
              icon="Clock"
              className="w-12 h-12 text-slate-400 mx-auto mb-3"
            />
            <p className="text-slate-600 dark:text-slate-400">
              Nenhum prazo pendente
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Os prazos processuais aparecerão aqui
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeadlineTracker;
