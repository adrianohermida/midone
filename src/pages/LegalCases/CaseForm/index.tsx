import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { createCase, updateCase } from "@/stores/legalCasesSlice";
import type {
  CaseFormData,
  LegalArea,
  CasePriority,
} from "@/types/legal-cases";

// Components
import Lucide from "@/components/Base/Lucide";
import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormLabel,
} from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Alert from "@/components/Base/Alert";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { Tab } from "@/components/Base/Headless";

// Validation schema
const caseSchema = yup.object({
  numeroProcesso: yup
    .string()
    .required("Número do processo é obrigatório")
    .matches(
      /^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/,
      "Formato inválido (ex: 0000000-00.0000.0.00.0000)",
    ),
  titulo: yup
    .string()
    .required("Título é obrigatório")
    .min(5, "Título deve ter no mínimo 5 caracteres"),
  tribunal: yup.string().required("Tribunal é obrigatório"),
  vara: yup.string().required("Vara é obrigatória"),
  classeProcessual: yup.string().required("Classe processual é obrigatória"),
  assuntoPrincipal: yup.string().required("Assunto principal é obrigatório"),
  dataDistribuicao: yup.string().required("Data de distribuição é obrigatória"),
  valorCausa: yup.number().min(0, "Valor deve ser positivo").nullable(),
  area: yup.string().required("Área do direito é obrigatória"),
  prioridade: yup.string().required("Prioridade é obrigatória"),
  pasta: yup.string().required("Pasta é obrigatória"),
  cliente: yup
    .object({
      nome: yup.string().required("Nome do cliente é obrigatório"),
      documento: yup.string().required("Documento do cliente é obrigatório"),
      email: yup.string().email("Email inválido").nullable(),
      telefone: yup.string().nullable(),
    })
    .required(),
});

const CaseForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEditing = !!id;

  const { cases, loading } = useAppSelector((state) => state.legalCases);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const currentCase = isEditing ? cases.find((c) => c.id === id) : null;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CaseFormData>({
    resolver: yupResolver(caseSchema),
    defaultValues: {
      numeroProcesso: "",
      titulo: "",
      tribunal: "",
      vara: "",
      classeProcessual: "",
      assuntoPrincipal: "",
      dataDistribuicao: "",
      valorCausa: undefined,
      area: "civil",
      prioridade: "media",
      pasta: "Geral",
      tags: [],
      cliente: {
        nome: "",
        documento: "",
        email: "",
        telefone: "",
      },
      advogados: [
        {
          nome: "",
          documento: "",
          email: "",
          telefone: "",
        },
      ],
      parteContraria: [
        {
          nome: "",
          documento: "",
          email: "",
          telefone: "",
        },
      ],
      observacoes: "",
    },
  });

  const {
    fields: advogadoFields,
    append: addAdvogado,
    remove: removeAdvogado,
  } = useFieldArray({
    control,
    name: "advogados",
  });

  const {
    fields: parteContrariaFields,
    append: addParteContraria,
    remove: removeParteContraria,
  } = useFieldArray({
    control,
    name: "parteContraria",
  });

  // Load current case data for editing
  useEffect(() => {
    if (isEditing && currentCase) {
      setValue("numeroProcesso", currentCase.numeroProcesso);
      setValue("titulo", currentCase.titulo);
      setValue("tribunal", currentCase.tribunal);
      setValue("vara", currentCase.vara);
      setValue("classeProcessual", currentCase.classeProcessual);
      setValue("assuntoPrincipal", currentCase.assuntoPrincipal);
      setValue("dataDistribuicao", currentCase.dataDistribuicao);
      setValue("valorCausa", currentCase.valorCausa);
      setValue("area", currentCase.area);
      setValue("prioridade", currentCase.prioridade);
      setValue("pasta", currentCase.pasta);
      setValue("tags", currentCase.tags);
      setValue("cliente", currentCase.cliente);
      setValue("advogados", currentCase.advogados);
      setValue("parteContraria", currentCase.parteContraria);
    }
  }, [isEditing, currentCase, setValue]);

  // Legal Areas options
  const legalAreas: { value: LegalArea; label: string }[] = [
    { value: "civil", label: "Cível" },
    { value: "trabalhista", label: "Trabalhista" },
    { value: "criminal", label: "Criminal" },
    { value: "tributario", label: "Tributário" },
    { value: "familia", label: "Família" },
    { value: "consumidor", label: "Consumidor" },
    { value: "previdenciario", label: "Previdenciário" },
    { value: "administrativo", label: "Administrativo" },
    { value: "empresarial", label: "Empresarial" },
    { value: "ambiental", label: "Ambiental" },
  ];

  // Priority options
  const priorityOptions: { value: CasePriority; label: string }[] = [
    { value: "alta", label: "Alta" },
    { value: "media", label: "Média" },
    { value: "baixa", label: "Baixa" },
  ];

  // Common tribunais
  const tribunaisComuns = [
    "TJSP - Tribunal de Justiça de São Paulo",
    "TJRJ - Tribunal de Justiça do Rio de Janeiro",
    "TJMG - Tribunal de Justiça de Minas Gerais",
    "TJRS - Tribunal de Justiça do Rio Grande do Sul",
    "TJPR - Tribunal de Justiça do Paraná",
    "TST - Tribunal Superior do Trabalho",
    "STJ - Superior Tribunal de Justiça",
    "STF - Supremo Tribunal Federal",
  ];

  const onSubmit = async (data: CaseFormData) => {
    try {
      setSubmitError(null);

      if (isEditing && currentCase) {
        await dispatch(
          updateCase({
            id: currentCase.id,
            updates: data,
          }),
        ).unwrap();
      } else {
        await dispatch(createCase(data)).unwrap();
      }

      navigate("/legal-cases/list");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Erro ao salvar processo",
      );
    }
  };

  const formatProcessNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Apply CNJ mask: 0000000-00.0000.0.00.0000
    if (digits.length <= 7) {
      return digits;
    } else if (digits.length <= 9) {
      return `${digits.slice(0, 7)}-${digits.slice(7)}`;
    } else if (digits.length <= 13) {
      return `${digits.slice(0, 7)}-${digits.slice(7, 9)}.${digits.slice(9)}`;
    } else if (digits.length <= 14) {
      return `${digits.slice(0, 7)}-${digits.slice(7, 9)}.${digits.slice(9, 13)}.${digits.slice(13)}`;
    } else if (digits.length <= 16) {
      return `${digits.slice(0, 7)}-${digits.slice(7, 9)}.${digits.slice(9, 13)}.${digits.slice(13, 14)}.${digits.slice(14)}`;
    } else {
      return `${digits.slice(0, 7)}-${digits.slice(7, 9)}.${digits.slice(9, 13)}.${digits.slice(13, 14)}.${digits.slice(14, 16)}.${digits.slice(16, 20)}`;
    }
  };

  const tabContent = [
    // Tab 1: Dados Básicos
    <div key="dados-basicos" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <FormLabel htmlFor="numeroProcesso">Número do Processo *</FormLabel>
          <FormInput
            id="numeroProcesso"
            type="text"
            placeholder="0000000-00.0000.0.00.0000"
            {...register("numeroProcesso")}
            onChange={(e) => {
              const formatted = formatProcessNumber(e.target.value);
              setValue("numeroProcesso", formatted);
            }}
            className={errors.numeroProcesso ? "border-red-500" : ""}
          />
          {errors.numeroProcesso && (
            <div className="text-red-500 text-sm mt-1">
              {errors.numeroProcesso.message}
            </div>
          )}
        </div>

        <div>
          <FormLabel htmlFor="titulo">Título/Nome do Processo *</FormLabel>
          <FormInput
            id="titulo"
            type="text"
            placeholder="Ex: Ação de Indenização por Danos Morais"
            {...register("titulo")}
            className={errors.titulo ? "border-red-500" : ""}
          />
          {errors.titulo && (
            <div className="text-red-500 text-sm mt-1">
              {errors.titulo.message}
            </div>
          )}
        </div>

        <div>
          <FormLabel htmlFor="tribunal">Tribunal/Instância *</FormLabel>
          <FormSelect
            id="tribunal"
            {...register("tribunal")}
            className={errors.tribunal ? "border-red-500" : ""}
          >
            <option value="">Selecione o tribunal</option>
            {tribunaisComuns.map((tribunal) => (
              <option key={tribunal} value={tribunal}>
                {tribunal}
              </option>
            ))}
          </FormSelect>
          {errors.tribunal && (
            <div className="text-red-500 text-sm mt-1">
              {errors.tribunal.message}
            </div>
          )}
        </div>

        <div>
          <FormLabel htmlFor="vara">Vara/Comarca *</FormLabel>
          <FormInput
            id="vara"
            type="text"
            placeholder="Ex: 1ª Vara Cível"
            {...register("vara")}
            className={errors.vara ? "border-red-500" : ""}
          />
          {errors.vara && (
            <div className="text-red-500 text-sm mt-1">
              {errors.vara.message}
            </div>
          )}
        </div>

        <div>
          <FormLabel htmlFor="classeProcessual">Classe Processual *</FormLabel>
          <FormInput
            id="classeProcessual"
            type="text"
            placeholder="Ex: Procedimento Comum"
            {...register("classeProcessual")}
            className={errors.classeProcessual ? "border-red-500" : ""}
          />
          {errors.classeProcessual && (
            <div className="text-red-500 text-sm mt-1">
              {errors.classeProcessual.message}
            </div>
          )}
        </div>

        <div>
          <FormLabel htmlFor="assuntoPrincipal">Assunto Principal *</FormLabel>
          <FormInput
            id="assuntoPrincipal"
            type="text"
            placeholder="Ex: Indenização por Dano Moral"
            {...register("assuntoPrincipal")}
            className={errors.assuntoPrincipal ? "border-red-500" : ""}
          />
          {errors.assuntoPrincipal && (
            <div className="text-red-500 text-sm mt-1">
              {errors.assuntoPrincipal.message}
            </div>
          )}
        </div>

        <div>
          <FormLabel htmlFor="dataDistribuicao">
            Data de Distribuição *
          </FormLabel>
          <FormInput
            id="dataDistribuicao"
            type="date"
            {...register("dataDistribuicao")}
            className={errors.dataDistribuicao ? "border-red-500" : ""}
          />
          {errors.dataDistribuicao && (
            <div className="text-red-500 text-sm mt-1">
              {errors.dataDistribuicao.message}
            </div>
          )}
        </div>

        <div>
          <FormLabel htmlFor="valorCausa">Valor da Causa (R$)</FormLabel>
          <FormInput
            id="valorCausa"
            type="number"
            step="0.01"
            placeholder="0,00"
            {...register("valorCausa")}
            className={errors.valorCausa ? "border-red-500" : ""}
          />
          {errors.valorCausa && (
            <div className="text-red-500 text-sm mt-1">
              {errors.valorCausa.message}
            </div>
          )}
        </div>
      </div>
    </div>,

    // Tab 2: Classificação
    <div key="classificacao" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <FormLabel htmlFor="area">Área do Direito *</FormLabel>
          <FormSelect
            id="area"
            {...register("area")}
            className={errors.area ? "border-red-500" : ""}
          >
            {legalAreas.map((area) => (
              <option key={area.value} value={area.value}>
                {area.label}
              </option>
            ))}
          </FormSelect>
          {errors.area && (
            <div className="text-red-500 text-sm mt-1">
              {errors.area.message}
            </div>
          )}
        </div>

        <div>
          <FormLabel htmlFor="prioridade">Prioridade *</FormLabel>
          <FormSelect
            id="prioridade"
            {...register("prioridade")}
            className={errors.prioridade ? "border-red-500" : ""}
          >
            {priorityOptions.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </FormSelect>
          {errors.prioridade && (
            <div className="text-red-500 text-sm mt-1">
              {errors.prioridade.message}
            </div>
          )}
        </div>

        <div>
          <FormLabel htmlFor="pasta">Pasta/Categoria *</FormLabel>
          <FormInput
            id="pasta"
            type="text"
            placeholder="Ex: Geral, Família, Trabalhista"
            {...register("pasta")}
            className={errors.pasta ? "border-red-500" : ""}
          />
          {errors.pasta && (
            <div className="text-red-500 text-sm mt-1">
              {errors.pasta.message}
            </div>
          )}
        </div>
      </div>

      <div>
        <FormLabel htmlFor="observacoes">Observações</FormLabel>
        <FormTextarea
          id="observacoes"
          rows={4}
          placeholder="Observações adicionais sobre o processo..."
          {...register("observacoes")}
        />
      </div>
    </div>,

    // Tab 3: Partes Envolvidas
    <div key="partes" className="space-y-8">
      {/* Cliente */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Cliente
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <FormLabel htmlFor="cliente.nome">Nome *</FormLabel>
            <FormInput
              id="cliente.nome"
              type="text"
              placeholder="Nome completo do cliente"
              {...register("cliente.nome")}
              className={errors.cliente?.nome ? "border-red-500" : ""}
            />
            {errors.cliente?.nome && (
              <div className="text-red-500 text-sm mt-1">
                {errors.cliente.nome.message}
              </div>
            )}
          </div>
          <div>
            <FormLabel htmlFor="cliente.documento">CPF/CNPJ *</FormLabel>
            <FormInput
              id="cliente.documento"
              type="text"
              placeholder="000.000.000-00"
              {...register("cliente.documento")}
              className={errors.cliente?.documento ? "border-red-500" : ""}
            />
            {errors.cliente?.documento && (
              <div className="text-red-500 text-sm mt-1">
                {errors.cliente.documento.message}
              </div>
            )}
          </div>
          <div>
            <FormLabel htmlFor="cliente.email">Email</FormLabel>
            <FormInput
              id="cliente.email"
              type="email"
              placeholder="email@exemplo.com"
              {...register("cliente.email")}
              className={errors.cliente?.email ? "border-red-500" : ""}
            />
            {errors.cliente?.email && (
              <div className="text-red-500 text-sm mt-1">
                {errors.cliente.email.message}
              </div>
            )}
          </div>
          <div>
            <FormLabel htmlFor="cliente.telefone">Telefone</FormLabel>
            <FormInput
              id="cliente.telefone"
              type="tel"
              placeholder="(11) 99999-9999"
              {...register("cliente.telefone")}
            />
          </div>
        </div>
      </div>

      {/* Advogados */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Advogados Responsáveis
          </h3>
          <Button
            type="button"
            variant="outline-primary"
            size="sm"
            onClick={() =>
              addAdvogado({ nome: "", documento: "", email: "", telefone: "" })
            }
          >
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Adicionar Advogado
          </Button>
        </div>

        {advogadoFields.map((field, index) => (
          <div
            key={field.id}
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-slate-700 dark:text-slate-300">
                Advogado {index + 1}
              </h4>
              {advogadoFields.length > 1 && (
                <Button
                  type="button"
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeAdvogado(index)}
                >
                  <Lucide icon="Trash2" className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <FormLabel htmlFor={`advogados.${index}.nome`}>Nome</FormLabel>
                <FormInput
                  type="text"
                  placeholder="Nome do advogado"
                  {...register(`advogados.${index}.nome`)}
                />
              </div>
              <div>
                <FormLabel htmlFor={`advogados.${index}.documento`}>
                  OAB/CPF
                </FormLabel>
                <FormInput
                  type="text"
                  placeholder="OAB 123456/SP"
                  {...register(`advogados.${index}.documento`)}
                />
              </div>
              <div>
                <FormLabel htmlFor={`advogados.${index}.email`}>
                  Email
                </FormLabel>
                <FormInput
                  type="email"
                  placeholder="email@exemplo.com"
                  {...register(`advogados.${index}.email`)}
                />
              </div>
              <div>
                <FormLabel htmlFor={`advogados.${index}.telefone`}>
                  Telefone
                </FormLabel>
                <FormInput
                  type="tel"
                  placeholder="(11) 99999-9999"
                  {...register(`advogados.${index}.telefone`)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Parte Contrária */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Parte Contrária
          </h3>
          <Button
            type="button"
            variant="outline-primary"
            size="sm"
            onClick={() =>
              addParteContraria({
                nome: "",
                documento: "",
                email: "",
                telefone: "",
              })
            }
          >
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Adicionar Parte
          </Button>
        </div>

        {parteContrariaFields.map((field, index) => (
          <div
            key={field.id}
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-slate-700 dark:text-slate-300">
                Parte Contrária {index + 1}
              </h4>
              {parteContrariaFields.length > 1 && (
                <Button
                  type="button"
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeParteContraria(index)}
                >
                  <Lucide icon="Trash2" className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <FormLabel htmlFor={`parteContraria.${index}.nome`}>
                  Nome
                </FormLabel>
                <FormInput
                  type="text"
                  placeholder="Nome da parte contrária"
                  {...register(`parteContraria.${index}.nome`)}
                />
              </div>
              <div>
                <FormLabel htmlFor={`parteContraria.${index}.documento`}>
                  CPF/CNPJ
                </FormLabel>
                <FormInput
                  type="text"
                  placeholder="000.000.000-00"
                  {...register(`parteContraria.${index}.documento`)}
                />
              </div>
              <div>
                <FormLabel htmlFor={`parteContraria.${index}.email`}>
                  Email
                </FormLabel>
                <FormInput
                  type="email"
                  placeholder="email@exemplo.com"
                  {...register(`parteContraria.${index}.email`)}
                />
              </div>
              <div>
                <FormLabel htmlFor={`parteContraria.${index}.telefone`}>
                  Telefone
                </FormLabel>
                <FormInput
                  type="tel"
                  placeholder="(11) 99999-9999"
                  {...register(`parteContraria.${index}.telefone`)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>,
  ];

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {isEditing ? "Editar Processo" : "Novo Processo"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {isEditing
              ? "Atualize as informações do processo"
              : "Cadastre um novo processo judicial"}
          </p>
        </div>
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/legal-cases/list")}
        >
          <Lucide icon="ArrowLeft" className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      {/* Error Alert */}
      {submitError && (
        <Alert variant="outline-danger" className="flex items-center">
          <Lucide icon="AlertCircle" className="w-4 h-4 mr-2" />
          {submitError}
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          {/* Tabs */}
          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
            <div className="border-b border-slate-200 dark:border-slate-700">
              <Tab.List className="flex space-x-8 px-6">
                <Tab
                  className={({ selected }) =>
                    `py-4 px-1 border-b-2 font-medium text-sm ${
                      selected
                        ? "border-primary text-primary"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`
                  }
                >
                  Dados Básicos
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `py-4 px-1 border-b-2 font-medium text-sm ${
                      selected
                        ? "border-primary text-primary"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`
                  }
                >
                  Classificação
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `py-4 px-1 border-b-2 font-medium text-sm ${
                      selected
                        ? "border-primary text-primary"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`
                  }
                >
                  Partes Envolvidas
                </Tab>
              </Tab.List>
            </div>

            <Tab.Panels>
              {tabContent.map((content, index) => (
                <Tab.Panel key={index} className="p-6">
                  {content}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Form Actions */}
          <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                {activeTab > 0 && (
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => setActiveTab(activeTab - 1)}
                  >
                    <Lucide icon="ChevronLeft" className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                )}
              </div>

              <div className="flex space-x-3">
                {activeTab < tabContent.length - 1 ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => setActiveTab(activeTab + 1)}
                  >
                    Próximo
                    <Lucide icon="ChevronRight" className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? (
                      <>
                        <LoadingIcon icon="oval" className="w-4 h-4 mr-2" />
                        {isEditing ? "Atualizando..." : "Salvando..."}
                      </>
                    ) : (
                      <>
                        <Lucide icon="Save" className="w-4 h-4 mr-2" />
                        {isEditing ? "Atualizar Processo" : "Salvar Processo"}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CaseForm;
