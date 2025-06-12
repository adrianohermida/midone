import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Download,
  Filter,
  RefreshCw,
  Eye,
  PieChart,
  Activity,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
} from "lucide-react";
import Button from "../../components/Base/Button";
import { FormInput, FormSelect } from "../../components/Base/Form";
import { Tab } from "../../components/Base/Headless";
import ReportBarChart from "../../components/ReportBarChart";
import ReportDonutChart from "../../components/ReportDonutChart";
import ReportPieChart from "../../components/ReportPieChart";
import juridicoData from "../../data/juridico.json";

interface RelatorioData {
  produtividade: {
    periodo: string;
    processos_novos: number;
    processos_finalizados: number;
    prazos_cumpridos: number;
    prazos_perdidos: number;
    audiencias_realizadas: number;
    peticoes_protocoladas: number;
    taxa_sucesso: number;
  };
  por_area: Array<{
    area: string;
    total_processos: number;
    valor_total: number;
    taxa_sucesso: number;
    tempo_medio: number;
  }>;
  prazos: {
    periodo: string;
    total_prazos: number;
    cumpridos: number;
    vencidos: number;
    vencendo: number;
    percentual_cumprimento: number;
  };
  financeiro: {
    honorarios_mes: number;
    custas_mes: number;
    valor_causas: number;
    ticket_medio: number;
  };
}

