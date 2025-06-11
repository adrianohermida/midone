import React, { useState } from "react";
import type { ProcessMovement } from "@/types/legal-cases";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

interface TimelineEventProps {
  movement: ProcessMovement;
  onMarkAsRead?: (id: string) => void;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({
  movement,
  onMarkAsRead,
}) => {
  const [expanded, setExpanded] = useState(false);

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "despacho":
        return "FileText";
      case "decisao":
        return "Gavel";
      case "peticao":
        return "Upload";
      case "sentenca":
        return "Award";
      case "acordao":
        return "BookOpen";
      case "intimacao":
        return "Bell";
      case "citacao":
        return "Mail";
      case "julgamento":
        return "Scale";
      case "audiencia":
        return "Calendar";
      default:
        return "Circle";
    }
  };

  const getMovementColor = (type: string) => {
    switch (type) {
      case "despacho":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "decisao":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "peticao":
        return "text-green-600 bg-green-50 border-green-200";
      case "sentenca":
        return "text-red-600 bg-red-50 border-red-200";
      case "acordao":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "intimacao":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "citacao":
        return "text-cyan-600 bg-cyan-50 border-cyan-200";
      case "julgamento":
        return "text-indigo-600 bg-indigo-50 border-indigo-200";
      case "audiencia":
        return "text-pink-600 bg-pink-50 border-pink-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const downloadAttachment = async (attachment: any) => {
    try {
      // In a real app, this would call the API to download the file
      console.log("Downloading attachment:", attachment);
      // For now, just open in new tab if it's a URL
      if (attachment.url) {
        window.open(attachment.url, "_blank");
      }
    } catch (error) {
      console.error("Error downloading attachment:", error);
    }
  };

  return (
    <div
      className={`relative p-4 rounded-lg border transition-all duration-200 ${
        movement.lido
          ? "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
      }`}
    >
      {/* Timeline Connector */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700 -ml-px" />

      {/* Event Icon */}
      <div
        className={`absolute left-0 top-4 w-8 h-8 rounded-full border-2 flex items-center justify-center ${getMovementColor(movement.tipoMovimento)}`}
      >
        <Lucide
          icon={getMovementIcon(movement.tipoMovimento) as any}
          className="w-4 h-4"
        />
      </div>

      {/* Content */}
      <div className="ml-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getMovementColor(movement.tipoMovimento)}`}
              >
                {movement.tipoMovimento}
              </span>
              {!movement.lido && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                  Novo
                </span>
              )}
            </div>
            <h4 className="font-medium text-slate-900 dark:text-slate-100">
              {movement.descricao}
            </h4>
            <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center">
                <Lucide icon="Calendar" className="w-3 h-3 mr-1" />
                <span>{formatDate(movement.dataMovimento)}</span>
              </div>
              <div className="flex items-center">
                <Lucide icon="Building" className="w-3 h-3 mr-1" />
                <span>{movement.tribunal}</span>
              </div>
              <div className="flex items-center">
                <Lucide icon="MapPin" className="w-3 h-3 mr-1" />
                <span>{movement.vara}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            {!movement.lido && onMarkAsRead && (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => onMarkAsRead(movement.id)}
              >
                <Lucide icon="Check" className="w-3 h-3 mr-1" />
                Marcar como lido
              </Button>
            )}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setExpanded(!expanded)}
            >
              <Lucide
                icon={expanded ? "ChevronUp" : "ChevronDown"}
                className="w-4 h-4"
              />
            </Button>
          </div>
        </div>

        {/* Content Preview */}
        <div className="mb-3">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {expanded ? movement.conteudo : truncateText(movement.conteudo)}
          </p>
          {!expanded && movement.conteudo.length > 200 && (
            <button
              onClick={() => setExpanded(true)}
              className="text-sm text-primary hover:text-primary-700 mt-1"
            >
              Ver mais
            </button>
          )}
        </div>

        {/* Attachments */}
        {movement.anexos && movement.anexos.length > 0 && (
          <div className="mb-3">
            <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Anexos ({movement.anexos.length})
            </h5>
            <div className="space-y-2">
              {movement.anexos.map((anexo) => (
                <div
                  key={anexo.id}
                  className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-slate-200 dark:bg-slate-600 rounded">
                      <Lucide
                        icon="Paperclip"
                        className="w-3 h-3 text-slate-600 dark:text-slate-300"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {anexo.nome}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>{anexo.tipo}</span>
                        <span>•</span>
                        <span>{(anexo.tamanho / 1024).toFixed(1)} KB</span>
                        {anexo.isPublico && (
                          <>
                            <span>•</span>
                            <span className="text-green-600 dark:text-green-400">
                              Público
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => downloadAttachment(anexo)}
                  >
                    <Lucide icon="Download" className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expanded Actions */}
        {expanded && (
          <div className="flex items-center space-x-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <Button variant="outline-secondary" size="sm">
              <Lucide icon="Share" className="w-3 h-3 mr-1" />
              Compartilhar
            </Button>
            <Button variant="outline-secondary" size="sm">
              <Lucide icon="MessageCircle" className="w-3 h-3 mr-1" />
              Comentar
            </Button>
            <Button variant="outline-secondary" size="sm">
              <Lucide icon="Bookmark" className="w-3 h-3 mr-1" />
              Favoritar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineEvent;
