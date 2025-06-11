import _ from "lodash";
import clsx from "clsx";
import { useState } from "react";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import {
  FormInput,
  FormLabel,
  FormSwitch,
  FormSelect,
} from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";
import TomSelect from "@/components/Base/TomSelect";
import { ClassicEditor } from "@/components/Base/Ckeditor";
import { Menu, Tab, Dialog } from "@/components/Base/Headless";

function Main() {
  const [documentType, setDocumentType] = useState("peticao");
  const [client, setClient] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [editorData, setEditorData] = useState(`
    <h2>EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO</h2>
    <p></p>
    <p>[NOME DO CLIENTE], [QUALIFICAÇÃO], por seu advogado que ao final subscreve, vem respeitosamente à presença de Vossa Excelência, para expor e requerer o que segue:</p>
    <p></p>
    <h3>DOS FATOS</h3>
    <p>[Descrever os fatos relevantes para o caso]</p>
    <p></p>
    <h3>DO DIREITO</h3>
    <p>[Fundamentação jurídica]</p>
    <p></p>
    <h3>DOS PEDIDOS</h3>
    <p>Diante do exposto, requer:</p>
    <p>a) [Primeiro pedido];</p>
    <p>b) [Segundo pedido];</p>
    <p>c) A condenação da parte contrária ao pagamento das custas processuais e honorários advocatícios.</p>
    <p></p>
    <p>Termos em que pede deferimento.</p>
    <p></p>
    <p>[Local], [Data]</p>
    <p></p>
    <p>_______________________________</p>
    <p>[Nome do Advogado]</p>
    <p>OAB/[Estado] [Número]</p>
  `);

  const documentTemplates = [
    {
      type: "peticao",
      name: "Petição Inicial",
      icon: "FileText",
      description: "Petição para iniciar processo judicial",
    },
    {
      type: "contestacao",
      name: "Contestação",
      icon: "Shield",
      description: "Resposta à petição inicial",
    },
    {
      type: "recurso",
      name: "Recurso",
      icon: "ArrowUp",
      description: "Recurso de apelação ou outros",
    },
    {
      type: "contrato",
      name: "Contrato",
      icon: "FileSignature",
      description: "Contratos diversos",
    },
    {
      type: "procuracao",
      name: "Procuração",
      icon: "UserCheck",
      description: "Procuração para representação",
    },
    {
      type: "parecer",
      name: "Parecer Jurídico",
      icon: "BookOpen",
      description: "Parecer técnico jurídico",
    },
    {
      type: "ata",
      name: "Ata de Reunião",
      icon: "Users",
      description: "Ata de reunião ou assembleia",
    },
    {
      type: "notificacao",
      name: "Notificação",
      icon: "Bell",
      description: "Notificação extrajudicial",
    },
  ];

  const clients = ["João Silva", "Maria Santos", "Carlos Lima", "Ana Costa"];
  const cases = ["001/2024", "002/2024", "003/2024", "004/2024"];

  const [previewModal, setPreviewModal] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);

  const handleTemplateSelect = (template: any) => {
    setDocumentType(template.type);

    // Load template content based on type
    let templateContent = "";
    switch (template.type) {
      case "peticao":
        templateContent = `
          <h2>EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO</h2>
          <p></p>
          <p>[NOME DO CLIENTE], [QUALIFICAÇÃO], por seu advogado que ao final subscreve, vem respeitosamente à presença de Vossa Excelência, para expor e requerer o que segue:</p>
          <p></p>
          <h3>DOS FATOS</h3>
          <p>[Descrever os fatos relevantes para o caso]</p>
          <p></p>
          <h3>DO DIREITO</h3>
          <p>[Fundamentação jurídica]</p>
          <p></p>
          <h3>DOS PEDIDOS</h3>
          <p>Diante do exposto, requer:</p>
          <p>a) [Primeiro pedido];</p>
          <p>b) [Segundo pedido];</p>
          <p>c) A condenação da parte contrária ao pagamento das custas processuais e honorários advocatícios.</p>
          <p></p>
          <p>Termos em que pede deferimento.</p>
          <p></p>
          <p>[Local], [Data]</p>
          <p></p>
          <p>_______________________________</p>
          <p>[Nome do Advogado]</p>
          <p>OAB/[Estado] [Número]</p>
        `;
        break;
      case "contestacao":
        templateContent = `
          <h2>CONTESTAÇÃO</h2>
          <p></p>
          <p>[NOME DO RÉU], [QUALIFICAÇÃO], por seu advogado que ao final subscreve, vem respeitosamente à presença de Vossa Excelência, apresentar CONTESTAÇÃO à ação proposta por [NOME DO AUTOR], pelas razões de fato e de direito a seguir expostas:</p>
          <p></p>
          <h3>PRELIMINARES</h3>
          <p>[Preliminares processuais, se houver]</p>
          <p></p>
          <h3>DO MÉRITO</h3>
          <p>[Contestação do mérito da ação]</p>
          <p></p>
          <h3>DOS PEDIDOS</h3>
          <p>Ante o exposto, requer:</p>
          <p>a) A improcedência total dos pedidos;</p>
          <p>b) A condenação do autor ao pagamento das custas e honorários advocatícios.</p>
          <p></p>
          <p>Termos em que pede deferimento.</p>
        `;
        break;
      case "contrato":
        templateContent = `
          <h2>CONTRATO DE [TIPO DE CONTRATO]</h2>
          <p></p>
          <p><strong>CONTRATANTE:</strong> [Nome, qualificação]</p>
          <p><strong>CONTRATADO:</strong> [Nome, qualificação]</p>
          <p></p>
          <h3>CLÁUSULA PRIMEIRA - DO OBJETO</h3>
          <p>[Descrição do objeto do contrato]</p>
          <p></p>
          <h3>CLÁUSULA SEGUNDA - DO VALOR E FORMA DE PAGAMENTO</h3>
          <p>[Valor e condições de pagamento]</p>
          <p></p>
          <h3>CLÁUSULA TERCEIRA - DAS OBRIGAÇÕES</h3>
          <p>[Obrigações das partes]</p>
          <p></p>
          <h3>CLÁUSULA QUARTA - DA VIGÊNCIA</h3>
          <p>[Prazo de vigência do contrato]</p>
          <p></p>
          <p>E por estarem justas e contratadas, as partes assinam o presente instrumento.</p>
        `;
        break;
      case "procuracao":
        templateContent = `
          <h2>PROCURAÇÃO</h2>
          <p></p>
          <p><strong>OUTORGANTE:</strong> [Nome completo], [estado civil], [profissão], [nacionalidade], portador do RG nº [número] e CPF nº [número], residente e domiciliado à [endereço completo].</p>
          <p></p>
          <p><strong>OUTORGADO:</strong> [Nome do Advogado], advogado, inscrito na OAB/[Estado] sob o nº [número], com escritório à [endereço].</p>
          <p></p>
          <p>Pelo presente instrumento particular de mandato, o outorgante nomeia e constitui seu bastante procurador o outorgado, para que em seu nome e representação possa:</p>
          <p></p>
          <p>a) Propor e acompanhar ações judiciais de qualquer natureza;</p>
          <p>b) Apresentar defesas, recursos e petições;</p>
          <p>c) Praticar todos os atos necessários ao fiel desempenho do mandato;</p>
          <p>d) Substabelecer esta procuração, no todo ou em parte.</p>
          <p></p>
          <p>[Local], [Data]</p>
          <p></p>
          <p>_______________________________</p>
          <p>[Nome do Outorgante]</p>
        `;
        break;
      default:
        templateContent = "<p>Selecione um template para começar a editar.</p>";
    }

    setEditorData(templateContent);
    setTemplateModal(false);
  };

  const handleSave = (action: string) => {
    console.log(`Saving document as: ${action}`, {
      type: documentType,
      client,
      caseNumber,
      content: editorData,
    });
  };

  const handlePreview = () => {
    setPreviewModal(true);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">
          Editor de Documentos Jurídicos
        </h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button
            variant="outline-secondary"
            className="mr-2"
            onClick={() => setTemplateModal(true)}
          >
            <Lucide icon="FileText" className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button
            type="button"
            className="flex items-center ml-auto mr-2 !box sm:ml-0"
            onClick={handlePreview}
          >
            <Lucide icon="Eye" className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
          <Menu>
            <Menu.Button
              as="button"
              variant="primary"
              className="flex items-center shadow-md"
            >
              Salvar <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
            </Menu.Button>
            <Menu.Items className="w-48">
              <Menu.Item onClick={() => handleSave("draft")}>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                Salvar como Rascunho
              </Menu.Item>
              <Menu.Item onClick={() => handleSave("final")}>
                <Lucide icon="Check" className="w-4 h-4 mr-2" />
                Finalizar Documento
              </Menu.Item>
              <Menu.Item onClick={() => handleSave("pdf")}>
                <Lucide icon="Download" className="w-4 h-4 mr-2" />
                Exportar para PDF
              </Menu.Item>
              <Menu.Item onClick={() => handleSave("word")}>
                <Lucide icon="Download" className="w-4 h-4 mr-2" />
                Exportar para Word
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-5 intro-y">
        {/* Document Content */}
        <div className="col-span-12 intro-y lg:col-span-8">
          <FormInput
            type="text"
            className="px-4 py-3 pr-10 intro-y !box"
            placeholder="Título do documento (ex: Petição Inicial - João Silva vs. Maria Santos)"
          />

          <Tab.Group className="mt-5 overflow-hidden intro-y box">
            <Tab.List className="flex-col border-transparent dark:border-transparent sm:flex-row bg-slate-200 dark:bg-darkmode-800">
              <Tab fullWidth={false}>
                {({ selected }) => (
                  <Tab.Button
                    className={clsx([
                      "flex items-center justify-center w-full px-0 py-0 sm:w-40 text-slate-500",
                      !selected &&
                        "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                      selected &&
                        "text-primary border-transparent dark:bg-darkmode-600 dark:border-x-transparent dark:border-t-transparent dark:text-white",
                    ])}
                    as="button"
                  >
                    <Tippy
                      content="Editar conteúdo do documento"
                      className="flex items-center justify-center w-full py-4"
                    >
                      <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                      Conteúdo
                    </Tippy>
                  </Tab.Button>
                )}
              </Tab>
              <Tab fullWidth={false}>
                {({ selected }) => (
                  <Tab.Button
                    className={clsx([
                      "flex items-center justify-center w-full px-0 py-0 sm:w-40 text-slate-500",
                      !selected &&
                        "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                      selected &&
                        "text-primary border-transparent dark:bg-darkmode-600 dark:border-x-transparent dark:border-t-transparent dark:text-white",
                    ])}
                    as="button"
                  >
                    <Tippy
                      content="Configurações do documento"
                      className="flex items-center justify-center w-full py-4"
                    >
                      <Lucide icon="Settings" className="w-4 h-4 mr-2" />
                      Configurações
                    </Tippy>
                  </Tab.Button>
                )}
              </Tab>
            </Tab.List>

            <Tab.Panels className="p-5">
              <Tab.Panel>
                <div className="border border-slate-200/60 rounded-md p-5 dark:border-darkmode-400">
                  <ClassicEditor
                    value={editorData}
                    onChange={setEditorData}
                    config={{
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "outdent",
                        "indent",
                        "|",
                        "blockQuote",
                        "insertTable",
                        "|",
                        "undo",
                        "redo",
                      ],
                    }}
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="leading-relaxed">
                  <div className="space-y-4">
                    <div>
                      <FormLabel>Formatação</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        <FormSelect>
                          <option>Fonte: Times New Roman</option>
                          <option>Fonte: Arial</option>
                          <option>Fonte: Calibri</option>
                        </FormSelect>
                        <FormSelect>
                          <option>Tamanho: 12pt</option>
                          <option>Tamanho: 11pt</option>
                          <option>Tamanho: 14pt</option>
                        </FormSelect>
                      </div>
                    </div>

                    <div>
                      <FormLabel>Margens (cm)</FormLabel>
                      <div className="grid grid-cols-4 gap-2">
                        <FormInput
                          type="number"
                          placeholder="Superior"
                          defaultValue="3"
                        />
                        <FormInput
                          type="number"
                          placeholder="Inferior"
                          defaultValue="2"
                        />
                        <FormInput
                          type="number"
                          placeholder="Esquerda"
                          defaultValue="3"
                        />
                        <FormInput
                          type="number"
                          placeholder="Direita"
                          defaultValue="2"
                        />
                      </div>
                    </div>

                    <div>
                      <FormLabel>Outras Configurações</FormLabel>
                      <div className="space-y-2">
                        <FormSwitch>
                          <FormSwitch.Input type="checkbox" defaultChecked />
                          <FormSwitch.Label className="ml-2">
                            Numeração de páginas
                          </FormSwitch.Label>
                        </FormSwitch>
                        <FormSwitch>
                          <FormSwitch.Input type="checkbox" defaultChecked />
                          <FormSwitch.Label className="ml-2">
                            Espaçamento 1.5
                          </FormSwitch.Label>
                        </FormSwitch>
                        <FormSwitch>
                          <FormSwitch.Input type="checkbox" />
                          <FormSwitch.Label className="ml-2">
                            Justificar texto
                          </FormSwitch.Label>
                        </FormSwitch>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Document Info Sidebar */}
        <div className="col-span-12 intro-y lg:col-span-4">
          <div className="p-5 box">
            <div className="space-y-4">
              <div>
                <FormLabel>Tipo de Documento</FormLabel>
                <FormSelect
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                >
                  {documentTemplates.map((template) => (
                    <option key={template.type} value={template.type}>
                      {template.name}
                    </option>
                  ))}
                </FormSelect>
              </div>

              <div>
                <FormLabel>Cliente</FormLabel>
                <TomSelect
                  value={client}
                  onChange={setClient}
                  options={{
                    placeholder: "Selecione o cliente...",
                  }}
                  className="w-full"
                >
                  {clients.map((clientName, index) => (
                    <option key={index} value={clientName}>
                      {clientName}
                    </option>
                  ))}
                </TomSelect>
              </div>

              <div>
                <FormLabel>Número do Caso</FormLabel>
                <TomSelect
                  value={caseNumber}
                  onChange={setCaseNumber}
                  options={{
                    placeholder: "Selecione o caso...",
                  }}
                  className="w-full"
                >
                  {cases.map((caseNum, index) => (
                    <option key={index} value={caseNum}>
                      Caso {caseNum}
                    </option>
                  ))}
                </TomSelect>
              </div>

              <div>
                <FormLabel>Status</FormLabel>
                <FormSelect>
                  <option value="draft">Rascunho</option>
                  <option value="review">Em Revisão</option>
                  <option value="approved">Aprovado</option>
                  <option value="sent">Enviado</option>
                </FormSelect>
              </div>
            </div>
          </div>

          <div className="p-5 mt-5 box">
            <div className="mb-4">
              <h3 className="font-medium">Ações Rápidas</h3>
            </div>
            <div className="space-y-2">
              <Button
                variant="outline-primary"
                className="w-full justify-start"
              >
                <Lucide icon="Copy" className="w-4 h-4 mr-2" />
                Duplicar Documento
              </Button>
              <Button
                variant="outline-secondary"
                className="w-full justify-start"
              >
                <Lucide icon="Share" className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              <Button
                variant="outline-secondary"
                className="w-full justify-start"
              >
                <Lucide icon="Archive" className="w-4 h-4 mr-2" />
                Arquivar
              </Button>
              <Button
                variant="outline-secondary"
                className="w-full justify-start"
              >
                <Lucide icon="Clock" className="w-4 h-4 mr-2" />
                Histórico de Versões
              </Button>
            </div>
          </div>

          <div className="p-5 mt-5 box">
            <div className="mb-4">
              <h3 className="font-medium">Informações</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Criado em:</span>
                <span>{new Date().toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Última edição:</span>
                <span>Agora</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Palavras:</span>
                <span>247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Caracteres:</span>
                <span>1,523</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Modal */}
      <Dialog
        open={templateModal}
        onClose={() => setTemplateModal(false)}
        className="w-4xl"
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">
              Templates de Documentos Jurídicos
            </h2>
          </Dialog.Title>
          <Dialog.Description>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {documentTemplates.map((template) => (
                <button
                  key={template.type}
                  onClick={() => handleTemplateSelect(template)}
                  className="p-4 border border-slate-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                >
                  <div className="flex items-center mb-2">
                    <Lucide
                      icon={template.icon as any}
                      className="w-6 h-6 text-primary mr-2"
                    />
                    <h3 className="font-medium">{template.name}</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    {template.description}
                  </p>
                </button>
              ))}
            </div>
          </Dialog.Description>
          <Dialog.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setTemplateModal(false)}
              className="w-20"
            >
              Fechar
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>

      {/* Preview Modal */}
      <Dialog
        open={previewModal}
        onClose={() => setPreviewModal(false)}
        className="w-4xl"
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">
              Visualização do Documento
            </h2>
          </Dialog.Title>
          <Dialog.Description>
            <div className="bg-white p-8 border border-slate-200 rounded-lg max-h-96 overflow-y-auto">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: editorData }}
              />
            </div>
          </Dialog.Description>
          <Dialog.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setPreviewModal(false)}
              className="w-20 mr-1"
            >
              Fechar
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSave("pdf")}
              className="w-32"
            >
              <Lucide icon="Download" className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default Main;