const RelatoriosView: React.FC = () => {
  const [dadosRelatorio, setDadosRelatorio] = useState<RelatorioData | null>(
    null,
  );
  const [periodo, setPeriodo] = useState("mes_atual");
  const [tipoRelatorio, setTipoRelatorio] = useState("geral");
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    setDadosRelatorio(juridicoData.relatorios);
  }, []);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarPercentual = (valor: number) => {
    return `${valor.toFixed(1)}%`;
  };

  const gerarRelatorio = async () => {
    setAtualizando(true);
    // Simular geração de relatório
    setTimeout(() => {
      setAtualizando(false);
    }, 2000);
  };

  const exportarRelatorio = (formato: "pdf" | "excel") => {
    // Função para exportar relatório
    console.log(`Exportando relatório em ${formato}`);
  };

  if (!dadosRelatorio) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Relatórios Jurídicos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Análise completa de produtividade, prazos e indicadores
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline-secondary"
            onClick={gerarRelatorio}
            disabled={atualizando}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${atualizando ? "animate-spin" : ""}`}
            />
            {atualizando ? "Atualizando..." : "Atualizar"}
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => exportarRelatorio("pdf")}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            PDF
          </Button>
          <Button
            variant="primary"
            onClick={() => exportarRelatorio("excel")}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Excel
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <FormSelect
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="mes_atual">Mês Atual</option>
            <option value="mes_anterior">Mês Anterior</option>
            <option value="trimestre">Último Trimestre</option>
            <option value="semestre">Último Semestre</option>
            <option value="ano">Ano Atual</option>
            <option value="personalizado">Período Personalizado</option>
          </FormSelect>
          <FormSelect
            value={tipoRelatorio}
            onChange={(e) => setTipoRelatorio(e.target.value)}
          >
            <option value="geral">Relatório Geral</option>
            <option value="produtividade">Produtividade</option>
            <option value="prazos">Gestão de Prazos</option>
            <option value="financeiro">Financeiro</option>
            <option value="areas">Por Área Jurídica</option>
          </FormSelect>
          <FormSelect>
            <option value="">Todos os Responsáveis</option>
            <option value="joao">Dr. João Silva</option>
            <option value="ana">Dra. Ana Costa</option>
            <option value="rafael">Dr. Rafael Santos</option>
          </FormSelect>
          <Button
            variant="outline-secondary"
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtros Avançados
          </Button>
        </div>
      </div>

      {/* Tabs de Relatórios */}
      <Tab.Group>
        <Tab.List className="bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <Tab className="w-full py-2 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Visão Geral
            </div>
          </Tab>
          <Tab className="w-full py-2 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Produtividade
            </div>
          </Tab>
          <Tab className="w-full py-2 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Gestão de Prazos
            </div>
          </Tab>
          <Tab className="w-full py-2 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Financeiro
            </div>
          </Tab>
          <Tab className="w-full py-2 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Por Área
            </div>
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {/* Visão Geral */}
          <Tab.Panel>
            <div className="space-y-6">
              {/* Métricas Principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Processos Ativos
                      </p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {dadosRelatorio.por_area.reduce(
                          (acc, area) => acc + area.total_processos,
                          0,
                        )}
                      </p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Taxa de Sucesso
                      </p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {formatarPercentual(
                          dadosRelatorio.produtividade.taxa_sucesso,
                        )}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Valor em Causas
                      </p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">
                        {formatarMoeda(dadosRelatorio.financeiro.valor_causas)}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Cumprimento Prazos
                      </p>
                      <p className="text-2xl font-bold text-orange-600 mt-1">
                        {formatarPercentual(
                          dadosRelatorio.prazos.percentual_cumprimento,
                        )}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Gráficos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
                    Processos por Área Jurídica
                  </h3>
                  <ReportDonutChart />
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
                    Evolução Mensal - Processos
                  </h3>
                  <ReportBarChart />
                </div>
              </div>
            </div>
          </Tab.Panel>

          {/* Produtividade */}
          <Tab.Panel>
            <div className="space-y-6">
              {/* Métricas de Produtividade */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Novos Processos
                      </p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {dadosRelatorio.produtividade.processos_novos}
                      </p>
                      <div className="flex items-center mt-2 text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-xs">+12% vs mês anterior</span>
                      </div>
                    </div>
                    <FileText className="w-8 h-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Finalizados
                      </p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {dadosRelatorio.produtividade.processos_finalizados}
                      </p>
                      <div className="flex items-center mt-2 text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-xs">+8% vs mês anterior</span>
                      </div>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Audiências
                      </p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">
                        {dadosRelatorio.produtividade.audiencias_realizadas}
                      </p>
                      <div className="flex items-center mt-2 text-red-600">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        <span className="text-xs">-3% vs mês anterior</span>
                      </div>
                    </div>
                    <Users className="w-8 h-8 text-purple-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Petições
                      </p>
                      <p className="text-2xl font-bold text-orange-600 mt-1">
                        {dadosRelatorio.produtividade.peticoes_protocoladas}
                      </p>
                      <div className="flex items-center mt-2 text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-xs">+15% vs mês anterior</span>
                      </div>
                    </div>
                    <FileText className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Gráfico de Produtividade */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
                  Evolução da Produtividade - Últimos 6 Meses
                </h3>
                <ReportBarChart />
              </div>
            </div>
          </Tab.Panel>

          {/* Gestão de Prazos */}
          <Tab.Panel>
            <div className="space-y-6">
              {/* Métricas de Prazos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Total de Prazos
                      </p>
                      <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                        {dadosRelatorio.prazos.total_prazos}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-slate-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Cumpridos
                      </p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {dadosRelatorio.prazos.cumpridos}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {formatarPercentual(
                          (dadosRelatorio.prazos.cumpridos /
                            dadosRelatorio.prazos.total_prazos) *
                            100,
                        )}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Vencidos
                      </p>
                      <p className="text-2xl font-bold text-red-600 mt-1">
                        {dadosRelatorio.prazos.vencidos}
                      </p>
                      <p className="text-xs text-red-600 mt-1">
                        {formatarPercentual(
                          (dadosRelatorio.prazos.vencidos /
                            dadosRelatorio.prazos.total_prazos) *
                            100,
                        )}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Vencendo
                      </p>
                      <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {dadosRelatorio.prazos.vencendo}
                      </p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Próximos 7 dias
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Gráfico de Prazos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
                    Status dos Prazos
                  </h3>
                  <ReportPieChart />
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
                    Evolução do Cumprimento
                  </h3>
                  <ReportBarChart />
                </div>
              </div>
            </div>
          </Tab.Panel>

          {/* Financeiro */}
          <Tab.Panel>
            <div className="space-y-6">
              {/* Métricas Financeiras */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Honorários
                      </p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {formatarMoeda(
                          dadosRelatorio.financeiro.honorarios_mes,
                        )}
                      </p>
                      <div className="flex items-center mt-2 text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-xs">+18% vs mês anterior</span>
                      </div>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Custas
                      </p>
                      <p className="text-2xl font-bold text-red-600 mt-1">
                        {formatarMoeda(dadosRelatorio.financeiro.custas_mes)}
                      </p>
                      <div className="flex items-center mt-2 text-red-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-xs">+5% vs mês anterior</span>
                      </div>
                    </div>
                    <FileText className="w-8 h-8 text-red-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Valor das Causas
                      </p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">
                        {formatarMoeda(dadosRelatorio.financeiro.valor_causas)}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-500" />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Ticket Médio
                      </p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {formatarMoeda(dadosRelatorio.financeiro.ticket_medio)}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Gráficos Financeiros */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
                    Receita vs Custas - Últimos 6 Meses
                  </h3>
                  <ReportBarChart />
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
                    Distribuição de Receita por Área
                  </h3>
                  <ReportDonutChart />
                </div>
              </div>
            </div>
          </Tab.Panel>

          {/* Por Área */}
          <Tab.Panel>
            <div className="space-y-6">
              {/* Lista de Áreas */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                    Performance por Área Jurídica
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-slate-600 dark:text-slate-400">
                          Área
                        </th>
                        <th className="text-right p-4 font-medium text-slate-600 dark:text-slate-400">
                          Processos
                        </th>
                        <th className="text-right p-4 font-medium text-slate-600 dark:text-slate-400">
                          Valor Total
                        </th>
                        <th className="text-right p-4 font-medium text-slate-600 dark:text-slate-400">
                          Taxa Sucesso
                        </th>
                        <th className="text-right p-4 font-medium text-slate-600 dark:text-slate-400">
                          Tempo Médio
                        </th>
                        <th className="text-right p-4 font-medium text-slate-600 dark:text-slate-400">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {dadosRelatorio.por_area.map((area, index) => (
                        <tr
                          key={index}
                          className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        >
                          <td className="p-4">
                            <span className="font-medium text-slate-800 dark:text-slate-100">
                              {area.area}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <span className="font-medium">
                              {area.total_processos}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <span className="font-medium">
                              {formatarMoeda(area.valor_total)}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <span
                              className={`font-medium ${area.taxa_sucesso >= 90 ? "text-green-600" : area.taxa_sucesso >= 80 ? "text-yellow-600" : "text-red-600"}`}
                            >
                              {formatarPercentual(area.taxa_sucesso)}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <span className="font-medium">
                              {area.tempo_medio} meses
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="outline-secondary" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Gráfico por Área */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
                  Comparativo entre Áreas Jurídicas
                </h3>
                <ReportBarChart />
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default RelatoriosView;
