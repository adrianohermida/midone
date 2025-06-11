import _ from "lodash";
import { useState } from "react";
import Button from "@/components/Base/Button";
import {
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
  FormSwitch,
} from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import TomSelect from "@/components/Base/TomSelect";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { Tab } from "@/components/Base/Headless";

function Main() {
  const [selectMultiple, setSelectMultiple] = useState([]);

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Cadastrar Novo Serviço</h2>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro">Financeiro</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/produtos">Serviços</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/produtos/novo" active={true}>
          Novo Serviço
        </Breadcrumb.Link>
      </Breadcrumb>

      <div className="grid grid-cols-11 gap-x-6 mt-5 pb-20">
        <div className="col-span-11 2xl:col-span-9">
          {/* BEGIN: Upsert Product */}
          <div className="intro-y box">
            <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="font-medium text-base mr-auto">
                Informações do Serviço Jurídico
              </h2>
            </div>
            <div className="p-5">
              <Tab.Group>
                <Tab.List className="nav-pills" variant="pills">
                  <Tab>
                    <Tab.Button className="w-full py-2">
                      Informações Básicas
                    </Tab.Button>
                  </Tab>
                  <Tab>
                    <Tab.Button className="w-full py-2">
                      Valores e Complexidade
                    </Tab.Button>
                  </Tab>
                  <Tab>
                    <Tab.Button className="w-full py-2">
                      Configurações
                    </Tab.Button>
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-5">
                  <Tab.Panel>
                    <div className="p-5">
                      <div className="flex flex-col-reverse xl:flex-row flex-col">
                        <div className="flex-1 mt-6 xl:mt-0">
                          <div className="grid grid-cols-12 gap-x-5">
                            <div className="col-span-12 2xl:col-span-6">
                              <div>
                                <FormLabel htmlFor="product-name">
                                  Nome do Serviço *
                                </FormLabel>
                                <FormInput
                                  id="product-name"
                                  type="text"
                                  placeholder="Ex: Elaboração de Petição Inicial"
                                />
                              </div>
                              <div className="mt-3">
                                <FormLabel htmlFor="category">
                                  Área Jurídica *
                                </FormLabel>
                                <TomSelect
                                  id="category"
                                  value={selectMultiple}
                                  onChange={setSelectMultiple}
                                  options={{
                                    placeholder: "Selecione a área jurídica",
                                  }}
                                  className="w-full"
                                >
                                  <option value="civil">Civil</option>
                                  <option value="trabalhista">
                                    Trabalhista
                                  </option>
                                  <option value="criminal">Criminal</option>
                                  <option value="empresarial">
                                    Empresarial
                                  </option>
                                  <option value="tributario">Tributário</option>
                                  <option value="familia">Família</option>
                                  <option value="consumidor">Consumidor</option>
                                  <option value="administrativo">
                                    Administrativo
                                  </option>
                                </TomSelect>
                              </div>
                              <div className="mt-3">
                                <FormLabel htmlFor="subcategory">
                                  Tipo de Processo
                                </FormLabel>
                                <FormSelect id="subcategory">
                                  <option>Selecione o tipo</option>
                                  <option>Ação de Cobrança</option>
                                  <option>Ação de Despejo</option>
                                  <option>Reclamação Trabalhista</option>
                                  <option>Ação Penal</option>
                                  <option>Consultoria Empresarial</option>
                                  <option>Planejamento Tributário</option>
                                  <option>Divórcio Consensual</option>
                                </FormSelect>
                              </div>
                            </div>
                            <div className="col-span-12 2xl:col-span-6">
                              <div>
                                <FormLabel htmlFor="product-status">
                                  Status do Serviço
                                </FormLabel>
                                <FormSelect id="product-status">
                                  <option value="Active">Ativo</option>
                                  <option value="Inactive">Inativo</option>
                                </FormSelect>
                              </div>
                              <div className="mt-3">
                                <FormLabel htmlFor="product-weight">
                                  Complexidade
                                </FormLabel>
                                <FormSelect id="product-weight">
                                  <option value="Baixa">Baixa</option>
                                  <option value="Média">Média</option>
                                  <option value="Alta">Alta</option>
                                </FormSelect>
                              </div>
                              <div className="mt-3">
                                <FormLabel htmlFor="product-location">
                                  Responsável Padrão
                                </FormLabel>
                                <FormSelect id="product-location">
                                  <option>
                                    Dr. João Silva (OAB/SP 123456)
                                  </option>
                                  <option>
                                    Dra. Maria Santos (OAB/SP 789012)
                                  </option>
                                  <option>
                                    Dr. Pedro Oliveira (OAB/SP 345678)
                                  </option>
                                </FormSelect>
                              </div>
                            </div>
                            <div className="col-span-12">
                              <div className="mt-3">
                                <FormLabel htmlFor="product-description">
                                  Descrição do Serviço
                                </FormLabel>
                                <FormTextarea
                                  id="product-description"
                                  placeholder="Descreva detalhadamente o serviço jurídico, incluindo etapas, documentos necessários e resultados esperados..."
                                  rows={4}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-52 mx-auto xl:mr-0 xl:ml-6">
                          <div className="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                            <div className="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                              <img
                                className="rounded-md"
                                alt="Lawdesk CRM"
                                src="/src/assets/images/justice-scale.svg"
                              />
                              <Tippy
                                content="Remover esta imagem?"
                                className="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                              >
                                <Lucide icon="X" className="w-4 h-4" />
                              </Tippy>
                            </div>
                            <div className="mx-auto cursor-pointer relative mt-5">
                              <Button
                                variant="primary"
                                type="button"
                                className="w-full"
                              >
                                Alterar Ícone
                              </Button>
                              <FormInput
                                type="file"
                                className="w-full h-full top-0 left-0 absolute opacity-0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="p-5">
                      <div className="grid grid-cols-12 gap-x-5">
                        <div className="col-span-12 lg:col-span-6">
                          <div>
                            <FormLabel htmlFor="regular-price">
                              Valor por Hora (R$) *
                            </FormLabel>
                            <FormInput
                              id="regular-price"
                              type="number"
                              placeholder="Ex: 350.00"
                            />
                          </div>
                          <div className="mt-3">
                            <FormLabel htmlFor="sale-price">
                              Valor Fixo (R$)
                            </FormLabel>
                            <FormInput
                              id="sale-price"
                              type="number"
                              placeholder="Ex: 1500.00 (opcional)"
                            />
                          </div>
                          <div className="mt-3">
                            <FormLabel htmlFor="product-price">
                              Valor Mínimo (R$)
                            </FormLabel>
                            <FormInput
                              id="product-price"
                              type="number"
                              placeholder="Ex: 500.00"
                            />
                          </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <div>
                            <FormLabel htmlFor="estimated-hours">
                              Horas Estimadas
                            </FormLabel>
                            <FormInput
                              id="estimated-hours"
                              type="number"
                              placeholder="Ex: 8"
                            />
                          </div>
                          <div className="mt-3">
                            <FormLabel htmlFor="deadline-days">
                              Prazo Padrão (dias)
                            </FormLabel>
                            <FormInput
                              id="deadline-days"
                              type="number"
                              placeholder="Ex: 30"
                            />
                          </div>
                          <div className="mt-3">
                            <FormLabel htmlFor="discount">
                              Desconto Máximo (%)
                            </FormLabel>
                            <FormInput
                              id="discount"
                              type="number"
                              placeholder="Ex: 15"
                              max="100"
                            />
                          </div>
                        </div>
                        <div className="col-span-12">
                          <div className="mt-3">
                            <FormLabel>Observações sobre Valores</FormLabel>
                            <FormTextarea
                              placeholder="Informações adicionais sobre a precificação, condições especiais, formas de pagamento, etc..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="p-5">
                      <div className="grid grid-cols-12 gap-x-5">
                        <div className="col-span-12 lg:col-span-6">
                          <div className="mt-3">
                            <div className="flex flex-col sm:flex-row items-center">
                              <FormLabel className="flex-none sm:mr-auto">
                                Serviço Ativo
                              </FormLabel>
                              <FormSwitch className="w-full sm:w-auto mt-3 sm:mt-0">
                                <FormSwitch.Input
                                  type="checkbox"
                                  defaultChecked
                                />
                              </FormSwitch>
                            </div>
                            <div className="text-slate-500 text-xs mt-2">
                              Serviços inativos não aparecem na lista de seleção
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex flex-col sm:flex-row items-center">
                              <FormLabel className="flex-none sm:mr-auto">
                                Requer Aprovação
                              </FormLabel>
                              <FormSwitch className="w-full sm:w-auto mt-3 sm:mt-0">
                                <FormSwitch.Input type="checkbox" />
                              </FormSwitch>
                            </div>
                            <div className="text-slate-500 text-xs mt-2">
                              Casos deste serviço precisam de aprovação prévia
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex flex-col sm:flex-row items-center">
                              <FormLabel className="flex-none sm:mr-auto">
                                Gerar Boleto Automaticamente
                              </FormLabel>
                              <FormSwitch className="w-full sm:w-auto mt-3 sm:mt-0">
                                <FormSwitch.Input
                                  type="checkbox"
                                  defaultChecked
                                />
                              </FormSwitch>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <div className="mt-3">
                            <div className="flex flex-col sm:flex-row items-center">
                              <FormLabel className="flex-none sm:mr-auto">
                                Enviar Email de Confirmação
                              </FormLabel>
                              <FormSwitch className="w-full sm:w-auto mt-3 sm:mt-0">
                                <FormSwitch.Input
                                  type="checkbox"
                                  defaultChecked
                                />
                              </FormSwitch>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex flex-col sm:flex-row items-center">
                              <FormLabel className="flex-none sm:mr-auto">
                                Permitir Parcelamento
                              </FormLabel>
                              <FormSwitch className="w-full sm:w-auto mt-3 sm:mt-0">
                                <FormSwitch.Input type="checkbox" />
                              </FormSwitch>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex flex-col sm:flex-row items-center">
                              <FormLabel className="flex-none sm:mr-auto">
                                Serviço em Destaque
                              </FormLabel>
                              <FormSwitch className="w-full sm:w-auto mt-3 sm:mt-0">
                                <FormSwitch.Input type="checkbox" />
                              </FormSwitch>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-12">
                          <div className="mt-3">
                            <FormLabel>Documentos Necessários</FormLabel>
                            <FormTextarea
                              placeholder="Liste os documentos que o cliente deve fornecer para este serviço: RG, CPF, comprovante de residência, etc..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
          {/* END: Upsert Product */}
        </div>
        <div className="col-span-11 2xl:col-span-2">
          <div className="2xl:border-l -mb-10 pb-10">
            <div className="2xl:pl-6 grid grid-cols-12 gap-x-1 2xl:gap-x-0 gap-y-2 2xl:gap-y-0">
              <div className="col-span-12 2xl:col-span-12">
                <Button
                  variant="primary"
                  type="button"
                  className="w-full"
                  size="lg"
                >
                  <Lucide icon="Save" className="w-4 h-4 mr-2" />
                  Salvar Serviço
                </Button>
              </div>
              <div className="col-span-6 2xl:col-span-12">
                <Button
                  variant="outline-secondary"
                  type="button"
                  className="w-full"
                >
                  <Lucide icon="Eye" className="w-4 h-4 mr-2" />
                  Visualizar
                </Button>
              </div>
              <div className="col-span-6 2xl:col-span-12">
                <Button
                  variant="outline-secondary"
                  type="button"
                  className="w-full"
                >
                  <Lucide icon="Copy" className="w-4 h-4 mr-2" />
                  Duplicar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
