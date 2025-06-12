import React, { useState } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import ResponsiveCard from '@/components/ResponsiveCard';
import ResponsiveGrid from '@/components/ResponsiveGrid';
import { 
  Settings, 
  Users, 
  Shield, 
  Database, 
  Activity, 
  Bell, 
  Plug, 
  BookOpen,
  UserPlus,
  Key,
  Monitor,
  Server,
  Mail,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  RefreshCw,
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  Archive,
  Trash2,
  Edit,
  Eye,
  Lock,
  Unlock,
  Home,
  Globe
} from 'lucide-react';
import Button from '@/components/Base/Button';
import { FormInput, FormSelect } from '@/components/Base/Form';
import { Tab } from '@/components/Base/Headless';
import Table from '@/components/Base/Table';
import Alert from '@/components/Base/Alert';
import Lucide from '@/components/Base/Lucide';
import { Slideover } from '@/components/Base/Headless';
import clsx from 'clsx';

const AdministracaoD ashboardMobileFriendly: React.FC = () => {
  const { 
    deviceType, 
    isMobile, 
    isTablet, 
    isDesktop, 
    isUltrawide,
    getGridCols,
    getPadding,
    getOptimalItemsPerPage
  } = useResponsive();

  // Estados
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [showUserForm, setShowUserForm] = useState(false);
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Dados mock
  const systemMetrics = [
    {
      title: 'Usuários Ativos',
      value: '847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      description: 'Usuários conectados hoje'
    },
    {
      title: 'Sistema Operacional',
      value: '99.9%',
      change: '100%',
      trend: 'up',
      icon: Monitor,
      color: 'green',
      description: 'Uptime do sistema'
    },
    {
      title: 'Segurança',
      value: '0',
      change: '-3',
      trend: 'down',
      icon: Shield,
      color: 'red',
      description: 'Alertas de segurança'
    },
    {
      title: 'Armazenamento',
      value: '67%',
      change: '+5%',
      trend: 'up',
      icon: Database,
      color: 'yellow',
      description: 'Uso do disco'
    },
    {
      title: 'Backups',
      value: '24',
      change: 'OK',
      trend: 'stable',
      icon: Archive,
      color: 'purple',
      description: 'Backups realizados'
    },
    {
      title: 'Integrações',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Plug,
      color: 'indigo',
      description: 'APIs conectadas'
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: 'Dr. Ana Silva',
      email: 'ana.silva@lawdesk.com',
      role: 'Advogada Senior',
      status: 'Ativo',
      lastLogin: '5 min atrás',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Carlos Santos',
      email: 'carlos.santos@lawdesk.com',
      role: 'Paralegal',
      status: 'Ativo',
      lastLogin: '2h atrás',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Maria Oliveira',
      email: 'maria.oliveira@lawdesk.com',
      role: 'Secretária',
      status: 'Inativo',
      lastLogin: '1 dia atrás',
      avatar: '👩‍💻'
    },
    {
      id: 4,
      name: 'João Pereira',
      email: 'joao.pereira@lawdesk.com',
      role: 'Administrador',
      status: 'Ativo',
      lastLogin: '10 min atrás',
      avatar: '👨‍💻'
    }
  ];

  const systemLogs = [
    {
      id: 1,
      type: 'info',
      message: 'Backup automático realizado com sucesso',
      timestamp: '2024-01-15 14:30:22',
      user: 'Sistema',
      icon: Archive
    },
    {
      id: 2,
      type: 'warning',
      message: 'Tentativa de login falhada para usuario@teste.com',
      timestamp: '2024-01-15 14:25:15',
      user: 'Sistema de Segurança',
      icon: AlertTriangle
    },
    {
      id: 3,
      type: 'success',
      message: 'Novo usuário criado: Ana Silva',
      timestamp: '2024-01-15 14:20:10',
      user: 'João Pereira',
      icon: UserPlus
    },
    {
      id: 4,
      type: 'info',
      message: 'Configuração de email atualizada',
      timestamp: '2024-01-15 14:15:05',
      user: 'Carlos Santos',
      icon: Mail
    }
  ];

  // Header responsivo
  const renderHeader = () => (
    <div className={clsx([
      "flex flex-col space-y-4",
      isMobile ? "space-y-3" : "md:flex-row md:items-center md:justify-between md:space-y-0"
    ])}>
      <div>
        <h1 className={clsx([
          "font-bold text-slate-800 dark:text-slate-100",
          isMobile ? "text-xl" : "text-2xl lg:text-3xl"
        ])}>
          🔧 Administração do Sistema
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Gerencie usuários, configurações e monitore o sistema
        </p>
      </div>

      <div className={clsx([
        "flex items-center space-x-2",
        isMobile ? "justify-between" : "justify-end"
      ])}>
        {!isMobile && (
          <FormSelect
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-32"
          >
            <option value="7d">7 dias</option>
            <option value="30d">30 dias</option>
            <option value="90d">90 dias</option>
          </FormSelect>
        )}
        
        <Button
          variant="primary"
          size={isMobile ? "sm" : "md"}
          onClick={() => setShowUserForm(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          {!isMobile && <span>Novo Usuário</span>}
        </Button>

        <Button
          variant="outline-secondary"
          size={isMobile ? "sm" : "md"}
          onClick={() => setShowConfigForm(true)}
          className="flex items-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          {!isMobile && <span>Configurações</span>}
        </Button>
      </div>
    </div>
  );

  // Navegação por abas responsiva
  const renderTabs = () => {
    const tabs = [
      { id: 'visao-geral', label: 'Visão Geral', icon: Home },
      { id: 'usuarios', label: 'Usuários', icon: Users },
      { id: 'configuracoes', label: 'Configurações', icon: Settings },
      { id: 'seguranca', label: 'Segurança', icon: Shield },
      { id: 'logs', label: 'Logs', icon: Activity },
      { id: 'backups', label: 'Backups', icon: Archive }
    ];

    return (
      <Tab.Group>
        <Tab.List className={clsx([
          "flex bg-slate-200 dark:bg-darkmode-600 rounded-lg p-1",
          isMobile ? "overflow-x-auto" : "justify-center"
        ])}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Tab
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={({ selected }) =>
                  clsx([
                    "flex items-center space-x-2 px-3 py-2 rounded-md transition-all",
                    isMobile ? "min-w-max" : "flex-1 justify-center",
                    selected
                      ? "bg-white dark:bg-darkmode-400 text-primary shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  ])
                }
              >
                <Icon className="w-4 h-4" />
                {(isDesktop || isUltrawide) && <span>{tab.label}</span>}
                {isMobile && <span className="text-xs">{tab.label}</span>}
                {isTablet && <span className="hidden sm:block">{tab.label}</span>}
              </Tab>
            );
          })}
        </Tab.List>
      </Tab.Group>
    );
  };

  // Conteúdo das abas
  const renderTabContent = () => {
    switch (activeTab) {
      case 'visao-geral':
        return (
          <div className="space-y-6">
            {/* Métricas principais */}
            <ResponsiveGrid
              title="Métricas do Sistema"
              columns={{
                mobile: 2,
                tablet: 3,
                desktop: 3,
                ultrawide: 6
              }}
            >
              {systemMetrics.map((metric, index) => (
                <ResponsiveCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  trend={metric.trend}
                  icon={metric.icon}
                  color={metric.color}
                  size={isMobile ? 'sm' : 'md'}
                >
                  <p className="text-xs text-slate-500 mt-2">{metric.description}</p>
                </ResponsiveCard>
              ))}
            </ResponsiveGrid>

            {/* Alertas do sistema */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Alert variant="warning" className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-3" />
                <div>
                  <h4 className="font-medium">Backup Pendente</h4>
                  <p className="text-sm mt-1">O último backup foi há 2 dias. Considere executar um backup manual.</p>
                </div>
              </Alert>

              <Alert variant="success" className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3" />
                <div>
                  <h4 className="font-medium">Sistema Atualizado</h4>
                  <p className="text-sm mt-1">Todas as atualizações de segurança foram aplicadas.</p>
                </div>
              </Alert>
            </div>

            {/* Gráficos rápidos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-darkmode-600 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Atividade dos Usuários (7 dias)</h3>
                <div className="h-48 flex items-end justify-between space-x-2">
                  {[65, 45, 78, 52, 89, 67, 94].map((height, index) => (
                    <div
                      key={index}
                      className="bg-primary/20 rounded-t flex-1 flex items-end"
                      style={{ height: `${height}%` }}
                    >
                      <div className="w-full bg-primary rounded-t h-4"></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>Seg</span>
                  <span>Ter</span>
                  <span>Qua</span>
                  <span>Qui</span>
                  <span>Sex</span>
                  <span>Sáb</span>
                  <span>Dom</span>
                </div>
              </div>

              <div className="bg-white dark:bg-darkmode-600 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Status dos Serviços</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Servidor Web', status: 'online', uptime: '99.9%' },
                    { name: 'Banco de Dados', status: 'online', uptime: '99.8%' },
                    { name: 'Email', status: 'online', uptime: '99.5%' },
                    { name: 'Backup', status: 'warning', uptime: '98.2%' }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={clsx([
                          "w-3 h-3 rounded-full",
                          service.status === 'online' ? "bg-green-500" : "bg-yellow-500"
                        ])}></div>
                        <span className="text-sm font-medium">{service.name}</span>
                      </div>
                      <span className="text-sm text-slate-500">{service.uptime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'usuarios':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h3 className="text-lg font-semibold">Gestão de Usuários</h3>
                <p className="text-slate-600 dark:text-slate-400">Gerencie usuários, permissões e perfis de acesso</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <FormInput
                    type="text"
                    placeholder="Buscar usuários..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline-secondary" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-darkmode-600 rounded-lg overflow-hidden">
              <Table className="table-auto">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Usuário</Table.Th>
                    <Table.Th>Função</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Último Acesso</Table.Th>
                    <Table.Th>Ações</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {recentUsers.map((user) => (
                    <Table.Tr key={user.id}>
                      <Table.Td>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-sm">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-slate-500">{user.email}</div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </Table.Td>
                      <Table.Td>
                        <span className={clsx([
                          "px-2 py-1 text-xs rounded-full",
                          user.status === 'Ativo' 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        ])}>
                          {user.status}
                        </span>
                      </Table.Td>
                      <Table.Td className="text-sm text-slate-500">
                        {user.lastLogin}
                      </Table.Td>
                      <Table.Td>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline-secondary" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline-secondary" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="outline-secondary" size="sm">
                            {user.status === 'Ativo' ? 
                              <Lock className="w-3 h-3" /> : 
                              <Unlock className="w-3 h-3" />
                            }
                          </Button>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </div>
        );

      case 'logs':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h3 className="text-lg font-semibold">Logs do Sistema</h3>
                <p className="text-slate-600 dark:text-slate-400">Monitore atividades e eventos do sistema</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline-secondary" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline-secondary" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {systemLogs.map((log) => {
                const Icon = log.icon;
                return (
                  <div key={log.id} className="bg-white dark:bg-darkmode-600 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className={clsx([
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        log.type === 'success' && "bg-green-100 text-green-600",
                        log.type === 'warning' && "bg-yellow-100 text-yellow-600",
                        log.type === 'info' && "bg-blue-100 text-blue-600",
                        log.type === 'error' && "bg-red-100 text-red-600"
                      ])}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{log.message}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                          <span>{log.timestamp}</span>
                          <span>•</span>
                          <span>{log.user}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <Settings className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Em Desenvolvimento</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Esta seção está sendo desenvolvida e estará disponível em breve.
            </p>
          </div>
        );
    }
  };

  // Slideover para novo usuário
  const renderUserForm = () => (
    <Slideover
      open={showUserForm}
      onClose={() => setShowUserForm(false)}
      size={isMobile ? "md" : "lg"}
    >
      <Slideover.Panel>
        <Slideover.Title className="flex items-center space-x-2">
          <UserPlus className="w-5 h-5" />
          <span>Novo Usuário</span>
        </Slideover.Title>
        
        <Slideover.Description>
          Adicione um novo usuário ao sistema com permissões específicas.
        </Slideover.Description>

        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome Completo</label>
              <FormInput type="text" placeholder="Digite o nome completo" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <FormInput type="email" placeholder="usuario@lawdesk.com" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Função</label>
              <FormSelect>
                <option>Advogado</option>
                <option>Paralegal</option>
                <option>Secretária</option>
                <option>Administrador</option>
              </FormSelect>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Departamento</label>
              <FormSelect>
                <option>Jurídico</option>
                <option>Financeiro</option>
                <option>Administrativo</option>
                <option>TI</option>
              </FormSelect>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-6 border-t">
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowUserForm(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary">
              Criar Usuário
            </Button>
          </div>
        </div>
      </Slideover.Panel>
    </Slideover>
  );

  return (
    <div className={getPadding()}>
      {/* Header */}
      {renderHeader()}

      {/* Navegação por abas */}
      <div className="mt-6">
        {renderTabs()}
      </div>

      {/* Conteúdo das abas */}
      <div className="mt-6">
        {renderTabContent()}
      </div>

      {/* Slideovers */}
      {renderUserForm()}

      {/* FAB para mobile */}
      {isMobile && (
        <Button
          variant="primary"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50"
          onClick={() => setShowUserForm(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default AdministracaoD ashboardMobileFriendly;