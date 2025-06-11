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
import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import {
  themeConfigs,
  applyThemeStyles,
  getThemeConfig,
} from "@/config/themes";
import { applyCustomThemeColors, isValidHex } from "@/utils/colorUtils";

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
  const [previewPrimary, setPreviewPrimary] = useState("#3b82f6");
  const [previewSecondary, setPreviewSecondary] = useState("#1e40af");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [logoUpload, setLogoUpload] = useState<LogoUpload>({
    file: null,
    preview: "",
    name: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    }
    setShowCustomForm(false);
  };

  const handleClose = () => {
    if (showCustomForm) {
      resetToOriginalTheme();
    }
    setThemeSwitcherOpen(false);
    setShowCustomForm(false);
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

  return (
    <div>
      <Slideover open={themeSwitcherOpen} onClose={handleClose}>
        <Slideover.Panel className="w-full max-w-6xl">
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
              <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
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
              </div>

              {/* Content with onepage design */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Current Status */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                    Status Atual do Sistema
                  </h4>
                  {isUsingCustomTheme && activeCustomTheme ? (
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div
                          className="w-4 h-4 rounded border-2 border-white shadow-sm"
                          style={{
                            backgroundColor: activeCustomTheme.colors.primary,
                          }}
                        />
                        <div
                          className="w-4 h-4 rounded border-2 border-white shadow-sm"
                          style={{
                            backgroundColor: activeCustomTheme.colors.secondary,
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {activeCustomTheme.name}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Tema Personalizado
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
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
                              themeConfigs[activeTheme.name]?.secondaryColor,
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {themeConfigs[activeTheme.name]?.displayName}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Template Oficial
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Identidade Visual */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Identidade Visual
                  </h3>

                  {/* Logo Upload */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-3">
                      Logo do Escritório
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-slate-300 dark:border-slate-500 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-pointer"
                        >
                          <Lucide
                            icon="Upload"
                            className="w-8 h-8 text-slate-400 mx-auto mb-3"
                          />
                          <h5 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2">
                            Fazer upload da logo
                          </h5>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                            PNG, JPG, JPEG, SVG • Máx. 2MB
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Recomendamos imagens quadradas com fundo
                            transparente
                          </p>
                        </div>

                        {logoUpload.preview && (
                          <div className="space-y-3">
                            <div className="bg-white dark:bg-slate-600 rounded-lg p-3 border border-slate-200 dark:border-slate-500">
                              <img
                                src={logoUpload.preview}
                                alt="Logo preview"
                                className="w-16 h-16 object-contain mx-auto"
                              />
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 text-center">
                              {logoUpload.name}
                            </div>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={clearLogo}
                              className="w-full"
                            >
                              <Lucide icon="Trash" className="w-3 h-3 mr-2" />
                              Remover
                            </Button>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Templates Predefinidos */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-3">
                      Templates Predefinidos
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {themes.map((theme, themeKey) => {
                        const themeConfig = getThemeConfig(theme);
                        return (
                          <div key={themeKey} className="space-y-2">
                            <div
                              onClick={() => switchTheme(theme)}
                              className={clsx([
                                "relative cursor-pointer bg-white dark:bg-slate-700 rounded-lg p-3 transition-all duration-300 hover:shadow-lg border-2 group",
                                !isUsingCustomTheme &&
                                activeTheme.name === theme
                                  ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                                  : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                              ])}
                            >
                              <div className="aspect-video bg-slate-100 dark:bg-slate-600 rounded overflow-hidden mb-2">
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
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                    {themeConfig?.displayName || theme}
                                  </div>
                                  <div className="flex space-x-1 mt-1">
                                    <div
                                      className="w-3 h-3 rounded border border-white shadow-sm"
                                      style={{
                                        backgroundColor:
                                          themeConfig?.primaryColor ||
                                          "#3b82f6",
                                      }}
                                    />
                                    <div
                                      className="w-3 h-3 rounded border border-white shadow-sm"
                                      style={{
                                        backgroundColor:
                                          themeConfig?.secondaryColor ||
                                          "#1e40af",
                                      }}
                                    />
                                  </div>
                                </div>
                                {!isUsingCustomTheme &&
                                  activeTheme.name === theme && (
                                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
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
                </div>

                {/* Cores Personalizadas */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Cores Personalizadas
                  </h3>

                  {/* Create Custom Theme */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-md font-medium text-slate-800 dark:text-slate-200">
                        Criar Tema Personalizado
                      </h4>
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
                              setPrimaryColor(activeCustomTheme.colors.primary);
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
                      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                        <div className="space-y-4">
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
                              placeholder="Ex: Meu Tema Jurídico"
                              className="mt-1"
                            />
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <ColorPicker
                              label="Cor Primária"
                              value={primaryColor}
                              onChange={handlePrimaryColorChange}
                              placeholder="#3b82f6"
                              showPalettes={true}
                            />

                            <ColorPicker
                              label="Cor Secundária"
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
                              className="flex-1"
                            >
                              <Lucide icon="Save" className="w-4 h-4 mr-2" />
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
                    <div className="mb-6">
                      <h4 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-3">
                        Temas Salvos ({customThemes.length})
                      </h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {customThemes.map((customTheme) => (
                          <div
                            key={customTheme.id}
                            className={clsx([
                              "relative border rounded-lg p-3 cursor-pointer transition-all duration-300 hover:shadow-lg group",
                              activeCustomTheme?.id === customTheme.id
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800"
                                : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-700",
                            ])}
                            onClick={() => applyCustomTheme(customTheme)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex space-x-1">
                                  <div
                                    className="w-4 h-4 rounded border-2 border-white shadow-md"
                                    style={{
                                      backgroundColor:
                                        customTheme.colors.primary,
                                    }}
                                  />
                                  <div
                                    className="w-4 h-4 rounded border-2 border-white shadow-md"
                                    style={{
                                      backgroundColor:
                                        customTheme.colors.secondary,
                                    }}
                                  />
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                    {customTheme.name}
                                  </h5>
                                  <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {new Date(
                                      customTheme.createdAt,
                                    ).toLocaleDateString("pt-BR")}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {activeCustomTheme?.id === customTheme.id && (
                                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
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
                                  <Lucide icon="Trash" className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Layout e Configurações */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Layout e Configurações
                  </h3>

                  {/* Layouts */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-3">
                      Layout do Sistema
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                      {layouts.map((layout, layoutKey) => (
                        <div key={layoutKey}>
                          <div
                            onClick={() => switchLayout(layout)}
                            className={clsx([
                              "relative cursor-pointer bg-white dark:bg-slate-700 rounded-lg p-3 transition-all duration-300 hover:shadow-lg border-2 group",
                              activeTheme.layout === layout
                                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                                : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                            ])}
                          >
                            <div className="text-center space-y-2">
                              <div className="aspect-video bg-slate-100 dark:bg-slate-600 rounded overflow-hidden">
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
                                <h5 className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                  {layout
                                    .split("-")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1),
                                    )
                                    .join(" ")}
                                </h5>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  {layout === "side-menu" &&
                                    "Menu lateral clássico"}
                                  {layout === "simple-menu" &&
                                    "Menu simplificado"}
                                  {layout === "top-menu" && "Menu no topo"}
                                </p>
                              </div>
                              {activeTheme.layout === layout && (
                                <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
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
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-3">
                      Esquemas de Cor
                    </h4>
                    <div className="grid grid-cols-5 gap-3">
                      {colorSchemes.map((colorScheme, colorKey) => (
                        <div key={colorKey}>
                          <div
                            onClick={() => switchColorScheme(colorScheme)}
                            className={clsx([
                              "relative h-12 cursor-pointer bg-white dark:bg-slate-700 rounded-lg p-1 border-2 transition-all duration-300 hover:shadow-lg",
                              activeColorScheme === colorScheme
                                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                                : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                            ])}
                          >
                            <div className="h-full overflow-hidden rounded">
                              <div className="flex items-center h-full gap-1">
                                <div
                                  className={clsx([
                                    "w-1/2 h-full bg-theme-1",
                                    colorScheme,
                                  ])}
                                ></div>
                                <div
                                  className={clsx([
                                    "w-1/2 h-full bg-theme-2",
                                    colorScheme,
                                  ])}
                                ></div>
                              </div>
                            </div>
                            {activeColorScheme === colorScheme && (
                              <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <Lucide
                                  icon="Check"
                                  className="w-2 h-2 text-white"
                                />
                              </div>
                            )}
                          </div>
                          <div className="mt-1 text-center text-xs font-medium text-slate-700 dark:text-slate-300">
                            {colorScheme === "default" ? "Padrão" : colorScheme}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Appearance */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-3">
                      Modo de Aparência
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <button
                          onClick={() => switchDarkMode(false)}
                          className={clsx([
                            "relative w-full h-16 cursor-pointer bg-white dark:bg-slate-700 rounded-lg p-3 border-2 transition-all duration-300 hover:shadow-lg",
                            !activeDarkMode
                              ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                              : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                          ])}
                        >
                          <div className="h-full overflow-hidden rounded bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <Lucide
                              icon="Sun"
                              className="w-6 h-6 text-yellow-500"
                            />
                          </div>
                          {!activeDarkMode && (
                            <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
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
                            "relative w-full h-16 cursor-pointer bg-white dark:bg-slate-700 rounded-lg p-3 border-2 transition-all duration-300 hover:shadow-lg",
                            activeDarkMode
                              ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                              : "border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600",
                          ])}
                        >
                          <div className="h-full overflow-hidden rounded bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                            <Lucide
                              icon="Moon"
                              className="w-6 h-6 text-blue-400"
                            />
                          </div>
                          {activeDarkMode && (
                            <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
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
                    <h4 className="text-md font-medium text-slate-800 dark:text-slate-200 mb-3">
                      Opções de Reset
                    </h4>
                    <div className="space-y-3">
                      {isUsingCustomTheme && (
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            dispatch(clearCustomTheme());
                            applyThemeStyles(activeTheme.name, activeDarkMode);
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
                </div>
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>

      {/* Floating Action Button */}
      <div
        data-theme-button
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
