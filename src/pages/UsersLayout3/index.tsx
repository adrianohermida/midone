import _ from "lodash";
import { useState } from "react";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import Pagination from "@/components/Base/Pagination";
import { FormInput, FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { Menu, Dialog } from "@/components/Base/Headless";

// Mock legal team data
const legalTeam = [
  {
    id: 1,
    name: "Dr. João Silva",
    oab: "OAB/SP 123.456",
    role: "Advogado Sênior",
    specialization: "Direito Civil e Empresarial",
    email: "joao.silva@lawdesk.com.br",
    phone: "(11) 99999-1234",
    photo: fakerData[0].photos[0],
    cases: 45,
    experience: "15 anos",
    status: "Ativo",
    lastLogin: "2 horas atrás",
  },
  {
    id: 2,
    name: "Dra. Maria Santos",
    oab: "OAB/RJ 234.567",
    role: "Sócia-Diretora",
    specialization: "Direito Trabalhista",
    email: "maria.santos@lawdesk.com.br",
    phone: "(21) 98888-5678",
    photo: fakerData[1].photos[0],
    cases: 78,
    experience: "20 anos",
    status: "Ativo",
    lastLogin: "30 min atrás",
  },
  {
    id: 3,
    name: "Dr. Carlos Lima",
    oab: "OAB/MG 345.678",
    role: "Advogado Pleno",
    specialization: "Direito Penal",
    email: "carlos.lima@lawdesk.com.br",
    phone: "(31) 97777-9012",
    photo: fakerData[2].photos[0],
    cases: 32,
    experience: "8 anos",
    status: "Ativo",
    lastLogin: "1 hora atrás",
  },
  {
    id: 4,
    name: "Ana Costa",
    oab: "Em processo",
    role: "Estagiária de Direito",
    specialization: "Direito do Consumidor",
    email: "ana.costa@lawdesk.com.br",
    phone: "(11) 96666-3456",
    photo: fakerData[3].photos[0],
    cases: 8,
    experience: "6 meses",
    status: "Ativo",
    lastLogin: "15 min atrás",
  },
  {
    id: 5,
    name: "Roberto Alves",
    oab: "OAB/ES 456.789",
    role: "Advogado Júnior",
    specialization: "Direito Tributário",
    email: "roberto.alves@lawdesk.com.br",
    phone: "(27) 95555-7890",
    photo: fakerData[4].photos[0],
    cases: 18,
    experience: "3 anos",
    status: "Ativo",
    lastLogin: "4 horas atrás",
  },
  {
    id: 6,
    name: "Lucia Fernandes",
    oab: "OAB/PR 567.890",
    role: "Advogada Sênior",
    specialization: "Direito de Família",
    email: "lucia.fernandes@lawdesk.com.br",
    phone: "(41) 94444-2345",
    photo: fakerData[5].photos[0],
    cases: 56,
    experience: "12 anos",
    status: "Férias",
    lastLogin: "3 dias atrás",
  },
  {
    id: 7,
    name: "Pedro Oliveira",
    oab: "Não se aplica",
    role: "Secretário Jurídico",
    specialization: "Apoio Administrativo",
    email: "pedro.oliveira@lawdesk.com.br",
    phone: "(11) 93333-6789",
    photo: fakerData[6].photos[0],
    cases: 0,
    experience: "5 anos",
    status: "Ativo",
    lastLogin: "1 hora atrás",
  },
  {
    id: 8,
    name: "Sandra Silva",
    oab: "OAB/BA 678.901",
    role: "Advogada Pleno",
    specialization: "Direito Imobiliário",
    email: "sandra.silva@lawdesk.com.br",
    phone: "(71) 92222-1234",
    photo: fakerData[7].photos[0],
    cases: 29,
    experience: "7 anos",
    status: "Ativo",
    lastLogin: "45 min atrás",
  },
  {
    id: 9,
    name: "Bruno Costa",
    oab: "OAB/RS 789.012",
    role: "Advogado Júnior",
    specialization: "Direito Previdenciário",
    email: "bruno.costa@lawdesk.com.br",
    phone: "(51) 91111-5678",
    photo: fakerData[8].photos[0],
    cases: 15,
    experience: "2 anos",
    status: "Ativo",
    lastLogin: "2 horas atrás",
  },
];

function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [addUserModal, setAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredTeam = legalTeam.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.oab.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "todos" || member.role === filterRole;
    const matchesStatus =
      filterStatus === "todos" || member.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "text-success";
      case "Férias":
        return "text-warning";
      case "Licença":
        return "text-danger";
      default:
        return "text-slate-500";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Sócia-Diretora":
      case "Sócio-Diretor":
        return "Crown";
      case "Advogado Sênior":
        return "Award";
      case "Advogado Pleno":
        return "User";
      case "Advogado Júnior":
        return "UserCheck";
      case "Estagiária de Direito":
      case "Estagiário de Direito":
        return "GraduationCap";
      case "Secretário Jurídico":
        return "FileText";
      default:
        return "User";
    }
  };

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Equipe Jurídica</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button
            variant="primary"
            className="mr-2 shadow-md"
            onClick={() => setAddUserModal(true)}
          >
            <Lucide icon="UserPlus" className="w-4 h-4 mr-2" />
            Adicionar Membro
          </Button>
          <Menu>
            <Menu.Button as="button" className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-48">
              <Menu.Item>
                <Lucide icon="Users" className="w-4 h-4 mr-2" />
                Criar Equipe de Caso
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="MessageCircle" className="w-4 h-4 mr-2" />
                Enviar Comunicado
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                Exportar Lista
              </Menu.Item>
            </Menu.Items>
          </Menu>

          <div className="hidden mx-auto md:block text-slate-500">
            Mostrando {filteredTeam.length} de {legalTeam.length} membros
          </div>

          <div className="flex items-center w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0 gap-2">
            <FormSelect
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full sm:w-32"
            >
              <option value="todos">Todas as Funções</option>
              <option value="Sócia-Diretora">Sócios</option>
              <option value="Advogado Sênior">Sênior</option>
              <option value="Advogado Pleno">Pleno</option>
              <option value="Advogado Júnior">Júnior</option>
              <option value="Estagiária de Direito">Estagiários</option>
              <option value="Secretário Jurídico">Secretários</option>
            </FormSelect>

            <FormSelect
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-32"
            >
              <option value="todos">Todos os Status</option>
              <option value="Ativo">Ativo</option>
              <option value="Férias">Férias</option>
              <option value="Licença">Licença</option>
            </FormSelect>

            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Buscar por nome, OAB..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>

        {/* BEGIN: Legal Team Layout */}
        {filteredTeam.map((member) => (
          <div
            key={member.id}
            className="col-span-12 intro-y md:col-span-6 lg:col-span-4"
          >
            <div className="box hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start px-5 pt-5">
                <div className="flex flex-col items-center w-full lg:flex-row">
                  <div className="relative w-16 h-16 image-fit">
                    <img
                      alt={member.name}
                      className="rounded-full"
                      src={member.photo}
                    />
                    <div
                      className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full ${
                        member.status === "Ativo" ? "bg-success" : "bg-warning"
                      }`}
                    ></div>
                  </div>
                  <div className="mt-3 text-center lg:ml-4 lg:text-left lg:mt-0">
                    <a href="#" className="font-medium text-base">
                      {member.name}
                    </a>
                    <div className="flex items-center justify-center lg:justify-start mt-1">
                      <Lucide
                        icon={getRoleIcon(member.role)}
                        className="w-3 h-3 mr-1 text-slate-500"
                      />
                      <span className="text-slate-600 text-sm">
                        {member.role}
                      </span>
                    </div>
                    <div className="text-slate-500 text-xs mt-1">
                      {member.oab}
                    </div>
                  </div>
                </div>
                <Menu className="absolute top-0 right-0 mt-3 mr-5">
                  <Menu.Button as="a" className="block w-5 h-5">
                    <Lucide
                      icon="MoreHorizontal"
                      className="w-5 h-5 text-slate-500"
                    />
                  </Menu.Button>
                  <Menu.Items className="w-48">
                    <Menu.Item>
                      <Lucide icon="User" className="w-4 h-4 mr-2" />
                      Ver Perfil
                    </Menu.Item>
                    <Menu.Item>
                      <Lucide icon="MessageCircle" className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Menu.Item>
                    <Menu.Item>
                      <Lucide icon="Calendar" className="w-4 h-4 mr-2" />
                      Ver Agenda
                    </Menu.Item>
                    <Menu.Item>
                      <Lucide icon="FilePenLine" className="w-4 h-4 mr-2" />
                      Editar
                    </Menu.Item>
                    <Menu.Item className="text-danger">
                      <Lucide icon="Trash" className="w-4 h-4 mr-2" />
                      Remover
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>

              <div className="p-5 text-center lg:text-left">
                <div className="text-sm text-slate-600 mb-3">
                  <strong>Especialização:</strong> {member.specialization}
                </div>

                <div className="grid grid-cols-2 gap-4 text-center border-t pt-3 border-slate-200">
                  <div>
                    <div className="text-lg font-semibold text-primary">
                      {member.cases}
                    </div>
                    <div className="text-xs text-slate-500">Casos Ativos</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-success">
                      {member.experience}
                    </div>
                    <div className="text-xs text-slate-500">Experiência</div>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-4 lg:justify-start text-slate-500 space-y-2 lg:space-y-0 lg:space-x-4 flex-col lg:flex-row">
                  <div className="flex items-center">
                    <Lucide icon="Mail" className="w-3 h-3 mr-2" />
                    <span className="text-xs">{member.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Lucide icon="Phone" className="w-3 h-3 mr-2" />
                    <span className="text-xs">{member.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200">
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        member.status === "Ativo"
                          ? "bg-success"
                          : member.status === "Férias"
                            ? "bg-warning"
                            : "bg-danger"
                      }`}
                    ></div>
                    <span
                      className={`text-xs font-medium ${getStatusColor(member.status)}`}
                    >
                      {member.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Último acesso: {member.lastLogin}
                  </span>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Button variant="primary" size="sm" className="flex-1">
                    <Lucide icon="MessageCircle" className="w-3 h-3 mr-1" />
                    Chat
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="flex-1"
                  >
                    <Lucide icon="Calendar" className="w-3 h-3 mr-1" />
                    Agenda
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredTeam.length === 0 && (
          <div className="col-span-12 text-center py-10">
            <Lucide
              icon="Users"
              className="w-16 h-16 mx-auto text-slate-400 mb-4"
            />
            <h3 className="text-lg font-medium text-slate-600">
              Nenhum membro encontrado
            </h3>
            <p className="text-slate-500 mt-2">
              Tente ajustar os filtros ou termos de busca
            </p>
          </div>
        )}

        {/* BEGIN: Pagination */}
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link>
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link active>1</Pagination.Link>
            <Pagination.Link>2</Pagination.Link>
            <Pagination.Link>3</Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
          <FormSelect className="w-20 mt-3 !box sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </FormSelect>
        </div>
      </div>

      {/* Add User Modal */}
      <Dialog
        open={addUserModal}
        onClose={() => setAddUserModal(false)}
        className="w-96"
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">
              Adicionar Novo Membro
            </h2>
          </Dialog.Title>
          <Dialog.Description>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nome Completo
                </label>
                <FormInput type="text" placeholder="Digite o nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Número da OAB
                </label>
                <FormInput type="text" placeholder="Ex: OAB/SP 123.456" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Função</label>
                <FormSelect>
                  <option value="">Selecione a função</option>
                  <option value="Sócio-Diretor">Sócio-Diretor</option>
                  <option value="Advogado Sênior">Advogado Sênior</option>
                  <option value="Advogado Pleno">Advogado Pleno</option>
                  <option value="Advogado Júnior">Advogado Júnior</option>
                  <option value="Estagiário de Direito">
                    Estagiário de Direito
                  </option>
                  <option value="Secretário Jurídico">
                    Secretário Jurídico
                  </option>
                </FormSelect>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Especialização
                </label>
                <FormInput
                  type="text"
                  placeholder="Ex: Direito Civil e Empresarial"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-mail</label>
                <FormInput type="email" placeholder="email@lawdesk.com.br" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Telefone
                </label>
                <FormInput type="tel" placeholder="(11) 99999-9999" />
              </div>
            </div>
          </Dialog.Description>
          <Dialog.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setAddUserModal(false)}
              className="w-20 mr-1"
            >
              Cancelar
            </Button>
            <Button variant="primary" className="w-20">
              Salvar
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default Main;
