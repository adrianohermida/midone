import _ from "lodash";
import { useRef } from "react";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import { FormSwitch } from "@/components/Base/Form";
import Progress from "@/components/Base/Progress";
import TinySlider, { TinySliderElement } from "@/components/Base/TinySlider";
import Lucide from "@/components/Base/Lucide";
import FileIcon from "@/components/Base/FileIcon";
import { Menu, Tab } from "@/components/Base/Headless";
import SimpleLineChart from "@/components/SimpleLineChart";
import ReportDonutChart from "@/components/ReportDonutChart";

function Main() {
  const recentCasesRef = useRef<TinySliderElement>();
  const upcomingHearingsRef = useRef<TinySliderElement>();

  const prevRecentCases = () => {
    recentCasesRef.current?.tns.goTo("prev");
  };
  const nextRecentCases = () => {
    recentCasesRef.current?.tns.goTo("next");
  };
  const prevUpcomingHearings = () => {
    upcomingHearingsRef.current?.tns.goTo("prev");
  };
  const nextUpcomingHearings = () => {
    upcomingHearingsRef.current?.tns.goTo("next");
  };

  const lawyerData = {
    name: "Dr. João Silva",
    oab: "OAB/SP 123.456",
    specialization: "Direito Civil e Empresarial",
    experience: "15 anos",
    email: "joao.silva@lawdesk.com.br",
    phone: "(11) 99999-1234",
    cases: {
      active: 45,
      won: 128,
      pending: 12,
      total: 185,
    },
    performance: {
      successRate: 89,
      clientSatisfaction: 95,
      avgCaseDuration: 8.5,
      revenue: 450000,
    },
  };

  const recentCases = [
    {
      id: 1,
      number: "001/2024",
      client: "João Silva",
      type: "Ação de Cobrança",
      status: "Em andamento",
      value: 15000,
      lastUpdate: "2 dias atrás",
    },
    {
      id: 2,
      number: "002/2024",
      client: "Maria Santos",
      type: "Rescisão Contratual",
      status: "Audiência marcada",
      value: 25000,
      lastUpdate: "1 dia atrás",
    },
    {
      id: 3,
      number: "003/2024",
      client: "Carlos Lima",
      type: "Danos Morais",
      status: "Aguardando sentença",
      value: 50000,
      lastUpdate: "3 horas atrás",
    },
  ];

  const upcomingHearings = [
    {
      id: 1,
      case: "001/2024",
      client: "João Silva",
      date: "2024-02-15",
      time: "14:00",
      court: "1ª Vara Cível",
      type: "Audiência de Instrução",
    },
    {
      id: 2,
      case: "005/2024",
      client: "Ana Costa",
      date: "2024-02-16",
      time: "10:30",
      court: "2ª Vara Trabalhista",
      type: "Audiência de Conciliação",
    },
    {
      id: 3,
      case: "007/2024",
      client: "Roberto Alves",
      date: "2024-02-18",
      time: "15:00",
      court: "Tribunal de Justiça",
      type: "Julgamento de Recurso",
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Perfil do Advogado</h2>
      </div>
      <Tab.Group>
        {/* BEGIN: Profile Info */}
        <div className="px-5 pt-5 mt-5 intro-y box">
          <div className="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
            <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
              <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit">
                <img
                  alt="Perfil do Advogado"
                  className="rounded-full"
                  src={fakerData[0].photos[0]}
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-success border-2 border-white rounded-full"></div>
              </div>
              <div className="ml-5">
                <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                  {lawyerData.name}
                </div>
                <div className="text-slate-500">{lawyerData.oab}</div>
                <div className="text-slate-600 mt-1">
                  {lawyerData.specialization}
                </div>
                <div className="text-slate-500 text-sm mt-1">
                  {lawyerData.experience} de experiência
                </div>
              </div>
            </div>

            <div className="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
              <div className="font-medium text-center lg:text-left lg:mt-3">
                Informações de Contato
              </div>
              <div className="flex flex-col items-center justify-center mt-4 lg:items-start">
                <div className="flex items-center truncate sm:whitespace-normal">
                  <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                  {lawyerData.email}
                </div>
                <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                  <Lucide icon="Phone" className="w-4 h-4 mr-2" />
                  {lawyerData.phone}
                </div>
                <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                  <Lucide icon="MapPin" className="w-4 h-4 mr-2" />
                  São Paulo - SP
                </div>
                <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                  <Lucide icon="Calendar" className="w-4 h-4 mr-2" />
                  Último acesso: 2 horas atrás
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center flex-1 px-5 pt-5 mt-6 border-t lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0">
              <div className="w-20 py-3 text-center rounded-md">
                <div className="text-xl font-medium text-primary">
                  {lawyerData.cases.active}
                </div>
                <div className="text-slate-500">Casos Ativos</div>
              </div>
              <div className="w-20 py-3 text-center rounded-md">
                <div className="text-xl font-medium text-success">
                  {lawyerData.cases.won}
                </div>
                <div className="text-slate-500">Casos Ganhos</div>
              </div>
              <div className="w-20 py-3 text-center rounded-md">
                <div className="text-xl font-medium text-warning">
                  {lawyerData.cases.pending}
                </div>
                <div className="text-slate-500">Pendentes</div>
              </div>
            </div>
          </div>

          <Tab.List
            variant="link-tabs"
            className="flex-col justify-center text-center sm:flex-row lg:justify-start"
          >
            <Tab fullWidth={false}>
              <Tab.Button className="flex items-center py-4 cursor-pointer">
                <Lucide icon="User" className="w-4 h-4 mr-2" /> Perfil
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="flex items-center py-4 cursor-pointer">
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Casos
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="flex items-center py-4 cursor-pointer">
                <Lucide icon="Calendar" className="w-4 h-4 mr-2" /> Agenda
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="flex items-center py-4 cursor-pointer">
                <Lucide icon="BarChart" className="w-4 h-4 mr-2" /> Performance
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="flex items-center py-4 cursor-pointer">
                <Lucide icon="Settings" className="w-4 h-4 mr-2" />{" "}
                Configurações
              </Tab.Button>
            </Tab>
          </Tab.List>
        </div>
        {/* END: Profile Info */}

        <Tab.Panels>
          <Tab.Panel>
            <div className="grid grid-cols-12 gap-6 mt-5">
              {/* Performance Cards */}
              <div className="col-span-12 lg:col-span-6 2xl:col-span-3 intro-y">
                <div className="p-5 box">
                  <div className="flex items-center">
                    <div className="flex-none w-2/4">
                      <div className="text-lg font-medium truncate">
                        Taxa de Sucesso
                      </div>
                      <div className="mt-1 text-slate-500">
                        {lawyerData.performance.successRate}%
                      </div>
                    </div>
                    <div className="relative flex-none ml-auto">
                      <ReportDonutChart width={90} height={90} />
                      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-medium">
                        {lawyerData.performance.successRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6 2xl:col-span-3 intro-y">
                <div className="p-5 box">
                  <div className="flex">
                    <div className="mr-3 text-lg font-medium truncate">
                      Satisfação Cliente
                    </div>
                    <div className="flex items-center px-2 py-1 ml-auto text-xs truncate rounded-full cursor-pointer bg-slate-100 dark:bg-darkmode-400 text-slate-500">
                      {lawyerData.performance.clientSatisfaction}%
                    </div>
                  </div>
                  <div className="mt-1">
                    <SimpleLineChart height={58} className="-ml-1" />
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6 2xl:col-span-3 intro-y">
                <div className="p-5 box">
                  <div className="flex items-center">
                    <div className="flex-none w-2/4">
                      <div className="text-lg font-medium truncate">
                        Receita Anual
                      </div>
                      <div className="mt-1 text-slate-500">
                        {formatCurrency(lawyerData.performance.revenue)}
                      </div>
                    </div>
                    <div className="relative flex-none ml-auto">
                      <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                        <Lucide
                          icon="DollarSign"
                          className="w-6 h-6 text-success"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6 2xl:col-span-3 intro-y">
                <div className="p-5 box">
                  <div className="flex">
                    <div className="mr-3 text-lg font-medium truncate">
                      Duração Média Casos
                    </div>
                    <div className="flex items-center px-2 py-1 ml-auto text-xs truncate rounded-full cursor-pointer bg-slate-100 dark:bg-darkmode-400 text-slate-500">
                      {lawyerData.performance.avgCaseDuration} meses
                    </div>
                  </div>
                  <div className="mt-1">
                    <SimpleLineChart height={58} className="-ml-1" />
                  </div>
                </div>
              </div>

              {/* Recent Cases */}
              <div className="col-span-12 mt-6">
                <div className="items-center block h-10 intro-y sm:flex">
                  <h2 className="mr-5 text-lg font-medium truncate">
                    Casos Recentes
                  </h2>
                  <div className="flex items-center mt-3 sm:ml-auto sm:mt-0">
                    <Button className="flex items-center !box text-slate-600 dark:text-slate-300">
                      <Lucide
                        icon="FileText"
                        className="hidden w-4 h-4 mr-2 sm:block"
                      />
                      Ver Todos os Casos
                    </Button>
                  </div>
                </div>
                <div className="mt-8 overflow-auto intro-y lg:overflow-visible sm:mt-0">
                  <div className="min-w-screen max-w-none sm:max-w-none">
                    <TinySlider ref={recentCasesRef}>
                      {recentCases.map((legalCase, caseKey) => (
                        <div key={caseKey} className="p-5 mr-6 intro-y box">
                          <div className="flex items-center border-b border-slate-200 dark:border-darkmode-400 pb-4 mb-4">
                            <div className="font-medium text-base">
                              Caso {legalCase.number}
                            </div>
                            <div className="ml-auto text-xs text-slate-500">
                              {legalCase.lastUpdate}
                            </div>
                          </div>
                          <div className="text-slate-600 dark:text-slate-500">
                            <div className="flex items-center mb-2">
                              <Lucide icon="User" className="w-4 h-4 mr-2" />
                              <span className="text-sm">
                                {legalCase.client}
                              </span>
                            </div>
                            <div className="flex items-center mb-2">
                              <Lucide icon="Scale" className="w-4 h-4 mr-2" />
                              <span className="text-sm">{legalCase.type}</span>
                            </div>
                            <div className="flex items-center mb-2">
                              <Lucide
                                icon="DollarSign"
                                className="w-4 h-4 mr-2"
                              />
                              <span className="text-sm">
                                {formatCurrency(legalCase.value)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Lucide
                                icon="Activity"
                                className="w-4 h-4 mr-2"
                              />
                              <span className="text-sm">
                                {legalCase.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TinySlider>
                  </div>
                  <div className="flex justify-center mt-8 sm:justify-end">
                    <div className="flex items-center">
                      <div className="mr-2 text-slate-600">Casos Recentes</div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="cursor-pointer w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center"
                          onClick={prevRecentCases}
                        >
                          <Lucide icon="ChevronLeft" className="w-3 h-3" />
                        </div>
                        <div
                          className="cursor-pointer w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center"
                          onClick={nextRecentCases}
                        >
                          <Lucide icon="ChevronRight" className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Hearings */}
              <div className="col-span-12 mt-6">
                <div className="items-center block h-10 intro-y sm:flex">
                  <h2 className="mr-5 text-lg font-medium truncate">
                    Próximas Audiências
                  </h2>
                  <div className="flex items-center mt-3 sm:ml-auto sm:mt-0">
                    <Button className="flex items-center !box text-slate-600 dark:text-slate-300">
                      <Lucide
                        icon="Calendar"
                        className="hidden w-4 h-4 mr-2 sm:block"
                      />
                      Ver Agenda Completa
                    </Button>
                  </div>
                </div>
                <div className="mt-8 overflow-auto intro-y lg:overflow-visible sm:mt-0">
                  <div className="min-w-screen max-w-none sm:max-w-none">
                    <TinySlider ref={upcomingHearingsRef}>
                      {upcomingHearings.map((hearing, hearingKey) => (
                        <div key={hearingKey} className="p-5 mr-6 intro-y box">
                          <div className="flex items-center border-b border-slate-200 dark:border-darkmode-400 pb-4 mb-4">
                            <div className="font-medium text-base">
                              {hearing.case}
                            </div>
                            <div className="ml-auto">
                              <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                {new Date(hearing.date).toLocaleDateString(
                                  "pt-BR",
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="text-slate-600 dark:text-slate-500">
                            <div className="flex items-center mb-2">
                              <Lucide icon="User" className="w-4 h-4 mr-2" />
                              <span className="text-sm">{hearing.client}</span>
                            </div>
                            <div className="flex items-center mb-2">
                              <Lucide icon="Clock" className="w-4 h-4 mr-2" />
                              <span className="text-sm">{hearing.time}</span>
                            </div>
                            <div className="flex items-center mb-2">
                              <Lucide icon="MapPin" className="w-4 h-4 mr-2" />
                              <span className="text-sm">{hearing.court}</span>
                            </div>
                            <div className="flex items-center">
                              <Lucide
                                icon="FileText"
                                className="w-4 h-4 mr-2"
                              />
                              <span className="text-sm">{hearing.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TinySlider>
                  </div>
                  <div className="flex justify-center mt-8 sm:justify-end">
                    <div className="flex items-center">
                      <div className="mr-2 text-slate-600">
                        Próximas Audiências
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="cursor-pointer w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center"
                          onClick={prevUpcomingHearings}
                        >
                          <Lucide icon="ChevronLeft" className="w-3 h-3" />
                        </div>
                        <div
                          className="cursor-pointer w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center"
                          onClick={nextUpcomingHearings}
                        >
                          <Lucide icon="ChevronRight" className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="mt-5 intro-y">
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                <span>Gestão de Casos em desenvolvimento...</span>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="mt-5 intro-y">
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Lucide icon="Calendar" className="w-4 h-4 mr-2" />
                <span>Agenda detalhada em desenvolvimento...</span>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="mt-5 intro-y">
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Lucide icon="BarChart" className="w-4 h-4 mr-2" />
                <span>Relatórios de performance em desenvolvimento...</span>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="mt-5 intro-y">
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Lucide icon="Settings" className="w-4 h-4 mr-2" />
                <span>Configurações do perfil em desenvolvimento...</span>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

export default Main;
