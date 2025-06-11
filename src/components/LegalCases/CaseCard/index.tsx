import React from "react";
import type { LegalCase, CaseStatus } from "@/types/legal-cases";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";

interface CaseCardProps {
  case: LegalCase;
  onClick?: () => void;
  onStatusChange?: (status: CaseStatus) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({
  case: case_,
  onClick,
  onStatusChange,
}) => {
  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case "ativo":
        return "text-green-600 bg-green-50 border-green-200";
      case "suspenso":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "arquivado":
        return "text-slate-600 bg-slate-50 border-slate-200";
      case "finalizado":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "em_recurso":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
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

  const getLegalAreaIcon = (area: string) => {
    switch (area) {
      case "civil":
        return "Scale";
      case "trabalhista":
        return "Briefcase";
      case "criminal":
        return "Shield";
      case "tributario":
        return "Calculator";
      case "familia":
        return "Heart";
      case "consumidor":
        return "ShoppingCart";
      case "previdenciario":
        return "Users";
      case "administrativo":
        return "Building";
      case "empresarial":
        return "Building2";
      case "ambiental":
        return "Leaf";
      default:
        return "FileText";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <Lucide
                icon={getLegalAreaIcon(case_.area) as any}
                className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0"
              />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {case_.area}
              </span>
            </div>
            <h3
              className="text-lg font-semibold text-slate-900 dark:text-slate-100 cursor-pointer hover:text-primary transition-colors duration-200 line-clamp-2"
              onClick={onClick}
            >
              {case_.titulo}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-mono mt-1">
              {case_.numeroProcesso}
            </p>
          </div>

          <Menu>
            <Menu.Button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <Lucide icon="MoreVertical" className="w-5 h-5" />
            </Menu.Button>
            <Menu.Items className="w-48">
              <Menu.Item onClick={onClick}>
                <Lucide icon="Eye" className="w-4 h-4 mr-3" />
                Ver Detalhes
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Edit3" className="w-4 h-4 mr-3" />
                Editar
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Clock" className="w-4 h-4 mr-3" />
                Timeline
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-3" />
                Documentos
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>

        {/* Status & Priority */}
        <div className="flex items-center space-x-2 mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(case_.status)}`}
          >
            {case_.status}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(case_.prioridade)}`}
          >
            {case_.prioridade}
          </span>
        </div>

        {/* Client Info */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <Lucide icon="User" className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{case_.cliente.nome}</span>
          </div>
        </div>

        {/* Court Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <Lucide icon="Building" className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{case_.tribunal}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <Lucide icon="MapPin" className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{case_.vara}</span>
          </div>
        </div>

        {/* Tags */}
        {case_.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {case_.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
              {case_.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                  +{case_.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
            <Lucide icon="Calendar" className="w-3 h-3 mr-1" />
            <span>Atualizado em {formatDate(case_.updatedAt)}</span>
          </div>

          <div className="flex items-center space-x-2">
            {case_.prioridade === "alta" && (
              <div className="flex items-center text-xs text-red-600">
                <Lucide icon="AlertTriangle" className="w-3 h-3 mr-1" />
                <span>Urgente</span>
              </div>
            )}

            <button
              onClick={onClick}
              className="text-xs font-medium text-primary hover:text-primary-700 transition-colors duration-200"
            >
              Ver mais →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
