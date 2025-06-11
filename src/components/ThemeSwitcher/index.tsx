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
import { themeConfigs, applyThemeStyles } from "@/config/themes";
import { applyCustomThemeColors, isValidHex } from "@/utils/colorUtils";

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
    // Layout changes take effect immediately
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
    // If deleting active theme, switch to default
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

    // Apply appropriate theme styles
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

  // Handle color picker changes with preview
  const handlePrimaryColorChange = (color: string) => {
    setPrimaryColor(color);
    setPreviewPrimary(color);
  };

  const handleSecondaryColorChange = (color: string) => {
    setSecondaryColor(color);
    setPreviewSecondary(color);
  };

  // Reset preview when canceling
  const handleCancel = () => {
    if (showCustomForm) {
      resetToOriginalTheme();
      setPreviewPrimary(primaryColor);
      setPreviewSecondary(secondaryColor);
    }
    setShowCustomForm(false);
  };

  // Close handler
  const handleClose = () => {
    if (showCustomForm) {
      resetToOriginalTheme();
    }
    setThemeSwitcherSlideover(false);
    setShowCustomForm(false);
    setActiveTab(0);
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

  return (
    <div>
      <Slideover open={themeSwitcherSlideover} onClose={handleClose}>
        <Slideover.Panel className="w-full sm:w-96 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[40px] sm:-ml-[60px] border rounded-full text-white/90 w-8 h-8 sm:w-12 sm:h-12 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            <Lucide className="w-3 h-3 sm:w-5 sm:h-5 stroke-[1]" icon="X" />
          </a>

          <Slideover.Description className="p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  Configurador de Temas
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Personalize a aparência do Lawdesk
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden bg-white dark:bg-slate-800">
                <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                  <Tab.List className="flex border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50">
                    <Tab className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-b-2 border-transparent data-[selected]:border-blue-500 data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400 transition-colors">
                      Temas
                    </Tab>
                    <Tab className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-b-2 border-transparent data-[selected]:border-blue-500 data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400 transition-colors">
                      Personalizado
                    </Tab>
                    <Tab className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-b-2 border-transparent data-[selected]:border-blue-500 data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400 transition-colors">
                      Layout
                    </Tab>
                  </Tab.List>

                  <Tab.Panels className="flex-1 overflow-y-auto">
                    {/* Themes Tab */}
                    <Tab.Panel className="p-4 sm:p-6 space-y-6">
                      {/* Current Theme Status */}
                      {isUsingCustomTheme && activeCustomTheme && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-medium text-blue-800 dark:text-blue-200 text-sm">
                                Tema Personalizado Ativo
                              </h4>
                              <p className="text-xs text-blue-600 dark:text-blue-300 truncate">
                                {activeCustomTheme.name}
                              </p>
                            </div>
                            <div className="flex space-x-1 ml-3">
                              <div
                                className="w-5 h-5 rounded border border-white shadow-sm"
                                style={{
                                  backgroundColor:
                                    activeCustomTheme.colors.primary,
                                }}
                                title={`Primária: ${activeCustomTheme.colors.primary}`}
                              />
                              <div
                                className="w-5 h-5 rounded border border-white shadow-sm"
                                style={{
                                  backgroundColor:
                                    activeCustomTheme.colors.secondary,
                                }}
                                title={`Secundária: ${activeCustomTheme.colors.secondary}`}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Predefined Templates */}
                      <div>
                        <h3 className="text-base font-medium mb-4 text-slate-800 dark:text-slate-200">
                          Templates Predefinidos
                        </h3>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          {themes.map((theme, themeKey) => (
                            <div key={themeKey} className="space-y-2">
                              <div
                                onClick={() => switchTheme(theme)}
                                className={clsx([
                                  "h-16 sm:h-20 cursor-pointer bg-slate-50 dark:bg-slate-700 box p-1 rounded-lg transition-all hover:scale-105 border-2",
                                  !isUsingCustomTheme &&
                                  activeTheme.name === theme
                                    ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                                    : "border-transparent hover:border-slate-300 dark:hover:border-slate-600",
                                ])}
                              >
                                <div className="w-full h-full overflow-hidden rounded">
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
                              </div>
                              <div className="text-center text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                                {themeConfigs[theme]?.displayName || theme}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Tab.Panel>

                    {/* Custom Colors Tab */}
                    <Tab.Panel className="p-4 sm:p-6 space-y-6">
                      {/* Create New Custom Theme */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-base font-medium text-slate-800 dark:text-slate-200">
                            Criar Tema Personalizado
                          </h3>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              if (showCustomForm) {
                                handleCancel();
                              } else {
                                setShowCustomForm(true);
                                // Initialize preview with current colors
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
                              className="w-4 h-4 mr-1"
                            />
                            {showCustomForm ? "Cancelar" : "Novo"}
                          </Button>
                        </div>

                        {showCustomForm && (
                          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 sm:p-4 space-y-4 border border-slate-200 dark:border-slate-700">
                            <div>
                              <FormLabel
                                htmlFor="theme-name"
                                className="text-sm"
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
                                placeholder="Ex: Meu Tema Azul"
                                className="mt-1 text-sm"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <ColorPicker
                                label="Cor Primária"
                                value={primaryColor}
                                onChange={handlePrimaryColorChange}
                                placeholder="#3b82f6"
                              />

                              <ColorPicker
                                label="Cor Secundária"
                                value={secondaryColor}
                                onChange={handleSecondaryColorChange}
                                placeholder="#1e40af"
                              />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                variant="primary"
                                onClick={createCustomTheme}
                                disabled={
                                  !customThemeName.trim() ||
                                  !isValidHex(primaryColor) ||
                                  !isValidHex(secondaryColor)
                                }
                                className="flex-1 text-sm"
                              >
                                <Lucide icon="Save" className="w-4 h-4 mr-1" />
                                Salvar Tema
                              </Button>
                              <Button
                                variant="outline-secondary"
                                onClick={handleCancel}
                                className="text-sm"
                              >
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Saved Custom Themes */}
                      {customThemes.length > 0 && (
                        <div>
                          <h3 className="text-base font-medium mb-4 text-slate-800 dark:text-slate-200">
                            Temas Salvos ({customThemes.length})
                          </h3>
                          <div className="space-y-3">
                            {customThemes.map((customTheme) => (
                              <div
                                key={customTheme.id}
                                className={clsx([
                                  "border rounded-lg p-3 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50",
                                  activeCustomTheme?.id === customTheme.id
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-slate-200 dark:border-slate-700",
                                ])}
                                onClick={() => applyCustomTheme(customTheme)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-medium text-sm text-slate-800 dark:text-slate-200 truncate">
                                      {customTheme.name}
                                    </h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                      {new Date(
                                        customTheme.createdAt,
                                      ).toLocaleDateString("pt-BR")}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-2 ml-3">
                                    <div className="flex space-x-1">
                                      <div
                                        className="w-5 h-5 rounded border border-white shadow-sm"
                                        style={{
                                          backgroundColor:
                                            customTheme.colors.primary,
                                        }}
                                        title={`Primária: ${customTheme.colors.primary}`}
                                      />
                                      <div
                                        className="w-5 h-5 rounded border border-white shadow-sm"
                                        style={{
                                          backgroundColor:
                                            customTheme.colors.secondary,
                                        }}
                                        title={`Secundária: ${customTheme.colors.secondary}`}
                                      />
                                    </div>
                                    <Button
                                      variant="outline-secondary"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteCustomTheme(customTheme.id);
                                      }}
                                      className="p-1"
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

                    {/* Layout Tab */}
                    <Tab.Panel className="p-4 sm:p-6 space-y-6">
                      {/* Layouts */}
                      <div>
                        <h3 className="text-base font-medium mb-4 text-slate-800 dark:text-slate-200">
                          Layout
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                          {layouts.map((layout, layoutKey) => (
                            <div key={layoutKey} className="space-y-2">
                              <div
                                onClick={() => switchLayout(layout)}
                                className={clsx([
                                  "h-16 cursor-pointer bg-slate-50 dark:bg-slate-700 box p-1 rounded-lg transition-all hover:scale-105 border-2",
                                  activeTheme.layout === layout
                                    ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                                    : "border-transparent hover:border-slate-300 dark:hover:border-slate-600",
                                ])}
                              >
                                <div className="w-full h-full overflow-hidden rounded">
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
                              </div>
                              <div className="text-center text-xs font-medium text-slate-700 dark:text-slate-300">
                                {layout
                                  .split("-")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1),
                                  )
                                  .join(" ")}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Color Schemes */}
                      <div>
                        <h3 className="text-base font-medium mb-4 text-slate-800 dark:text-slate-200">
                          Esquemas de Cor
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {colorSchemes.map((colorScheme, colorKey) => (
                            <div key={colorKey} className="space-y-2">
                              <div
                                onClick={() => switchColorScheme(colorScheme)}
                                className={clsx([
                                  "h-12 cursor-pointer bg-slate-50 dark:bg-slate-700 box rounded-lg p-1 border-2 transition-all hover:scale-105",
                                  activeColorScheme === colorScheme
                                    ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                                    : "border-transparent hover:border-slate-300 dark:hover:border-slate-600",
                                ])}
                              >
                                <div className="h-full overflow-hidden rounded">
                                  <div className="flex items-center h-full gap-1 -mx-2">
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
                              </div>
                              <div className="text-center text-xs text-slate-700 dark:text-slate-300">
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
                        <h3 className="text-base font-medium mb-4 text-slate-800 dark:text-slate-200">
                          Aparência
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <button
                              onClick={() => switchDarkMode(false)}
                              className={clsx([
                                "h-12 w-full cursor-pointer bg-slate-50 dark:bg-slate-700 box p-1 border-2 rounded-lg transition-all hover:scale-105",
                                !activeDarkMode
                                  ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                                  : "border-transparent hover:border-slate-300 dark:hover:border-slate-600",
                              ])}
                            >
                              <div className="h-full overflow-hidden rounded bg-slate-200"></div>
                            </button>
                            <div className="text-center text-sm text-slate-700 dark:text-slate-300">
                              Claro
                            </div>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => switchDarkMode(true)}
                              className={clsx([
                                "h-12 w-full cursor-pointer bg-slate-50 dark:bg-slate-700 box p-1 border-2 rounded-lg transition-all hover:scale-105",
                                activeDarkMode
                                  ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                                  : "border-transparent hover:border-slate-300 dark:hover:border-slate-600",
                              ])}
                            >
                              <div className="h-full overflow-hidden rounded bg-slate-900"></div>
                            </button>
                            <div className="text-center text-sm text-slate-700 dark:text-slate-300">
                              Escuro
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reset Options */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <h3 className="text-base font-medium mb-4 text-slate-800 dark:text-slate-200">
                          Opções de Reset
                        </h3>
                        <div className="space-y-2">
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
                              className="w-full text-sm"
                            >
                              <Lucide
                                icon="RotateCcw"
                                className="w-4 h-4 mr-2"
                              />
                              Voltar ao Tema Padrão
                            </Button>
                          )}
                          <Button
                            variant="outline-secondary"
                            onClick={() => {
                              dispatch(setTheme("rubick"));
                              dispatch(setLayout("side-menu"));
                              dispatch(setColorScheme("default"));
                              dispatch(setDarkMode(false));
                              dispatch(clearCustomTheme());
                              applyThemeStyles("rubick", false);
                              setTimeout(() => window.location.reload(), 100);
                            }}
                            className="w-full text-sm"
                          >
                            <Lucide icon="RefreshCw" className="w-4 h-4 mr-2" />
                            Reset Completo
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
        className="fixed bottom-0 right-0 z-50 flex items-center justify-center mb-5 mr-5 text-white rounded-full shadow-lg cursor-pointer w-12 h-12 sm:w-14 sm:h-14 bg-theme-1 hover:scale-110 transition-transform"
      >
        <Lucide
          className="w-4 h-4 sm:w-5 sm:h-5 animate-spin"
          icon="Settings"
        />
      </div>
    </div>
  );
}

export default Main;
