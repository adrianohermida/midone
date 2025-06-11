import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  selectColorScheme,
  setColorScheme,
  ColorSchemes,
} from "@/stores/colorSchemeSlice";
import { selectTheme, setTheme, setLayout, Themes } from "@/stores/themeSlice";
import { selectDarkMode, setDarkMode } from "@/stores/darkModeSlice";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Lucide from "@/components/Base/Lucide";
import RubickImage from "@/assets/images/themes/rubick.svg";
import IcewallImage from "@/assets/images/themes/icewall.svg";
import TinkerImage from "@/assets/images/themes/tinker.svg";
import EnigmaImage from "@/assets/images/themes/enigma.svg";
import SideMenuImage from "@/assets/images/layouts/side-menu.svg";
import SimpleMenuImage from "@/assets/images/layouts/simple-menu.svg";
import TopMenuImage from "@/assets/images/layouts/top-menu.svg";

function Main() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeTheme = useAppSelector(selectTheme);
  const activeColorScheme = useAppSelector(selectColorScheme);
  const activeDarkMode = useAppSelector(selectDarkMode);

  const switchTheme = (theme: Themes["name"]) => {
    dispatch(setTheme(theme));
    // Reload to apply theme changes
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const switchLayout = (layout: Themes["layout"]) => {
    dispatch(setLayout(layout));
    setTimeout(() => {
      window.location.reload();
    }, 100);
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
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsAnimating(true);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const themes: Array<{
    name: Themes["name"];
    displayName: string;
    image: string;
  }> = [
    { name: "rubick", displayName: "Rubick", image: RubickImage },
    { name: "icewall", displayName: "Icewall", image: IcewallImage },
    { name: "tinker", displayName: "Tinker", image: TinkerImage },
    { name: "enigma", displayName: "Enigma", image: EnigmaImage },
  ];

  const layouts: Array<{
    name: Themes["layout"];
    displayName: string;
    image: string;
  }> = [
    { name: "side-menu", displayName: "Side Menu", image: SideMenuImage },
    { name: "simple-menu", displayName: "Simple Menu", image: SimpleMenuImage },
    { name: "top-menu", displayName: "Top Menu", image: TopMenuImage },
  ];

  const colorSchemes: Array<{
    name: ColorSchemes;
    displayName: string;
    colors: string[];
  }> = [
    {
      name: "default",
      displayName: "Default",
      colors: ["#059669", "#10b981"],
    },
    {
      name: "theme-1",
      displayName: "Blue",
      colors: ["#3b82f6", "#60a5fa"],
    },
    {
      name: "theme-2",
      displayName: "Green",
      colors: ["#059669", "#34d399"],
    },
    {
      name: "theme-3",
      displayName: "Orange",
      colors: ["#ea580c", "#fb923c"],
    },
    {
      name: "theme-4",
      displayName: "Purple",
      colors: ["#7c3aed", "#a78bfa"],
    },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div
        className="fixed bottom-0 right-0 z-50 mb-5 mr-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-theme-1 text-white shadow-lg hover:bg-theme-1/90 transition-all duration-200"
        onClick={handleOpen}
      >
        <Lucide icon="Settings" className="w-5 h-5 animate-spin" />
      </div>

      {/* Theme Switcher Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl dark:bg-darkmode-600 overflow-y-auto transform transition-transform duration-300 ease-out">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Templates
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Choose your templates
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-darkmode-400 transition-colors"
              >
                <Lucide icon="X" className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-8">
              {/* Templates */}
              <div>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => switchTheme(theme.name)}
                      className={clsx([
                        "relative p-2 border rounded-lg hover:border-theme-1/40 transition-all duration-200 group hover:shadow-md",
                        activeTheme.name === theme.name
                          ? "border-theme-1 shadow-md"
                          : "border-slate-200/80 dark:border-darkmode-400",
                      ])}
                    >
                      <div className="aspect-video bg-slate-100 dark:bg-darkmode-400 rounded overflow-hidden mb-2">
                        <img
                          src={theme.image}
                          alt={theme.displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center">
                        {theme.displayName}
                      </div>
                      {activeTheme.name === theme.name && (
                        <div className="absolute top-1 right-1">
                          <div className="w-4 h-4 bg-theme-1 rounded-full flex items-center justify-center">
                            <Lucide
                              icon="Check"
                              className="w-2.5 h-2.5 text-white"
                            />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layouts */}
              <div>
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Layouts
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Choose your layout
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {layouts.map((layout) => (
                    <button
                      key={layout.name}
                      onClick={() => switchLayout(layout.name)}
                      className={clsx([
                        "relative p-2 border rounded-lg hover:border-theme-1/40 transition-all duration-200 hover:shadow-md",
                        activeTheme.layout === layout.name
                          ? "border-theme-1 shadow-md"
                          : "border-slate-200/80 dark:border-darkmode-400",
                      ])}
                    >
                      <div className="aspect-square bg-slate-100 dark:bg-darkmode-400 rounded overflow-hidden mb-2">
                        <img
                          src={layout.image}
                          alt={layout.displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[10px] font-medium text-slate-700 dark:text-slate-300 text-center leading-tight">
                        {layout.displayName}
                      </div>
                      {activeTheme.layout === layout.name && (
                        <div className="absolute top-1 right-1">
                          <div className="w-3 h-3 bg-theme-1 rounded-full flex items-center justify-center">
                            <Lucide
                              icon="Check"
                              className="w-2 h-2 text-white"
                            />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Schemes */}
              <div>
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Color Schemes
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Choose your color schemes
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {colorSchemes.map((colorScheme) => (
                    <button
                      key={colorScheme.name}
                      onClick={() => switchColorScheme(colorScheme.name)}
                      className={clsx([
                        "relative aspect-square border rounded-lg hover:border-theme-1/40 transition-all duration-200 hover:scale-105 p-1",
                        activeColorScheme === colorScheme.name
                          ? "border-theme-1 shadow-md scale-105"
                          : "border-slate-200/80 dark:border-darkmode-400",
                      ])}
                    >
                      <div className="w-full h-full rounded-md flex overflow-hidden shadow-sm">
                        <div
                          className="w-1/2 h-full"
                          style={{ backgroundColor: colorScheme.colors[0] }}
                        />
                        <div
                          className="w-1/2 h-full"
                          style={{ backgroundColor: colorScheme.colors[1] }}
                        />
                      </div>
                      {activeColorScheme === colorScheme.name && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-4 h-4 bg-white dark:bg-darkmode-600 rounded-full flex items-center justify-center shadow-lg border border-theme-1">
                            <div className="w-2 h-2 bg-theme-1 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appearance */}
              <div>
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Appearance
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Choose your appearance
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => switchDarkMode(false)}
                    className={clsx([
                      "relative p-3 border rounded-lg hover:border-theme-1/40 transition-all duration-200 group hover:shadow-md",
                      !activeDarkMode
                        ? "border-theme-1 shadow-md"
                        : "border-slate-200/80 dark:border-darkmode-400",
                    ])}
                  >
                    <div className="aspect-video bg-slate-100 rounded mb-2 flex items-center justify-center">
                      <Lucide icon="Sun" className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center">
                      Light
                    </div>
                    {!activeDarkMode && (
                      <div className="absolute top-2 right-2">
                        <div className="w-4 h-4 bg-theme-1 rounded-full flex items-center justify-center">
                          <Lucide
                            icon="Check"
                            className="w-2.5 h-2.5 text-white"
                          />
                        </div>
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => switchDarkMode(true)}
                    className={clsx([
                      "relative p-3 border rounded-lg hover:border-theme-1/40 transition-all duration-200 group hover:shadow-md",
                      activeDarkMode
                        ? "border-theme-1 shadow-md"
                        : "border-slate-200/80 dark:border-darkmode-400",
                    ])}
                  >
                    <div className="aspect-video bg-slate-800 rounded mb-2 flex items-center justify-center">
                      <Lucide icon="Moon" className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center">
                      Dark
                    </div>
                    {activeDarkMode && (
                      <div className="absolute top-2 right-2">
                        <div className="w-4 h-4 bg-theme-1 rounded-full flex items-center justify-center">
                          <Lucide
                            icon="Check"
                            className="w-2.5 h-2.5 text-white"
                          />
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;
