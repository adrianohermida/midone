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
import { useState, useEffect } from "react";
import clsx from "clsx";
import { themeConfigs, applyThemeStyles } from "@/config/themes";
import { applyCustomThemeColors, isValidHex, getOptimalTextColor } from "@/utils/colorUtils";

function Main() {
  const dispatch = useAppDispatch();
  const [themeSwitcherSlideover, setThemeSwitcherSlideover] = useState(false);
  const [customThemeName, setCustomThemeName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#1e40af");
  const [showCustomForm, setShowCustomForm] = useState(false);

  const activeTheme = useAppSelector(selectTheme);
  const activeColorScheme = useAppSelector(selectColorScheme);
  const activeDarkMode = useAppSelector(selectDarkMode);
  const customThemes = useAppSelector(selectCustomThemes);
  const activeCustomTheme = useAppSelector(selectActiveCustomTheme);
  const isUsingCustomTheme = useAppSelector(selectIsUsingCustomTheme);

  const switchTheme = (theme: Themes["name"]) => {
    dispatch(setTheme(theme));
    dispatch(clearCustomTheme()); // Clear custom theme when switching to predefined theme
    applyThemeStyles(theme, activeDarkMode);
  };

  const switchLayout = (layout: Themes["layout"]) => {
    dispatch(setLayout(layout));
  };

  const applyCustomTheme = (customTheme: CustomTheme) => {
    dispatch(setActiveCustomTheme(customTheme));
    applyCustomThemeColors(customTheme.colors.primary, customTheme.colors.secondary, activeDarkMode);
  };

  const createCustomTheme = () => {
    if (!customThemeName.trim() || !isValidHex(primaryColor) || !isValidHex(secondaryColor)) {
      return;
    }

    const newCustomTheme = {
      name: customThemeName.trim(),
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
      },
    };

    dispatch(addCustomTheme(newCustomTheme));

    // Apply the new theme immediately
    const createdTheme: CustomTheme = {
      ...newCustomTheme,
      id: Date.now().toString(),
      isCustom: true,
      createdAt: Date.now(),
    };

    applyCustomTheme(createdTheme);

    // Reset form
    setCustomThemeName("");
    setPrimaryColor("#3b82f6");
    setSecondaryColor("#1e40af");
    setShowCustomForm(false);
  };

  const deleteCustomTheme = (themeId: string) => {
    dispatch(removeCustomTheme(themeId));
  };

  const setColorSchemeClass = () => {
    const el = document.querySelectorAll("html")[0];
    el.setAttribute("class", activeColorScheme);
    activeDarkMode && el.classList.add("dark");
  };
  const switchColorScheme = (colorScheme: ColorSchemes) => {
    dispatch(setColorScheme(colorScheme));
    setColorSchemeClass();
  };
  setColorSchemeClass();

  const setDarkModeClass = () => {
    const el = document.querySelectorAll("html")[0];
    activeDarkMode ? el.classList.add("dark") : el.classList.remove("dark");
  };

  const switchDarkMode = (darkMode: boolean) => {
    dispatch(setDarkMode(darkMode));
    setDarkModeClass();

    // Apply appropriate theme styles
    if (isUsingCustomTheme && activeCustomTheme) {
      applyCustomThemeColors(activeCustomTheme.colors.primary, activeCustomTheme.colors.secondary, darkMode);
    } else {
      applyThemeStyles(activeTheme.name, darkMode);
    }
  };
  setDarkModeClass();

  // Initialize theme styles on component mount
  useEffect(() => {
    if (isUsingCustomTheme && activeCustomTheme) {
      applyCustomThemeColors(activeCustomTheme.colors.primary, activeCustomTheme.colors.secondary, activeDarkMode);
    } else {
      applyThemeStyles(activeTheme.name, activeDarkMode);
    }
  }, []);

  // Update colors when primary/secondary colors change
  useEffect(() => {
    if (isValidHex(primaryColor) && isValidHex(secondaryColor)) {
      // Real-time preview while editing
      if (showCustomForm) {
        applyCustomThemeColors(primaryColor, secondaryColor, activeDarkMode);
      }
    }
  }, [primaryColor, secondaryColor, activeDarkMode, showCustomForm]);

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

  const themeImages = import.meta.glob<{
    default: string;
  }>("/src/assets/images/themes/*.{jpg,jpeg,png,svg}", { eager: true });
  const layoutImages = import.meta.glob<{
    default: string;
  }>("/src/assets/images/layouts/*.{jpg,jpeg,png,svg}", { eager: true });

  return (
    <div>
      <Slideover
        open={themeSwitcherSlideover}
        onClose={() => {
          setThemeSwitcherSlideover(false);
          setShowCustomForm(false);
        }}
      >
        <Slideover.Panel className="w-96 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setThemeSwitcherSlideover(false);
              setShowCustomForm(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  Personalizador de Temas
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Configure a aparência do seu sistema
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <Tab.Group>
                  <Tab.List className="flex border-b border-slate-200 dark:border-slate-700 px-6">
                    <Tab className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-b-2 border-transparent data-[selected]:border-blue-500 data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400">
                      Temas
                    </Tab>
                    <Tab className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-b-2 border-transparent data-[selected]:border-blue-500 data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400">
                      Cores Personalizadas
                    </Tab>
                    <Tab className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-b-2 border-transparent data-[selected]:border-blue-500 data-[selected]:text-blue-600 dark:data-[selected]:text-blue-400">
                      Configurações
                    </Tab>
                  </Tab.List>

                  <Tab.Panels>
                    {/* Themes Tab */}
                    <Tab.Panel className="p-6 space-y-6">
                      {/* Current Theme Status */}
                      {isUsingCustomTheme && activeCustomTheme && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-blue-800 dark:text-blue-200">
                                Tema Personalizado Ativo
                              </h4>
                              <p className="text-sm text-blue-600 dark:text-blue-300">
                                {activeCustomTheme.name}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <div
                                className="w-6 h-6 rounded border border-white shadow-sm"
                                style={{ backgroundColor: activeCustomTheme.colors.primary }}
                              />
                              <div
                                className="w-6 h-6 rounded border border-white shadow-sm"
                                style={{ backgroundColor: activeCustomTheme.colors.secondary }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Predefined Templates */}
                      <div>
                        <h3 className="text-base font-medium mb-4">Templates Predefinidos</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {themes.map((theme, themeKey) => (
                            <div key={themeKey}>
                              <div
                                onClick={() => switchTheme(theme)}
                                className={clsx([
                                  "h-20 cursor-pointer bg-slate-50 dark:bg-slate-800 box p-1 rounded-lg transition-all hover:scale-105",
                                  !isUsingCustomTheme && activeTheme.name === theme &&
                                    "ring-2 ring-blue-500 ring-offset-2",
                                ])}
                              >
                                <div className="w-full h-full overflow-hidden rounded">
                                  {(themeImages[
                                    `/src/assets/images/themes/${theme}.png`
                                  ] || themeImages[
                                    `/src/assets/images/themes/${theme}.svg`
                                  ]) && (
                                    <img
                                      className="w-full h-full object-cover"
                                      src={
                                        (themeImages[
                                          `/src/assets/images/themes/${theme}.png`
                                        ] || themeImages[
                                          `/src/assets/images/themes/${theme}.svg`
                                        ]).default
                                      }
                                      alt={`${theme} theme`}
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="mt-2 text-center text-sm font-medium">
                                {themeConfigs[theme]?.displayName || theme}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Tab.Panel>

                    {/* Custom Colors Tab */}
                    <Tab.Panel className="p-6 space-y-6">
                      {/* Create New Custom Theme */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-base font-medium">Criar Tema Personalizado</h3>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setShowCustomForm(!showCustomForm)}
                          >
                            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
                            {showCustomForm ? "Cancelar" : "Novo Tema"}
                          </Button>
                        </div>

                        {showCustomForm && (
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-4">
                            <div>
                              <FormLabel htmlFor="theme-name">Nome do Tema</FormLabel>
                              <FormInput
                                id="theme-name"
                                type="text"
                                value={customThemeName}
                                onChange={(e) => setCustomThemeName(e.target.value)}
                                placeholder="Ex: Meu Tema Azul"
                                className="mt-1"
                              />
                            </div>

                            <ColorPicker
                              label="Cor Primária"
                              value={primaryColor}
                              onChange={setPrimaryColor}
                              placeholder="#3b82f6"
                            />

                            <ColorPicker
                              label="Cor Secundária"
                              value={secondaryColor}
                              onChange={setSecondaryColor}
                              placeholder="#1e40af"
                            />

                            <div className="flex space-x-3">
                              <Button
                                variant="primary"
                                onClick={createCustomTheme}
                                disabled={!customThemeName.trim() || !isValidHex(primaryColor) || !isValidHex(secondaryColor)}
                                className="flex-1"
                              >
                                Criar Tema
                              </Button>
                              <Button
                                variant="outline-secondary"
                                onClick={() => setShowCustomForm(false)}
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
                          <h3 className="text-base font-medium mb-4">Temas Salvos</h3>
                          <div className="space-y-3">
                            {customThemes.map((customTheme) => (
                              <div
                                key={customTheme.id}
                                className={clsx([
                                  "border rounded-lg p-4 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800",
                                  activeCustomTheme?.id === customTheme.id
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-slate-200 dark:border-slate-700"
                                ])}
                                onClick={() => applyCustomTheme(customTheme)}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">{customTheme.name}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                      Criado em {new Date(customTheme.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <div className="flex space-x-1">
                                      <div
                                        className="w-6 h-6 rounded border border-white shadow-sm"
                                        style={{ backgroundColor: customTheme.colors.primary }}
                                        title={`Primária: ${customTheme.colors.primary}`}
                                      />
                                      <div
                                        className="w-6 h-6 rounded border border-white shadow-sm"
                                        style={{ backgroundColor: customTheme.colors.secondary }}
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
                                    >
                                      <Lucide icon="Trash2" className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Tab.Panel>

                    {/* Settings Tab */}
                    <Tab.Panel className="p-6 space-y-6">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Templates</div>
                <div className="text-slate-500 mt-0.5">
                  Choose your templates
                </div>
                <div className="grid grid-cols-2 mt-5 gap-y-3.5 gap-x-5">
                  {themes.map((theme, themeKey) => (
                    <div key={themeKey}>
                      <div
                        onClick={() => switchTheme(theme)}
                        className={clsx([
                          "h-28 cursor-pointer bg-slate-50 box p-1",
                          activeTheme.name == theme &&
                            "border-2 border-theme-1/60",
                        ])}
                      >
                        <div className="w-full h-full overflow-hidden rounded-md">
                          {(themeImages[
                            `/src/assets/images/themes/${theme}.png`
                          ] || themeImages[
                            `/src/assets/images/themes/${theme}.svg`
                          ]) && (
                            <img
                              className="w-full h-full"
                              src={
                                (themeImages[
                                  `/src/assets/images/themes/${theme}.png`
                                ] || themeImages[
                                  `/src/assets/images/themes/${theme}.svg`
                                ]).default
                              }
                            />
                          )}
                        </div>
                      </div>
                      <div className="mt-2.5 text-center text-xs">
                        {themeConfigs[theme]?.displayName || theme}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-dashed"></div>
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Layouts</div>
                <div className="text-slate-500 mt-0.5">Choose your layout</div>
                <div className="mt-5 grid grid-cols-3 gap-x-5 gap-y-3.5">
                  {layouts.map((layout, layoutKey) => (
                    <div key={layoutKey}>
                      <div
                        onClick={() => switchLayout(layout)}
                        className={clsx([
                          "h-24 cursor-pointer bg-slate-50 box p-1",
                          activeTheme.layout == layout &&
                            "border-2 border-theme-1/60",
                        ])}
                      >
                        <div className="w-full h-full overflow-hidden rounded-md">
                          {(layoutImages[
                            `/src/assets/images/layouts/${layout}.png`
                          ] || layoutImages[
                            `/src/assets/images/layouts/${layout}.svg`
                          ]) && (
                            <img
                              className="w-full h-full"
                              src={
                                (layoutImages[
                                  `/src/assets/images/layouts/${layout}.png`
                                ] || layoutImages[
                                  `/src/assets/images/layouts/${layout}.svg`
                                ]).default
                              }
                            />
                          )}
                        </div>
                      </div>
                      <div className="mt-2.5 text-center text-xs">
                        {layout.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-dashed"></div>
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Color Schemes</div>
                <div className="text-slate-500 mt-0.5">
                  Choose your color schemes
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3.5 mt-5">
                  {colorSchemes.map((colorScheme, colorKey) => (
                    <div key={colorKey}>
                      <div
                        onClick={() => switchColorScheme(colorScheme)}
                        className={clsx([
                          "h-12 cursor-pointer bg-slate-50 box rounded-full p-1 border-slate-300/80",
                          activeColorScheme == colorScheme &&
                            "border-2 border-theme-1/60",
                        ])}
                      >
                        <div className="h-full overflow-hidden rounded-full">
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
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-dashed"></div>
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Appearance</div>
                <div className="mt-0.5 text-slate-500">
                  Choose your appearance
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3.5">
                  <div>
                    <a
                      onClick={() => switchDarkMode(false)}
                      className={clsx([
                        "h-12 cursor-pointer bg-slate-50 box p-1 border-slate-300/80 block",
                        "[&.active]:border-2 [&.active]:border-theme-1/60",
                        !activeDarkMode ? "active" : "",
                      ])}
                    >
                      <div className="h-full overflow-hidden rounded-md bg-slate-200"></div>
                    </a>
                    <div className="mt-2.5 text-center text-xs capitalize">
                      Light
                    </div>
                  </div>
                  <div>
                    <a
                      onClick={() => switchDarkMode(true)}
                      className={clsx([
                        "h-12 cursor-pointer bg-slate-50 box p-1 border-slate-300/80 block",
                        "[&.active]:border-2 [&.active]:border-theme-1/60",
                        activeDarkMode ? "active" : "",
                      ])}
                    >
                      <div className="h-full overflow-hidden rounded-md bg-slate-900"></div>
                    </a>
                    <div className="mt-2.5 text-center text-xs capitalize">
                      Dark
                    </div>
                  </div>
                </div>
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
        className="fixed bottom-0 right-0 z-50 flex items-center justify-center mb-5 mr-5 text-white rounded-full shadow-lg cursor-pointer w-14 h-14 bg-theme-1"
      >
        <Lucide className="w-5 h-5 animate-spin" icon="Settings" />
      </div>
    </div>
  );
}

export default Main;