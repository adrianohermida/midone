import { useState, useRef, useEffect } from "react";
import { FormInput, FormLabel } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import {
  isValidHex,
  generateColorPalettes,
  generateRandomPalettes,
  getAnalogousColors,
  getComplementaryColor,
  getTriadicColors,
  getMonochromaticColors,
  generateRandomColor,
  getContrastRatio,
  ColorPalette,
} from "@/utils/colorUtils";
import clsx from "clsx";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  placeholder?: string;
  showPalettes?: boolean;
}

function ColorPicker({
  value,
  onChange,
  label = "Cor",
  placeholder = "#000000",
  showPalettes = true,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "picker" | "palettes" | "generator"
  >("picker");
  const [customPalettes, setCustomPalettes] = useState<ColorPalette[]>(() =>
    generateRandomPalettes(6),
  );
  const colorInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const predefinedPalettes = generateColorPalettes(value || "#3b82f6");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleColorChange = (newColor: string) => {
    if (isValidHex(newColor)) {
      onChange(newColor);
    }
  };

  const generateNewPalettes = () => {
    const newPalettes = generateRandomPalettes();
    setCustomPalettes(newPalettes);
  };

  const generateFromCurrentColor = () => {
    if (!isValidHex(value)) return;

    const harmonies = [
      { name: "Análoga", colors: getAnalogousColors(value) },
      { name: "Complementar", colors: [value, getComplementaryColor(value)] },
      { name: "Tríade", colors: getTriadicColors(value) },
      { name: "Monocromática", colors: getMonochromaticColors(value) },
    ];

    setCustomPalettes(harmonies);
  };

  const getContrastInfo = (color: string) => {
    const whiteContrast = getContrastRatio(color, "#ffffff");
    const blackContrast = getContrastRatio(color, "#000000");
    const isGood = Math.max(whiteContrast, blackContrast) >= 4.5;

    return {
      ratio: Math.max(whiteContrast, blackContrast).toFixed(1),
      isGood,
      textColor: whiteContrast > blackContrast ? "#ffffff" : "#000000",
    };
  };

  const currentContrast = getContrastInfo(value);

  return (
    <div className="relative">
      <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </FormLabel>

      <div className="mt-1 relative" ref={dropdownRef}>
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <FormInput
              type="text"
              value={value}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder={placeholder}
              className={clsx([
                "pl-12 pr-4 text-sm",
                isValidHex(value)
                  ? "border-green-300 dark:border-green-600"
                  : "border-red-300 dark:border-red-600",
              ])}
            />
            <div
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded border-2 border-white shadow-sm cursor-pointer"
              style={{ backgroundColor: isValidHex(value) ? value : "#cccccc" }}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

          {showPalettes && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="px-3"
            >
              <Lucide icon="Palette" className="w-4 h-4" />
            </Button>
          )}

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => handleColorChange(generateRandomColor())}
            className="px-3"
          >
            <Lucide icon="RotateCw" className="w-4 h-4" />
          </Button>
        </div>

        {/* Contrast Info */}
        {isValidHex(value) && (
          <div className="mt-2 flex items-center space-x-2 text-xs">
            <div
              className="px-2 py-1 rounded text-white"
              style={{
                backgroundColor: value,
                color: currentContrast.textColor,
              }}
            >
              Texto
            </div>
            <span
              className={clsx([
                "font-medium",
                currentContrast.isGood
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400",
              ])}
            >
              Contraste: {currentContrast.ratio}:1
              {currentContrast.isGood ? " ✓" : " ⚠️"}
            </span>
          </div>
        )}

        {/* Color Picker Dropdown */}
        {isOpen && showPalettes && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 p-4 max-h-96 overflow-y-auto">
            {/* Tabs */}
            <div className="flex space-x-1 mb-4 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("picker")}
                className={clsx([
                  "flex-1 px-3 py-2 text-xs font-medium rounded transition-colors",
                  activeTab === "picker"
                    ? "bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                ])}
              >
                <Lucide icon="Circle" className="w-3 h-3 mr-1 inline" />
                Picker
              </button>
              <button
                onClick={() => setActiveTab("palettes")}
                className={clsx([
                  "flex-1 px-3 py-2 text-xs font-medium rounded transition-colors",
                  activeTab === "palettes"
                    ? "bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                ])}
              >
                <Lucide icon="Palette" className="w-3 h-3 mr-1 inline" />
                Paletas
              </button>
              <button
                onClick={() => setActiveTab("generator")}
                className={clsx([
                  "flex-1 px-3 py-2 text-xs font-medium rounded transition-colors",
                  activeTab === "generator"
                    ? "bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                ])}
              >
                <Lucide icon="Star" className="w-3 h-3 mr-1 inline" />
                Gerador
              </button>
            </div>

            {/* Color Picker Tab */}
            {activeTab === "picker" && (
              <div className="space-y-3">
                <input
                  ref={colorInputRef}
                  type="color"
                  value={isValidHex(value) ? value : "#3b82f6"}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full h-20 rounded border border-slate-200 dark:border-slate-600 cursor-pointer"
                />

                {/* Quick Colors */}
                <div>
                  <div className="text-xs font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Cores Rápidas
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {[
                      "#ef4444",
                      "#f97316",
                      "#f59e0b",
                      "#eab308",
                      "#84cc16",
                      "#22c55e",
                      "#10b981",
                      "#14b8a6",
                      "#06b6d4",
                      "#0ea5e9",
                      "#3b82f6",
                      "#6366f1",
                      "#8b5cf6",
                      "#a855f7",
                      "#d946ef",
                      "#ec4899",
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className="w-6 h-6 rounded border-2 border-white shadow-sm hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Palettes Tab */}
            {activeTab === "palettes" && (
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Paletas Predefinidas
                  </div>
                  <div className="space-y-2">
                    {predefinedPalettes.map((palette, index) => (
                      <div
                        key={index}
                        className="border border-slate-200 dark:border-slate-600 rounded p-2"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                            {palette.name}
                          </span>
                          <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                            {palette.colors.length} cores
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          {palette.colors.map((color, colorIndex) => (
                            <button
                              key={colorIndex}
                              onClick={() => handleColorChange(color)}
                              className="flex-1 h-8 rounded border border-white shadow-sm hover:scale-105 transition-transform"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Generator Tab */}
            {activeTab === "generator" && (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={generateNewPalettes}
                    className="flex-1 text-xs"
                  >
                    <Lucide icon="RefreshCw" className="w-3 h-3 mr-1" />
                    Gerar Novas
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={generateFromCurrentColor}
                    disabled={!isValidHex(value)}
                    className="flex-1 text-xs"
                  >
                    <Lucide icon="Palette" className="w-3 h-3 mr-1" />
                    Da Cor Atual
                  </Button>
                </div>

                {customPalettes.length > 0 && (
                  <div>
                    <div className="text-xs font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Paletas Geradas
                    </div>
                    <div className="space-y-2">
                      {customPalettes.map((palette, index) => (
                        <div
                          key={index}
                          className="border border-slate-200 dark:border-slate-600 rounded p-2"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                              {palette.name}
                            </span>
                            <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                              {palette.colors.length} cores
                            </span>
                          </div>
                          <div className="flex space-x-1">
                            {palette.colors.map((color, colorIndex) => (
                              <button
                                key={colorIndex}
                                onClick={() => handleColorChange(color)}
                                className="flex-1 h-8 rounded border border-white shadow-sm hover:scale-105 transition-transform"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ColorPicker;
