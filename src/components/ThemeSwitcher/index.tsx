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
import { Slideover } from "@/components/Base/Headless";
import { Tab } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { FormInput, FormLabel } from "@/components/Base/Form";
import ColorPicker from "@/components/Base/ColorPicker";
import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import {
  themeConfigs,
  applyThemeStyles,
  getThemeConfig,
} from "@/config/themes";
import {
  applyCustomThemeColors,
  isValidHex,
  resetToDefaultColors,
} from "@/utils/colorUtils";

function Main() {
  const dispatch = useAppDispatch();
  const [themeSwitcherSlideover, setThemeSwitcherSlideover] = useState(false);
  const [customThemeName, setCustomThemeName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#1e40af");
  const [previewPrimary, setPreviewPrimary] = useState("#3b82f6");
  const [previewSecondary, setPreviewSecondary] = useState("#1e40af");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showColorGuide, setShowColorGuide] = useState(false);

  const activeTheme = useAppSelector(selectTheme);
  const activeColorScheme = useAppSelector(selectColorScheme);
  const activeDarkMode = useAppSelector(selectDarkMode);
  const customThemes = useAppSelector(selectCustomThemes);
  const activeCustomTheme = useAppSelector(selectActiveCustomTheme);
  const isUsingCustomTheme = useAppSelector(selectIsUsingCustomTheme);

  // Apply preview colors immediately
  const applyPreviewColors = useCallback(
    (primary: string, secondary: string) => {
      if (isValidHex(primary) && isValidHex(secondary)) {
        applyCustomThemeColors(primary, secondary, activeDarkMode);
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
      // Use original theme colors from configuration
      applyThemeStyles(activeTheme.name, activeDarkMode);
    }
  }, [isUsingCustomTheme, activeCustomTheme, activeTheme.name, activeDarkMode]);

  const switchTheme = (theme: Themes["name"]) => {
    dispatch(setTheme(theme));
    dispatch(clearCustomTheme()); // Clear any custom theme
    // Apply original theme colors from configuration
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
      applyPreviewColors(previewPrimary, previewSecondary);
    }
  }, [previewPrimary, previewSecondary, showCustomForm, applyPreviewColors]);

  const handlePrimaryColorChange = (color: string) => {
    setPrimaryColor(color);
    setPreviewPrimary(color);
  };

  const handleSecondaryColorChange = (color: string) => {
    setSecondaryColor(color);
    setPreviewSecondary(color);
  };

  const handleCancel = () => {
    if (showCustomForm) {
      resetToOriginalTheme();
      setPreviewPrimary(primaryColor);
      setPreviewSecondary(secondaryColor);
    }
    setShowCustomForm(false);
  };

  const handleClose = () => {
    if (showCustomForm) {
      resetToOriginalTheme();
    }
    setThemeSwitcherSlideover(false);
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
    // Reset to Rubick theme original colors
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
      usage: "Cabeçalhos, botões principais, menu ativo, logo",
      elements: [
        "Top Bar",
        "Botões de Ação",
        "Links Ativos",
        "Menu Selecionado",
      ],
    },
    {
      color: "secondary",
      name: "Cor Secundária",
      usage: "Botões secundários, acentos, detalhes",
      elements: ["Botões Secundários", "Badges", "Acentos", "Ícones Especiais"],
    },
  ];

  return (
    <div>
      <Slideover open={themeSwitcherSlideover} onClose={handleClose}>
        <Slideover.Panel className="w-full max-w-md rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[50px] border rounded-full text-white/90 w-10 h-10 border-white/90 hover:scale-105 z-10"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            <Lucide className="w-4 h-4 stroke-[1.5]" icon="X" />
          </a>

          <Slideover.Description className="p-0 h-full">
            <div className="flex flex-col h-full bg-white dark:bg-slate-800">
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                      ⚖️ Configurador de Temas Lawdesk
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Personalize a aparência do sistema jurídico
                    </p>
                  </div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setShowColorGuide(!showColorGuide)}
                    className="shrink-0"
                  >
                    <Lucide icon="Info" className="w-4 h-4" />
                  </Button>
                </div>

                {/* Color Usage Guide */}
                {showColorGuide && (
                  <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-semibold mb-3 text-slate-800 dark:text-slate-200">
                      🎯 Guia de Aplicação de Cores
                    </h3>
                    <div className="space-y-3">
                      {colorUsageGuide.map((guide, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm mt-0.5"
                            style={{
                              backgroundColor:
                                guide.color === "primary"
                                  ? previewPrimary
                                  : previewSecondary,
                            }}
                          />
                          <div className="flex-1">
                            <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                              {guide.name}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                              {guide.usage}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {guide.elements.map((element, elemIndex) => (
                                <span
                                  key={elemIndex}
                                  className="inline-block text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded"
                                >
                                  {element}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden">
                <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                  <Tab.List className="flex border-b border-slate-200 dark:border-slate-700 px-6 bg-slate-50 dark:bg-slate-900/50">
                    <Tab className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-b-2 border-transparent data-[selected]:border-blue-500 data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400 transition-all">
                      🎨 Templates
                    </Tab>
                    <Tab className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-b-2 border-transparent data-[selected]:border-blue-500 data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400 transition-all">
                      🌈 Personalizado
                    </Tab>
                    <Tab className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-b-2 border-transparent data-[selected]:border-blue-500 data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400 transition-all">
                      ⚙️ Configurações
                    </Tab>
                  </Tab.List>

                  <Tab.Panels className="flex-1 overflow-y-auto">
                    {/* Themes Tab */}
                    <Tab.Panel className="p-6 space-y-6">
                      {/* Current Theme Status */}
                      {isUsingCustomTheme && activeCustomTheme ? (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                <Lucide
                                  icon="Palette"
                                  className="w-4 h-4 text-purple-600 dark:text-purple-400"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                                  Tema Personalizado Ativo
                                </h4>
                                <p className="text-sm text-purple-600 dark:text-purple-300">
                                  {activeCustomTheme.name}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                style={{
                                  backgroundColor:
                                    activeCustomTheme.colors.primary,
                                }}
                                title={`Primária: ${activeCustomTheme.colors.primary}`}
                              />
                              <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                style={{
                                  backgroundColor:
                                    activeCustomTheme.colors.secondary,
                                }}
                                title={`Secundária: ${activeCustomTheme.colors.secondary}`}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <Lucide
                                  icon="Layout"
                                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                                  Template Oficial Ativo
                                </h4>
                                <p className="text-sm text-blue-600 dark:text-blue-300">
                                  {themeConfigs[activeTheme.name]
                                    ?.displayName || activeTheme.name}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                style={{
                                  backgroundColor:
                                    themeConfigs[activeTheme.name]
                                      ?.primaryColor || "#3b82f6",
                                }}
                                title={`Primária: ${themeConfigs[activeTheme.name]?.primaryColor}`}
                              />
                              <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                style={{
                                  backgroundColor:
                                    themeConfigs[activeTheme.name]
                                      ?.secondaryColor || "#1e40af",
                                }}
                                title={`Secundária: ${themeConfigs[activeTheme.name]?.secondaryColor}`}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Predefined Templates */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center">
                          <Lucide icon="Layout" className="w-5 h-5 mr-2" />
                          Templates Oficiais
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {themes.map((theme, themeKey) => {
                            const themeConfig = getThemeConfig(theme);
                            return (
                              <div key={themeKey} className="space-y-3">
                                <div
                                  onClick={() => switchTheme(theme)}
                                  className={clsx([
                                    "relative h-24 cursor-pointer bg-slate-50 dark:bg-slate-700 rounded-xl p-2 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 group",
                                    !isUsingCustomTheme &&
                                    activeTheme.name === theme
                                      ? "border-blue-500 ring-4 ring-blue-200 dark:ring-blue-800 shadow-lg"
                                      : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                                  ])}
                                >
                                  <div className="w-full h-full overflow-hidden rounded-lg">
                                    {(themeImages[
                                      `/src/assets/images/themes/${theme}.png`
                                    ] ||
                                      themeImages[
                                        `/src/assets/images/themes/${theme}.svg`
                                      ]) && (
                                      <img
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
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
                                  {!isUsingCustomTheme &&
                                    activeTheme.name === theme && (
                                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Lucide
                                          icon="Check"
                                          className="w-3 h-3 text-white"
                                        />
                                      </div>
                                    )}
                                  {/* Color indicator */}
                                  <div className="absolute bottom-2 left-2 flex space-x-1">
                                    <div
                                      className="w-3 h-3 rounded-full border border-white shadow-sm"
                                      style={{
                                        backgroundColor:
                                          themeConfig?.primaryColor ||
                                          "#3b82f6",
                                      }}
                                    />
                                    <div
                                      className="w-3 h-3 rounded-full border border-white shadow-sm"
                                      style={{
                                        backgroundColor:
                                          themeConfig?.secondaryColor ||
                                          "#1e40af",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    {themeConfig?.displayName || theme}
                                  </div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">
                                    {themeConfig?.description ||
                                      "Template oficial"}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Tab.Panel>

                    {/* Custom Colors Tab */}
                    <Tab.Panel className="p-6 space-y-6">
                      {/* Create New Custom Theme */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                            <Lucide icon="Sparkles" className="w-5 h-5 mr-2" />
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
                            className="shadow-sm"
                          >
                            <Lucide
                              icon={showCustomForm ? "X" : "Plus"}
                              className="w-4 h-4 mr-2"
                            />
                            {showCustomForm ? "Cancelar" : "Novo Tema"}
                          </Button>
                        </div>

                        {showCustomForm && (
                          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="space-y-6">
                              <div>
                                <FormLabel
                                  htmlFor="theme-name"
                                  className="text-sm font-medium flex items-center"
                                >
                                  <Lucide
                                    icon="Edit"
                                    className="w-4 h-4 mr-2"
                                  />
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

                              <div className="grid grid-cols-1 gap-6">
                                <ColorPicker
                                  label="⚖️ Cor Primária (Cabeçalhos, Menus)"
                                  value={primaryColor}
                                  onChange={handlePrimaryColorChange}
                                  placeholder="#3b82f6"
                                  showPalettes={true}
                                />

                                <ColorPicker
                                  label="✨ Cor Secundária (Acentos, Botões)"
                                  value={secondaryColor}
                                  onChange={handleSecondaryColorChange}
                                  placeholder="#1e40af"
                                  showPalettes={true}
                                />
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
                                  className="flex-1 shadow-sm"
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
                                  className="shadow-sm"
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
                          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center">
                            <Lucide icon="Star" className="w-5 h-5 mr-2" />
                            Temas Salvos ({customThemes.length})
                          </h3>
                          <div className="space-y-3">
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
                                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                        style={{
                                          backgroundColor:
                                            customTheme.colors.primary,
                                        }}
                                        title={`Primária: ${customTheme.colors.primary}`}
                                      />
                                      <div
                                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                        style={{
                                          backgroundColor:
                                            customTheme.colors.secondary,
                                        }}
                                        title={`Secundária: ${customTheme.colors.secondary}`}
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
                                        icon="Trash"
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

                    {/* Config Tab */}
                    <Tab.Panel className="p-6 space-y-6">
                      {/* Layouts */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center">
                          <Lucide icon="Layout" className="w-5 h-5 mr-2" />
                          Layout do Sistema
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          {layouts.map((layout, layoutKey) => (
                            <div key={layoutKey}>
                              <div
                                onClick={() => switchLayout(layout)}
                                className={clsx([
                                  "relative h-20 cursor-pointer bg-slate-50 dark:bg-slate-700 rounded-xl p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 group flex items-center space-x-4",
                                  activeTheme.layout === layout
                                    ? "border-blue-500 ring-4 ring-blue-200 dark:ring-blue-800 shadow-lg"
                                    : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                                ])}
                              >
                                <div className="w-16 h-full overflow-hidden rounded-lg bg-white dark:bg-slate-600">
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
                                <div className="flex-1">
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
                                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Lucide
                                      icon="Check"
                                      className="w-3 h-3 text-white"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Color Schemes */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center">
                          <Lucide icon="Palette" className="w-5 h-5 mr-2" />
                          Esquemas de Cor
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {colorSchemes.map((colorScheme, colorKey) => (
                            <div key={colorKey}>
                              <div
                                onClick={() => switchColorScheme(colorScheme)}
                                className={clsx([
                                  "relative h-16 cursor-pointer bg-slate-50 dark:bg-slate-700 rounded-xl p-2 border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg",
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
                              <div className="mt-2 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
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
                        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center">
                          <Lucide icon="Monitor" className="w-5 h-5 mr-2" />
                          Modo de Aparência
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <button
                              onClick={() => switchDarkMode(false)}
                              className={clsx([
                                "relative w-full h-20 cursor-pointer bg-slate-50 dark:bg-slate-700 rounded-xl p-3 border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg",
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
                                <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <Lucide
                                    icon="Check"
                                    className="w-2 h-2 text-white"
                                  />
                                </div>
                              )}
                            </button>
                            <div className="mt-2 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
                              Modo Claro
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => switchDarkMode(true)}
                              className={clsx([
                                "relative w-full h-20 cursor-pointer bg-slate-50 dark:bg-slate-700 rounded-xl p-3 border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg",
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
                                <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <Lucide
                                    icon="Check"
                                    className="w-2 h-2 text-white"
                                  />
                                </div>
                              )}
                            </button>
                            <div className="mt-2 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
                              Modo Escuro
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reset Options */}
                      <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center">
                          <Lucide icon="Undo" className="w-5 h-5 mr-2" />
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
                              className="w-full justify-start shadow-sm"
                            >
                              <Lucide icon="Undo" className="w-4 h-4 mr-2" />
                              Voltar ao Template Oficial
                            </Button>
                          )}
                          <Button
                            variant="outline-secondary"
                            onClick={handleReset}
                            className="w-full justify-start shadow-sm"
                          >
                            <Lucide icon="RefreshCw" className="w-4 h-4 mr-2" />
                            Reset Completo (Padrões de Fábrica)
                          </Button>
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>

      <div
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          setThemeSwitcherSlideover(true);
        }}
        className="fixed bottom-0 right-0 z-50 flex items-center justify-center mb-5 mr-5 text-white header-text-optimal rounded-full shadow-xl cursor-pointer w-14 h-14 bg-theme-1 hover:scale-110 transition-all duration-300 group"
        style={{
          backgroundColor:
            isUsingCustomTheme && activeCustomTheme
              ? activeCustomTheme.colors.primary
              : themeConfigs[activeTheme.name]?.primaryColor || "#3b82f6",
        }}
      >
        <Lucide
          className="w-5 h-5 group-hover:animate-spin text-white header-text-optimal transition-all duration-300"
          icon="Settings"
        />
      </div>
    </div>
  );
}

export default Main;
