import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  selectColorScheme,
  setColorScheme,
  ColorSchemes,
} from "@/stores/colorSchemeSlice";
import { selectTheme, setTheme, setLayout, Themes } from "@/stores/themeSlice";
import { selectDarkMode, setDarkMode } from "@/stores/darkModeSlice";
import { useState } from "react";
import clsx from "clsx";
import Lucide from "@/components/Base/Lucide";

function Main() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

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

  const themes: Array<{ name: Themes["name"]; displayName: string }> = [
    { name: "rubick", displayName: "Rubick" },
    { name: "icewall", displayName: "Icewall" },
    { name: "tinker", displayName: "Tinker" },
    { name: "enigma", displayName: "Enigma" },
  ];

  const layouts: Array<{ name: Themes["layout"]; displayName: string }> = [
    { name: "side-menu", displayName: "Side Menu" },
    { name: "simple-menu", displayName: "Simple Menu" },
    { name: "top-menu", displayName: "Top Menu" },
  ];

  const colorSchemes: Array<{ name: ColorSchemes; displayName: string }> = [
    { name: "default", displayName: "Default" },
    { name: "theme-1", displayName: "Blue" },
    { name: "theme-2", displayName: "Green" },
    { name: "theme-3", displayName: "Orange" },
    { name: "theme-4", displayName: "Purple" },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div
        className="fixed bottom-0 right-0 z-50 mb-5 mr-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-theme-1 text-white shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Lucide icon="Settings" className="w-5 h-5 animate-spin" />
      </div>

      {/* Theme Switcher Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl dark:bg-darkmode-600 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-darkmode-400">
              <h2 className="text-lg font-medium">Template Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-darkmode-400"
              >
                <Lucide icon="X" className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Themes */}
              <div>
                <h3 className="text-base font-medium mb-3">Theme</h3>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => switchTheme(theme.name)}
                      className={clsx([
                        "p-3 border rounded-lg text-center hover:border-theme-1/60 transition-colors",
                        activeTheme.name === theme.name
                          ? "border-theme-1/60 bg-theme-1/5"
                          : "border-slate-200 dark:border-darkmode-400",
                      ])}
                    >
                      <div className="text-sm font-medium">
                        {theme.displayName}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout */}
              <div>
                <h3 className="text-base font-medium mb-3">Layout</h3>
                <div className="space-y-2">
                  {layouts.map((layout) => (
                    <button
                      key={layout.name}
                      onClick={() => switchLayout(layout.name)}
                      className={clsx([
                        "w-full p-3 border rounded-lg text-left hover:border-theme-1/60 transition-colors",
                        activeTheme.layout === layout.name
                          ? "border-theme-1/60 bg-theme-1/5"
                          : "border-slate-200 dark:border-darkmode-400",
                      ])}
                    >
                      <div className="text-sm font-medium">
                        {layout.displayName}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Schemes */}
              <div>
                <h3 className="text-base font-medium mb-3">Color Scheme</h3>
                <div className="grid grid-cols-2 gap-3">
                  {colorSchemes.map((colorScheme) => (
                    <button
                      key={colorScheme.name}
                      onClick={() => switchColorScheme(colorScheme.name)}
                      className={clsx([
                        "p-3 border rounded-lg text-center hover:border-theme-1/60 transition-colors",
                        activeColorScheme === colorScheme.name
                          ? "border-theme-1/60 bg-theme-1/5"
                          : "border-slate-200 dark:border-darkmode-400",
                      ])}
                    >
                      <div
                        className={clsx([
                          "h-4 w-full rounded mb-2",
                          colorScheme.name,
                        ])}
                      >
                        <div className="h-full bg-theme-1 rounded"></div>
                      </div>
                      <div className="text-xs font-medium">
                        {colorScheme.displayName}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark Mode */}
              <div>
                <h3 className="text-base font-medium mb-3">Appearance</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => switchDarkMode(false)}
                    className={clsx([
                      "p-3 border rounded-lg text-center hover:border-theme-1/60 transition-colors",
                      !activeDarkMode
                        ? "border-theme-1/60 bg-theme-1/5"
                        : "border-slate-200 dark:border-darkmode-400",
                    ])}
                  >
                    <div className="h-8 w-full bg-slate-200 rounded mb-2"></div>
                    <div className="text-xs font-medium">Light</div>
                  </button>
                  <button
                    onClick={() => switchDarkMode(true)}
                    className={clsx([
                      "p-3 border rounded-lg text-center hover:border-theme-1/60 transition-colors",
                      activeDarkMode
                        ? "border-theme-1/60 bg-theme-1/5"
                        : "border-slate-200 dark:border-darkmode-400",
                    ])}
                  >
                    <div className="h-8 w-full bg-slate-800 rounded mb-2"></div>
                    <div className="text-xs font-medium">Dark</div>
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
