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
  isApplied: boolean;
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
    isApplied: false,
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
        const truncatedName =
          file.name.length > 25
            ? file.name.substring(0, 22) + "..." + file.name.split(".").pop()
            : file.name;

        setLogoUpload({
          file,
          preview: e.target?.result as string,
          name: truncatedName,
          isApplied: false,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const applyLogo = () => {
    if (logoUpload.file) {
      // Simular aplicação da logo (sem banco de dados)
      setLogoUpload((prev) => ({ ...prev, isApplied: true }));

      // Criar placeholder se não conseguir carregar
      const placeholderUrl = "/src/assets/images/lawdesk-logo.svg";

      // Aqui aplicaria a logo no sistema
      const logoElements = document.querySelectorAll(".lawdesk-logo");
      logoElements.forEach((el: any) => {
        if (logoUpload.preview) {
          el.src = logoUpload.preview;
        } else {
          el.src = placeholderUrl;
        }
      });
    }
  };

  const clearLogo = () => {
    setLogoUpload({
      file: null,
      preview: "",
      name: "",
      isApplied: false,
    });

    // Restaurar logo padrão
    const logoElements = document.querySelectorAll(".lawdesk-logo");
    logoElements.forEach((el: any) => {
      el.src = "/src/assets/images/lawdesk-logo.svg";
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

  // Corrigir caminhos das imagens
  const getThemeImagePath = (theme: string) => {
    try {
      return new URL(`/src/assets/images/themes/${theme}.png`, import.meta.url)
        .href;
    } catch {
      return `/src/assets/images/themes/${theme}.png`;
    }
  };

  const getLayoutImagePath = (layout: string) => {
    try {
      return new URL(
        `/src/assets/images/layouts/${layout}.png`,
        import.meta.url,
      ).href;
    } catch {
      return `/src/assets/images/layouts/${layout}.png`;
    }
  };

  return (
    <div>
      {/* Modal seguindo design original do Midone */}
      <Dialog open={themeSwitcherOpen} onClose={handleClose}>
        <Dialog.Panel className="w-[90%] ml-auto h-screen flex flex-col bg-white relative shadow-md transition-[margin-right] duration-[0.6s] dark:bg-darkmode-600 sm:w-[460px]">
          <a
            className="absolute inset-y-0 left-0 right-auto my-auto -ml-[60px] flex h-8 w-8 items-center justify-center rounded-full border border-white/90 bg-white/5 text-white/90 transition-all hover:rotate-180 hover:scale-105 hover:bg-white/10 focus:outline-none sm:-ml-[105px] sm:h-14 sm:w-14"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            <Lucide icon="X" className="h-3 w-3 stroke-[1] sm:h-8 sm:w-8" />
          </a>

          <Dialog.Description className="overflow-y-auto flex-1 p-0">
            <div className="flex flex-col">
              {/* Logo Upload Section */}
              <div className="px-8 pb-8 pt-6">
                <div className="text-base font-medium">Logo do Escritório</div>
                <div className="mt-0.5 text-slate-500">
                  Personalize sua identidade visual
                </div>
                <div className="mt-5">
                  <div className="grid grid-cols-1 gap-3">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="h-20 cursor-pointer bg-slate-50 box p-3 border border-slate-300/80 hover:border-theme-1/60 transition-colors flex items-center justify-center rounded-md"
                    >
                      {logoUpload.preview ? (
                        <div className="flex items-center space-x-3 w-full">
                          <img
                            src={logoUpload.preview}
                            alt="Logo preview"
                            className="w-10 h-10 object-contain"
                          />
                          <div className="flex-1 text-left">
                            <div
                              className="text-sm font-medium text-slate-700 truncate"
                              title={logoUpload.name}
                            >
                              {logoUpload.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {logoUpload.isApplied
                                ? "Aplicada"
                                : "Clique para alterar"}
                            </div>
                          </div>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearLogo();
                            }}
                            className="p-1"
                          >
                            <Lucide icon="X" className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Lucide
                            icon="Upload"
                            className="w-6 h-6 text-slate-400 mx-auto mb-2"
                          />
                          <div className="text-sm font-medium text-slate-700">
                            Fazer upload da logo
                          </div>
                          <div className="text-xs text-slate-500">
                            PNG, JPG, JPEG, SVG • Máx. 2MB
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Botão Aplicar Logo */}
                    {logoUpload.file && !logoUpload.isApplied && (
                      <Button
                        variant="primary"
                        onClick={applyLogo}
                        className="w-full"
                      >
                        <Lucide icon="Check" className="w-4 h-4 mr-2" />
                        Aplicar Logo
                      </Button>
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

              <div className="border-b border-dashed"></div>

              {/* Themes Section - seguindo design original */}
              <div className="px-8 pb-8 pt-6">
                <div className="text-base font-medium">Temas</div>
                <div className="mt-0.5 text-slate-500">Escolha seu tema</div>
                <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3.5">
                  {themes.map((theme, themeKey) => {
                    const themeConfig = getThemeConfig(theme);
                    const isActive =
                      !isUsingCustomTheme && activeTheme.name === theme;
                    return (
                      <div key={themeKey}>
                        <a
                          onClick={() => switchTheme(theme)}
                          className={clsx([
                            "h-28 cursor-pointer bg-slate-50 box p-1 block transition-all hover:border-theme-1/40",
                            isActive
                              ? "border-2 border-theme-1/60"
                              : "border border-slate-300/80",
                          ])}
                        >
                          <div className="image-fit h-full w-full overflow-hidden rounded-md">
                            <img
                              className="h-full w-full object-cover"
                              src={getThemeImagePath(theme)}
                              alt={`${theme} theme`}
                              onError={(e) => {
                                // Fallback para placeholder se imagem não carregar
                                e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                                  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150">
                                    <rect width="200" height="150" fill="#f1f5f9"/>
                                    <text x="100" y="75" text-anchor="middle" font-family="Arial" font-size="14" fill="#64748b">
                                      ${themeConfig?.displayName || theme}
                                    </text>
                                  </svg>
                                `)}`;
                              }}
                            />
                          </div>
                        </a>
                        <div className="mt-2.5 text-center text-xs capitalize text-slate-600 dark:text-slate-400">
                          {themeConfig?.displayName || theme}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-b border-dashed"></div>

              {/* Custom Colors Section */}
              <div className="px-8 pb-8 pt-6">
                <div className="text-base font-medium">
                  Cores Personalizadas
                </div>
                <div className="mt-0.5 text-slate-500">
                  Crie suas próprias combinações
                </div>

                <div className="mt-5">
                  <Button
                    variant={showCustomForm ? "outline-secondary" : "primary"}
                    size="sm"
                    onClick={() => {
                      if (showCustomForm) {
                        handleCancel();
                      } else {
                        setShowCustomForm(true);
                        if (isUsingCustomTheme && activeCustomTheme) {
                          setPrimaryColor(activeCustomTheme.colors.primary);
                          setSecondaryColor(activeCustomTheme.colors.secondary);
                          setPreviewPrimary(activeCustomTheme.colors.primary);
                          setPreviewSecondary(
                            activeCustomTheme.colors.secondary,
                          );
                        }
                      }
                    }}
                    className="w-full"
                  >
                    <Lucide
                      icon={showCustomForm ? "X" : "Plus"}
                      className="w-4 h-4 mr-2"
                    />
                    {showCustomForm ? "Cancelar" : "Criar Tema Personalizado"}
                  </Button>

                  {showCustomForm && (
                    <div className="mt-4 space-y-4">
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
                          onChange={(e) => setCustomThemeName(e.target.value)}
                          placeholder="Ex: Meu Tema Jurídico"
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
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
                          Salvar
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
                  )}
                </div>

                {/* Saved Custom Themes */}
                {customThemes.length > 0 && (
                  <div className="mt-6">
                    <div className="text-sm font-medium text-slate-700 mb-3">
                      Temas Salvos
                    </div>
                    <div className="space-y-2">
                      {customThemes.map((customTheme) => (
                        <div
                          key={customTheme.id}
                          className={clsx([
                            "flex items-center justify-between p-3 rounded-md border cursor-pointer transition-all group",
                            activeCustomTheme?.id === customTheme.id
                              ? "border-theme-1/60 bg-theme-1/5"
                              : "border-slate-200 hover:border-theme-1/40 hover:bg-slate-50",
                          ])}
                          onClick={() => applyCustomTheme(customTheme)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex space-x-1">
                              <div
                                className="w-4 h-4 rounded border border-white shadow-sm"
                                style={{
                                  backgroundColor: customTheme.colors.primary,
                                }}
                              />
                              <div
                                className="w-4 h-4 rounded border border-white shadow-sm"
                                style={{
                                  backgroundColor: customTheme.colors.secondary,
                                }}
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-800">
                                {customTheme.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {new Date(
                                  customTheme.createdAt,
                                ).toLocaleDateString("pt-BR")}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCustomTheme(customTheme.id);
                            }}
                            className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Lucide icon="Trash" className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-b border-dashed"></div>

              {/* Layouts Section - seguindo design original */}
              <div className="px-8 pb-8 pt-6">
                <div className="text-base font-medium">Layouts</div>
                <div className="mt-0.5 text-slate-500">Escolha seu layout</div>
                <div className="mt-5 grid grid-cols-3 gap-x-5 gap-y-3.5">
                  {layouts.map((layout, layoutKey) => {
                    const isActive = activeTheme.layout === layout;
                    return (
                      <div key={layoutKey}>
                        <a
                          onClick={() => switchLayout(layout)}
                          className={clsx([
                            "h-24 cursor-pointer bg-slate-50 box p-1 block transition-all hover:border-theme-1/40",
                            isActive
                              ? "border-2 border-theme-1/60"
                              : "border border-slate-300/80",
                          ])}
                        >
                          <div className="h-full w-full overflow-hidden rounded-md">
                            <img
                              className="h-full w-full object-cover"
                              src={getLayoutImagePath(layout)}
                              alt={`${layout} layout`}
                              onError={(e) => {
                                // Fallback para placeholder se imagem não carregar
                                e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                                  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120">
                                    <rect width="200" height="120" fill="#f1f5f9"/>
                                    <text x="100" y="60" text-anchor="middle" font-family="Arial" font-size="12" fill="#64748b">
                                      ${layout.replace("-", " ")}
                                    </text>
                                  </svg>
                                `)}`;
                              }}
                            />
                          </div>
                        </a>
                        <div className="mt-2.5 text-center text-xs capitalize text-slate-600 dark:text-slate-400">
                          {layout.replace("-", " ")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-b border-dashed"></div>

              {/* Esquemas de Cor Section - cores originais dos templates + paleta ativa */}
              <div className="px-8 pb-8 pt-6">
                <div className="text-base font-medium">Esquemas de Cor</div>
                <div className="mt-0.5 text-slate-500">
                  Escolha sua paleta de cores
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3.5">
                  {colorSchemes.map((colorScheme, colorKey) => {
                    const isActive = activeColorScheme === colorScheme;
                    return (
                      <div key={colorKey}>
                        <a
                          onClick={() => switchColorScheme(colorScheme)}
                          className={clsx([
                            "h-14 cursor-pointer bg-slate-50 box p-1 block transition-all hover:border-theme-1/40",
                            isActive
                              ? "border-2 border-theme-1/60"
                              : "border border-slate-300/80",
                          ])}
                        >
                          <div className="h-full overflow-hidden rounded-md">
                            <div className="-mx-2 flex h-full items-center gap-1">
                              <div
                                className={clsx([
                                  "w-1/2 h-[200%] bg-theme-1 rotate-12",
                                  colorScheme,
                                ])}
                              ></div>
                              <div
                                className={clsx([
                                  "w-1/2 h-[200%] bg-theme-2 rotate-12",
                                  colorScheme,
                                ])}
                              ></div>
                            </div>
                          </div>
                        </a>
                        <div className="mt-2.5 text-center text-xs capitalize text-slate-600 dark:text-slate-400">
                          {colorScheme === "default"
                            ? "Padrão"
                            : colorScheme.replace("-", " ")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-b border-dashed"></div>

              {/* Appearance Section - seguindo design original */}
              <div className="px-8 pb-8 pt-6">
                <div className="text-base font-medium">Aparência</div>
                <div className="mt-0.5 text-slate-500">
                  Escolha sua aparência
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3.5">
                  <div>
                    <a
                      onClick={() => switchDarkMode(false)}
                      className={clsx([
                        "h-12 cursor-pointer bg-slate-50 box p-1 block transition-all hover:border-theme-1/40",
                        !activeDarkMode
                          ? "border-2 border-theme-1/60"
                          : "border border-slate-300/80",
                      ])}
                    >
                      <div className="h-full overflow-hidden rounded-md bg-slate-200"></div>
                    </a>
                    <div className="mt-2.5 text-center text-xs capitalize text-slate-600 dark:text-slate-400">
                      Claro
                    </div>
                  </div>
                  <div>
                    <a
                      onClick={() => switchDarkMode(true)}
                      className={clsx([
                        "h-12 cursor-pointer bg-slate-50 box p-1 block transition-all hover:border-theme-1/40",
                        activeDarkMode
                          ? "border-2 border-theme-1/60"
                          : "border border-slate-300/80",
                      ])}
                    >
                      <div className="h-full overflow-hidden rounded-md bg-slate-900"></div>
                    </a>
                    <div className="mt-2.5 text-center text-xs capitalize text-slate-600 dark:text-slate-400">
                      Escuro
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>

      {/* Floating Action Button - seguindo design original */}
      <div
        className="fixed bottom-0 right-0 z-50 mb-5 mr-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-theme-1 text-white shadow-lg theme-switcher-btn"
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          setThemeSwitcherOpen(true);
        }}
      >
        <Lucide icon="Settings" className="stroke-1.5 w-5 h-5 animate-spin" />
      </div>
    </div>
  );
}

export default Main;
