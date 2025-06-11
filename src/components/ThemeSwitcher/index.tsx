import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  selectColorScheme,
  setColorScheme,
  ColorSchemes,
} from "@/stores/colorSchemeSlice";
import { selectTheme, setTheme, setLayout, Themes } from "@/stores/themeSlice";
import { selectDarkMode, setDarkMode } from "@/stores/darkModeSlice";
import {
  selectCustomThemes,
  selectActiveCustomTheme,
  selectIsUsingCustomTheme,
  addCustomTheme,
  setActiveCustomTheme,
  clearCustomTheme,
  removeCustomTheme,
  CustomTheme,
} from "@/stores/customThemeSlice";
import { Dialog } from "@/components/Base/Headless";
import { Tab } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { FormInput, FormLabel } from "@/components/Base/Form";
import ColorPicker from "@/components/Base/ColorPicker";
import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import {
  themeConfigs,
  applyThemeStyles,
  getThemeConfig,
} from "@/config/themes";
import {
  applyCustomThemeColors,
  isValidHex,
  getContrastColor,
} from "@/utils/colorUtils";

interface LogoUpload {
  file: File | null;
  preview: string;
  name: string;
}

function Main() {
  const dispatch = useAppDispatch();
  const [themeSwitcherOpen, setThemeSwitcherOpen] = useState(false);
  const [customThemeName, setCustomThemeName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#1e40af");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [previewPrimary, setPreviewPrimary] = useState("#3b82f6");
  const [previewSecondary, setPreviewSecondary] = useState("#1e40af");
  const [previewBackground, setPreviewBackground] = useState("#ffffff");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [logoUpload, setLogoUpload] = useState<LogoUpload>({
    file: null,
    preview: "",
    name: "",
  });
  const [showColorGuide, setShowColorGuide] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeTheme = useAppSelector(selectTheme);
  const activeColorScheme = useAppSelector(selectColorScheme);
  const activeDarkMode = useAppSelector(selectDarkMode);
  const customThemes = useAppSelector(selectCustomThemes);
  const activeCustomTheme = useAppSelector(selectActiveCustomTheme);
  const isUsingCustomTheme = useAppSelector(selectIsUsingCustomTheme);

  // Apply preview colors immediately
  const applyPreviewColors = useCallback(
    (primary: string, secondary: string, background?: string) => {
      if (isValidHex(primary) && isValidHex(secondary)) {
        applyCustomThemeColors(primary, secondary, activeDarkMode);
        if (background && isValidHex(background)) {
          document.documentElement.style.setProperty(
            "--color-content-bg",
            background,
          );
          document.body.style.backgroundColor = background;
        }
      }
    },
    [activeDarkMode],
  );

  // Reset to original theme when closing without saving
  const resetToOriginalTheme = useCallback(() => {
    if (isUsingCustomTheme && activeCustomTheme) {
      applyCustomThemeColors(
        activeCustomTheme.colors.primary,
        activeCustomTheme.colors.secondary,
        activeDarkMode,
      );
    } else {
      applyThemeStyles(activeTheme.name, activeDarkMode);
    }
  }, [isUsingCustomTheme, activeCustomTheme, activeTheme.name, activeDarkMode]);

  const switchTheme = (theme: Themes["name"]) => {
    dispatch(setTheme(theme));
    dispatch(clearCustomTheme());
    applyThemeStyles(theme, activeDarkMode);
  };

  const switchLayout = (layout: Themes["layout"]) => {
    dispatch(setLayout(layout));
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const applyCustomTheme = (customTheme: CustomTheme) => {
    dispatch(setActiveCustomTheme(customTheme));
    applyCustomThemeColors(
      customTheme.colors.primary,
      customTheme.colors.secondary,
      activeDarkMode,
    );
    setPreviewPrimary(customTheme.colors.primary);
    setPreviewSecondary(customTheme.colors.secondary);
  };

  const createCustomTheme = () => {
    if (
      !customThemeName.trim() ||
      !isValidHex(primaryColor) ||
      !isValidHex(secondaryColor)
    ) {
      return;
    }

    const newCustomTheme: CustomTheme = {
      id: Date.now().toString(),
      name: customThemeName.trim(),
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
      },
      isCustom: true,
      createdAt: Date.now(),
    };

    dispatch(addCustomTheme(newCustomTheme));
    applyCustomTheme(newCustomTheme);

    // Reset form
    setCustomThemeName("");
    setPrimaryColor("#3b82f6");
    setSecondaryColor("#1e40af");
    setPreviewPrimary("#3b82f6");
    setPreviewSecondary("#1e40af");
    setShowCustomForm(false);
  };

  const deleteCustomTheme = (themeId: string) => {
    dispatch(removeCustomTheme(themeId));
    if (activeCustomTheme?.id === themeId) {
      dispatch(clearCustomTheme());
      applyThemeStyles(activeTheme.name, activeDarkMode);
    }
  };

  const switchColorScheme = (colorScheme: ColorSchemes) => {
    dispatch(setColorScheme(colorScheme));
    const el = document.documentElement;
    el.setAttribute("class", colorScheme);
    activeDarkMode && el.classList.add("dark");
  };

  const switchDarkMode = (darkMode: boolean) => {
    dispatch(setDarkMode(darkMode));
    const el = document.documentElement;
    darkMode ? el.classList.add("dark") : el.classList.remove("dark");

    if (isUsingCustomTheme && activeCustomTheme) {
      applyCustomThemeColors(
        activeCustomTheme.colors.primary,
        activeCustomTheme.colors.secondary,
        darkMode,
      );
    } else {
      applyThemeStyles(activeTheme.name, darkMode);
    }
  };

  // Real-time preview for custom colors
  useEffect(() => {
    if (
      showCustomForm &&
      isValidHex(previewPrimary) &&
      isValidHex(previewSecondary)
    ) {
      applyPreviewColors(previewPrimary, previewSecondary, previewBackground);
    }
  }, [
    previewPrimary,
    previewSecondary,
    previewBackground,
    showCustomForm,
    applyPreviewColors,
  ]);

  const handlePrimaryColorChange = (color: string) => {
    setPrimaryColor(color);
    setPreviewPrimary(color);
  };

  const handleSecondaryColorChange = (color: string) => {
    setSecondaryColor(color);
    setPreviewSecondary(color);
  };

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
    setPreviewBackground(color);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Formato não suportado. Use PNG, JPG, JPEG ou SVG.");
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Arquivo muito grande. O tamanho máximo é 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUpload({
          file,
          preview: e.target?.result as string,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearLogo = () => {
    setLogoUpload({
      file: null,
      preview: "",
      name: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    if (showCustomForm) {
      resetToOriginalTheme();
      setPreviewPrimary(primaryColor);
      setPreviewSecondary(secondaryColor);
      setPreviewBackground(backgroundColor);
    }
    setShowCustomForm(false);
  };

  const handleClose = () => {
    if (showCustomForm) {
      resetToOriginalTheme();
    }
    setThemeSwitcherOpen(false);
    setShowCustomForm(false);
    setActiveTab(0);
    setShowColorGuide(false);
  };

  const handleReset = () => {
    dispatch(setTheme("rubick"));
    dispatch(setLayout("side-menu"));
    dispatch(setColorScheme("default"));
    dispatch(setDarkMode(false));
    dispatch(clearCustomTheme());
    applyThemeStyles("rubick", false);
    setTimeout(() => window.location.reload(), 100);
  };

  const themes: Array<Themes["name"]> = [
    "rubick",
    "icewall",
    "tinker",
    "enigma",
  ];
  const layouts: Array<Themes["layout"]> = [
    "side-menu",
    "simple-menu",
    "top-menu",
  ];
  const colorSchemes: Array<ColorSchemes> = [
    "default",
    "theme-1",
    "theme-2",
    "theme-3",
    "theme-4",
  ];

  const themeImages = import.meta.glob<{ default: string }>(
    "/src/assets/images/themes/*.{jpg,jpeg,png,svg}",
    { eager: true },
  );
  const layoutImages = import.meta.glob<{ default: string }>(
    "/src/assets/images/layouts/*.{jpg,jpeg,png,svg}",
    { eager: true },
  );

  // Color usage guide
  const colorUsageGuide = [
    {
      color: "primary",
      name: "Cor Primária",
      usage: "Cabeçalhos, menus, botões principais",
      elements: [
        "Barra superior",
        "Menu ativo",
        "Botões de ação",
        "Links importantes",
      ],
    },
    {
      color: "secondary",
      name: "Cor Secundária",
      usage: "Elementos de apoio e acentos",
      elements: [
        "Botões secundários",
        "Badges",
        "Ícones especiais",
        "Destaques",
      ],
    },
    {
      color: "background",
      name: "Cor de Fundo",
      usage: "Fundo principal da aplicação",
      elements: ["Área de conteúdo", "Painéis", "Cards", "Modais"],
    },
  ];

  return (
    <div>
      <Dialog open={themeSwitcherOpen} onClose={handleClose} size="xl">
        <Dialog.Panel className="max-w-6xl mx-auto">
          <Dialog.Title>
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Lucide icon="Palette" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    Configurador de Temas Lawdesk
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Personalize a aparência do sistema jurídico
                  </p>
                </div>
              </div>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleClose}
              >
                <Lucide icon="X" className="w-4 h-4" />
              </Button>
            </div>
          </Dialog.Title>

          <Dialog.Description className="p-0">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Sidebar Navigation */}
              <div className="lg:w-64 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
                <Tab.Group
                  selectedIndex={activeTab}
                  onChange={setActiveTab}
                  vertical
                >
                  <Tab.List className="flex flex-col p-4 space-y-2">
                    <Tab className="flex items-center space-x-3 w-full px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all data-[selected]:bg-blue-500 data-[selected]:text-white">
                      <Lucide icon="Palette" className="w-4 h-4" />
                      Identidade Visual
                    </Tab>
                    <Tab className="flex items-center space-x-3 w-full px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all data-[selected]:bg-blue-500 data-[selected]:text-white">
                      <Lucide icon="Brush" className="w-4 h-4" />
                      Cores Personalizadas
                    </Tab>
                    <Tab className="flex items-center space-x-3 w-full px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all data-[selected]:bg-blue-500 data-[selected]:text-white">
                      <Lucide icon="Layout" className="w-4 h-4" />
                      Layout e Configurações
                    </Tab>
                  </Tab.List>

                  {/* Current Status */}
                  <div className="px-4 pb-4">
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        Status Atual
                      </h4>
                      {isUsingCustomTheme && activeCustomTheme ? (
                        <div className="space-y-2">
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            Tema Personalizado
                          </div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {activeCustomTheme.name}
                          </div>
                          <div className="flex space-x-1">
                            <div
                              className="w-4 h-4 rounded border-2 border-white shadow-sm"
                              style={{
                                backgroundColor:
                                  activeCustomTheme.colors.primary,
                              }}
                            />
                            <div
                              className="w-4 h-4 rounded border-2 border-white shadow-sm"
                              style={{
                                backgroundColor:
                                  activeCustomTheme.colors.secondary,
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            Template Oficial
                          </div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {themeConfigs[activeTheme.name]?.displayName}
                          </div>
                          <div className="flex space-x-1">
                            <div
                              className="w-4 h-4 rounded border-2 border-white shadow-sm"
                              style={{
                                backgroundColor:
                                  themeConfigs[activeTheme.name]?.primaryColor,
                              }}
                            />
                            <div
                              className="w-4 h-4 rounded border-2 border-white shadow-sm"
                              style={{
                                backgroundColor:
                                  themeConfigs[activeTheme.name]
                                    ?.secondaryColor,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Tab.Group>
              </div>

              {/* Main Content */}
              <div className="flex-1 lg:overflow-y-auto">
                <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                  <Tab.Panels>
                    {/* Identidade Visual Tab */}
                    <Tab.Panel className="p-6 space-y-8">
                      {/* Logo Upload Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                          Logo do Escritório
                        </h3>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                          <div className="flex flex-col lg:flex-row gap-6">
                            {/* Upload Area */}
                            <div className="flex-1">
                              <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-pointer"
                              >
                                <Lucide
                                  icon="Upload"
                                  className="w-12 h-12 text-slate-400 mx-auto mb-4"
                                />
                                <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
                                  Fazer upload da logo
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                  Clique para selecionar ou arraste uma imagem
                                </p>
                                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                                  <div>
                                    Formatos aceitos: PNG, JPG, JPEG, SVG
                                  </div>
                                  <div>Tamanho máximo: 2MB</div>
                                  <div>
                                    Dimensões recomendadas: 200x200px ou maior
                                  </div>
                                  <div>
                                    Para melhor resultado, use imagens com fundo
                                    transparente
                                  </div>
                                </div>
                              </div>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                                onChange={handleLogoUpload}
                                className="hidden"
                              />
                            </div>

                            {/* Preview */}
                            {logoUpload.preview && (
                              <div className="lg:w-64">
                                <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3">
                                  Visualização
                                </h4>
                                <div className="space-y-4">
                                  <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                      Fundo claro
                                    </div>
                                    <img
                                      src={logoUpload.preview}
                                      alt="Logo preview"
                                      className="w-16 h-16 object-contain mx-auto"
                                    />
                                  </div>
                                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                                    <div className="text-xs text-slate-300 mb-2">
                                      Fundo escuro
                                    </div>
                                    <img
                                      src={logoUpload.preview}
                                      alt="Logo preview dark"
                                      className="w-16 h-16 object-contain mx-auto filter brightness-0 invert"
                                    />
                                  </div>
                                  <div className="text-xs text-slate-600 dark:text-slate-400">
                                    {logoUpload.name}
                                  </div>
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={clearLogo}
                                    className="w-full"
                                  >
                                    <Lucide
                                      icon="Trash2"
                                      className="w-3 h-3 mr-2"
                                    />
                                    Remover
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Templates Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                          Templates Predefinidos
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {themes.map((theme, themeKey) => {
                            const themeConfig = getThemeConfig(theme);
                            return (
                              <div key={themeKey} className="space-y-3">
                                <div
                                  onClick={() => switchTheme(theme)}
                                  className={clsx([
                                    "relative cursor-pointer bg-white dark:bg-slate-700 rounded-xl p-4 transition-all duration-300 hover:shadow-lg border-2 group",
                                    !isUsingCustomTheme &&
                                    activeTheme.name === theme
                                      ? "border-blue-500 ring-4 ring-blue-200 dark:ring-blue-800 shadow-lg"
                                      : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                                  ])}
                                >
                                  <div className="flex items-center space-x-4">
                                    <div className="w-20 h-16 bg-slate-100 dark:bg-slate-600 rounded-lg overflow-hidden">
                                      {(themeImages[
                                        `/src/assets/images/themes/${theme}.png`
                                      ] ||
                                        themeImages[
                                          `/src/assets/images/themes/${theme}.svg`
                                        ]) && (
                                        <img
                                          className="w-full h-full object-cover"
                                          src={
                                            (
                                              themeImages[
                                                `/src/assets/images/themes/${theme}.png`
                                              ] ||
                                              themeImages[
                                                `/src/assets/images/themes/${theme}.svg`
                                              ]
                                            ).default
                                          }
                                          alt={`${theme} theme`}
                                        />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                                        {themeConfig?.displayName || theme}
                                      </h4>
                                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                        {themeConfig?.description ||
                                          "Template oficial"}
                                      </p>
                                      <div className="flex space-x-2">
                                        <div
                                          className="w-4 h-4 rounded border border-white shadow-sm"
                                          style={{
                                            backgroundColor:
                                              themeConfig?.primaryColor ||
                                              "#3b82f6",
                                          }}
                                          title={`Primária: ${themeConfig?.primaryColor}`}
                                        />
                                        <div
                                          className="w-4 h-4 rounded border border-white shadow-sm"
                                          style={{
                                            backgroundColor:
                                              themeConfig?.secondaryColor ||
                                              "#1e40af",
                                          }}
                                          title={`Secundária: ${themeConfig?.secondaryColor}`}
                                        />
                                      </div>
                                    </div>
                                    {!isUsingCustomTheme &&
                                      activeTheme.name === theme && (
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                          <Lucide
                                            icon="Check"
                                            className="w-3 h-3 text-white"
                                          />
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Tab.Panel>

                    {/* Cores Personalizadas Tab */}
                    <Tab.Panel className="p-6 space-y-8">
                      {/* Create New Custom Theme */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                            Criar Tema Personalizado
                          </h3>
                          <Button
                            variant={
                              showCustomForm ? "outline-secondary" : "primary"
                            }
                            size="sm"
                            onClick={() => {
                              if (showCustomForm) {
                                handleCancel();
                              } else {
                                setShowCustomForm(true);
                                if (isUsingCustomTheme && activeCustomTheme) {
                                  setPrimaryColor(
                                    activeCustomTheme.colors.primary,
                                  );
                                  setSecondaryColor(
                                    activeCustomTheme.colors.secondary,
                                  );
                                  setPreviewPrimary(
                                    activeCustomTheme.colors.primary,
                                  );
                                  setPreviewSecondary(
                                    activeCustomTheme.colors.secondary,
                                  );
                                }
                              }
                            }}
                          >
                            <Lucide
                              icon={showCustomForm ? "X" : "Plus"}
                              className="w-4 h-4 mr-2"
                            />
                            {showCustomForm ? "Cancelar" : "Novo Tema"}
                          </Button>
                        </div>

                        {showCustomForm && (
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <div className="space-y-6">
                              <div>
                                <FormLabel
                                  htmlFor="theme-name"
                                  className="text-sm font-medium"
                                >
                                  Nome do Tema
                                </FormLabel>
                                <FormInput
                                  id="theme-name"
                                  type="text"
                                  value={customThemeName}
                                  onChange={(e) =>
                                    setCustomThemeName(e.target.value)
                                  }
                                  placeholder="Ex: Meu Tema Jurídico Azul"
                                  className="mt-2"
                                />
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <ColorPicker
                                  label="Cor Primária (Cabeçalhos, Menus)"
                                  value={primaryColor}
                                  onChange={handlePrimaryColorChange}
                                  placeholder="#3b82f6"
                                  showPalettes={true}
                                />

                                <ColorPicker
                                  label="Cor Secundária (Acentos, Botões)"
                                  value={secondaryColor}
                                  onChange={handleSecondaryColorChange}
                                  placeholder="#1e40af"
                                  showPalettes={true}
                                />
                              </div>

                              <div>
                                <ColorPicker
                                  label="Cor de Fundo (Área de Conteúdo)"
                                  value={backgroundColor}
                                  onChange={handleBackgroundColorChange}
                                  placeholder="#ffffff"
                                  showPalettes={true}
                                />
                              </div>

                              {/* Color Guide */}
                              <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                                  Guia de Aplicação das Cores
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {colorUsageGuide.map((guide, index) => (
                                    <div key={index} className="space-y-2">
                                      <div className="flex items-center space-x-2">
                                        <div
                                          className="w-4 h-4 rounded border border-slate-300"
                                          style={{
                                            backgroundColor:
                                              guide.color === "primary"
                                                ? previewPrimary
                                                : guide.color === "secondary"
                                                  ? previewSecondary
                                                  : previewBackground,
                                          }}
                                        />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                          {guide.name}
                                        </span>
                                      </div>
                                      <p className="text-xs text-slate-600 dark:text-slate-400">
                                        {guide.usage}
                                      </p>
                                      <div className="space-y-1">
                                        {guide.elements.map(
                                          (element, elemIndex) => (
                                            <div
                                              key={elemIndex}
                                              className="text-xs text-slate-500 dark:text-slate-400"
                                            >
                                              • {element}
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex space-x-3">
                                <Button
                                  variant="primary"
                                  onClick={createCustomTheme}
                                  disabled={
                                    !customThemeName.trim() ||
                                    !isValidHex(primaryColor) ||
                                    !isValidHex(secondaryColor)
                                  }
                                  className="flex-1"
                                >
                                  <Lucide
                                    icon="Save"
                                    className="w-4 h-4 mr-2"
                                  />
                                  Salvar Tema
                                </Button>
                                <Button
                                  variant="outline-secondary"
                                  onClick={handleCancel}
                                >
                                  <Lucide icon="X" className="w-4 h-4 mr-2" />
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Saved Custom Themes */}
                      {customThemes.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                            Temas Salvos ({customThemes.length})
                          </h3>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {customThemes.map((customTheme) => (
                              <div
                                key={customTheme.id}
                                className={clsx([
                                  "relative border rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg group",
                                  activeCustomTheme?.id === customTheme.id
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800"
                                    : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800",
                                ])}
                                onClick={() => applyCustomTheme(customTheme)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="flex space-x-1">
                                      <div
                                        className="w-6 h-6 rounded border-2 border-white shadow-md"
                                        style={{
                                          backgroundColor:
                                            customTheme.colors.primary,
                                        }}
                                      />
                                      <div
                                        className="w-6 h-6 rounded border-2 border-white shadow-md"
                                        style={{
                                          backgroundColor:
                                            customTheme.colors.secondary,
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                                        {customTheme.name}
                                      </h4>
                                      <p className="text-xs text-slate-600 dark:text-slate-400">
                                        Criado em{" "}
                                        {new Date(
                                          customTheme.createdAt,
                                        ).toLocaleDateString("pt-BR")}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {activeCustomTheme?.id ===
                                      customTheme.id && (
                                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Lucide
                                          icon="Check"
                                          className="w-3 h-3 text-white"
                                        />
                                      </div>
                                    )}
                                    <Button
                                      variant="outline-secondary"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteCustomTheme(customTheme.id);
                                      }}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2"
                                    >
                                      <Lucide
                                        icon="Trash2"
                                        className="w-3 h-3"
                                      />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Tab.Panel>

                    {/* Layout e Configurações Tab */}
                    <Tab.Panel className="p-6 space-y-8">
                      {/* Layouts */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                          Layout do Sistema
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          {layouts.map((layout, layoutKey) => (
                            <div key={layoutKey}>
                              <div
                                onClick={() => switchLayout(layout)}
                                className={clsx([
                                  "relative cursor-pointer bg-white dark:bg-slate-700 rounded-xl p-4 transition-all duration-300 hover:shadow-lg border-2 group",
                                  activeTheme.layout === layout
                                    ? "border-blue-500 ring-4 ring-blue-200 dark:ring-blue-800 shadow-lg"
                                    : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                                ])}
                              >
                                <div className="text-center space-y-3">
                                  <div className="w-full h-24 bg-slate-100 dark:bg-slate-600 rounded-lg overflow-hidden">
                                    {(layoutImages[
                                      `/src/assets/images/layouts/${layout}.png`
                                    ] ||
                                      layoutImages[
                                        `/src/assets/images/layouts/${layout}.svg`
                                      ]) && (
                                      <img
                                        className="w-full h-full object-cover"
                                        src={
                                          (
                                            layoutImages[
                                              `/src/assets/images/layouts/${layout}.png`
                                            ] ||
                                            layoutImages[
                                              `/src/assets/images/layouts/${layout}.svg`
                                            ]
                                          ).default
                                        }
                                        alt={`${layout} layout`}
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                                      {layout
                                        .split("-")
                                        .map(
                                          (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1),
                                        )
                                        .join(" ")}
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                      {layout === "side-menu" &&
                                        "Menu lateral clássico"}
                                      {layout === "simple-menu" &&
                                        "Menu simplificado"}
                                      {layout === "top-menu" && "Menu no topo"}
                                    </p>
                                  </div>
                                  {activeTheme.layout === layout && (
                                    <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                      <Lucide
                                        icon="Check"
                                        className="w-3 h-3 text-white"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Color Schemes */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                          Esquemas de Cor
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                          {colorSchemes.map((colorScheme, colorKey) => (
                            <div key={colorKey}>
                              <div
                                onClick={() => switchColorScheme(colorScheme)}
                                className={clsx([
                                  "relative h-20 cursor-pointer bg-white dark:bg-slate-700 rounded-xl p-2 border-2 transition-all duration-300 hover:shadow-lg",
                                  activeColorScheme === colorScheme
                                    ? "border-blue-500 ring-4 ring-blue-200 dark:ring-blue-800 shadow-lg"
                                    : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                                ])}
                              >
                                <div className="h-full overflow-hidden rounded-lg">
                                  <div className="flex items-center h-full gap-1 -mx-1">
                                    <div
                                      className={clsx([
                                        "w-1/2 h-[140%] bg-theme-1 rotate-12",
                                        colorScheme,
                                      ])}
                                    ></div>
                                    <div
                                      className={clsx([
                                        "w-1/2 h-[140%] bg-theme-2 rotate-12",
                                        colorScheme,
                                      ])}
                                    ></div>
                                  </div>
                                </div>
                                {activeColorScheme === colorScheme && (
                                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Lucide
                                      icon="Check"
                                      className="w-2 h-2 text-white"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="mt-2 text-center text-xs font-medium text-slate-700 dark:text-slate-300">
                                {colorScheme === "default"
                                  ? "Padrão"
                                  : colorScheme}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Appearance */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                          Modo de Aparência
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <button
                              onClick={() => switchDarkMode(false)}
                              className={clsx([
                                "relative w-full h-24 cursor-pointer bg-white dark:bg-slate-700 rounded-xl p-4 border-2 transition-all duration-300 hover:shadow-lg",
                                !activeDarkMode
                                  ? "border-blue-500 ring-4 ring-blue-200 dark:ring-blue-800 shadow-lg"
                                  : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                              ])}
                            >
                              <div className="h-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                <Lucide
                                  icon="Sun"
                                  className="w-8 h-8 text-yellow-500"
                                />
                              </div>
                              {!activeDarkMode && (
                                <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <Lucide
                                    icon="Check"
                                    className="w-2 h-2 text-white"
                                  />
                                </div>
                              )}
                              <div className="mt-2 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
                                Modo Claro
                              </div>
                            </button>
                          </div>
                          <div>
                            <button
                              onClick={() => switchDarkMode(true)}
                              className={clsx([
                                "relative w-full h-24 cursor-pointer bg-white dark:bg-slate-700 rounded-xl p-4 border-2 transition-all duration-300 hover:shadow-lg",
                                activeDarkMode
                                  ? "border-blue-500 ring-4 ring-blue-200 dark:ring-blue-800 shadow-lg"
                                  : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                              ])}
                            >
                              <div className="h-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                <Lucide
                                  icon="Moon"
                                  className="w-8 h-8 text-blue-400"
                                />
                              </div>
                              {activeDarkMode && (
                                <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <Lucide
                                    icon="Check"
                                    className="w-2 h-2 text-white"
                                  />
                                </div>
                              )}
                              <div className="mt-2 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
                                Modo Escuro
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Reset Options */}
                      <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                          Opções de Reset
                        </h3>
                        <div className="space-y-3">
                          {isUsingCustomTheme && (
                            <Button
                              variant="outline-secondary"
                              onClick={() => {
                                dispatch(clearCustomTheme());
                                applyThemeStyles(
                                  activeTheme.name,
                                  activeDarkMode,
                                );
                              }}
                              className="w-full justify-start"
                            >
                              <Lucide icon="Undo" className="w-4 h-4 mr-2" />
                              Voltar ao Template Oficial
                            </Button>
                          )}
                          <Button
                            variant="outline-secondary"
                            onClick={handleReset}
                            className="w-full justify-start"
                          >
                            <Lucide icon="RotateCcw" className="w-4 h-4 mr-2" />
                            Reset Completo (Padrões de Fábrica)
                          </Button>
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>

      {/* Floating Action Button */}
      <div
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          setThemeSwitcherOpen(true);
        }}
        className="fixed bottom-0 right-0 z-50 flex items-center justify-center mb-5 mr-5 text-white rounded-full shadow-xl cursor-pointer w-14 h-14 hover:scale-110 transition-all duration-300 group"
        style={{
          backgroundColor:
            isUsingCustomTheme && activeCustomTheme
              ? activeCustomTheme.colors.primary
              : themeConfigs[activeTheme.name]?.primaryColor || "#3b82f6",
        }}
      >
        <Lucide
          className="w-5 h-5 group-hover:animate-spin text-white transition-all duration-300"
          icon="Settings"
        />
      </div>
    </div>
  );
}

export default Main;
