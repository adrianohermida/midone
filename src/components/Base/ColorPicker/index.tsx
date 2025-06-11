import { useState, useEffect } from "react";
import { FormInput, FormLabel } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import {
  isValidHex,
  normalizeHex,
  getContrastRatio,
  generateColorPalette,
} from "@/utils/colorUtils";
import clsx from "clsx";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  placeholder?: string;
  className?: string;
}

interface ColorSuggestion {
  name: string;
  colors: string[];
}

const colorSuggestions: ColorSuggestion[] = [
  {
    name: "Azul Profissional",
    colors: ["#3b82f6", "#1e40af", "#1d4ed8", "#2563eb", "#0ea5e9"],
  },
  {
    name: "Verde Crescimento",
    colors: ["#10b981", "#059669", "#047857", "#065f46", "#22c55e"],
  },
  {
    name: "Roxo Elegante",
    colors: ["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#a855f7"],
  },
  {
    name: "Laranja Energético",
    colors: ["#f97316", "#ea580c", "#dc2626", "#ef4444", "#fb923c"],
  },
  {
    name: "Rosa Criativo",
    colors: ["#ec4899", "#db2777", "#be185d", "#f43f5e", "#e11d48"],
  },
  {
    name: "Ciano Fresco",
    colors: ["#06b6d4", "#0891b2", "#0e7490", "#164e63", "#22d3ee"],
  },
];

function ColorPicker({
  label,
  value,
  onChange,
  placeholder = "#000000",
  className,
}: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isValid, setIsValid] = useState(true);
  const [showPalette, setShowPalette] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(
    null,
  );

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);

    if (newValue === "" || isValidHex(newValue)) {
      setIsValid(true);
      if (newValue !== "" && isValidHex(newValue)) {
        onChange(normalizeHex(newValue));
      }
    } else {
      setIsValid(false);
    }
  };

  const handleColorSelect = (color: string) => {
    const normalizedColor = normalizeHex(color);
    setInputValue(normalizedColor);
    setIsValid(true);
    onChange(normalizedColor);
    setShowPalette(false);
  };

  const generateRandomColor = () => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    handleColorSelect(randomColor);
  };

  const normalizedValue = isValidHex(inputValue)
    ? normalizeHex(inputValue)
    : "#000000";
  const palette = generateColorPalette(normalizedValue);
  const contrastRatio = getContrastRatio(normalizedValue, "#ffffff");

  return (
    <div className={clsx("space-y-3", className)}>
      <FormLabel htmlFor="color-input">{label}</FormLabel>

      <div className="flex items-center space-x-3">
        {/* Color Preview */}
        <div
          className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer flex items-center justify-center shadow-sm"
          style={{ backgroundColor: normalizedValue }}
          onClick={() => setShowPalette(!showPalette)}
        >
          {contrastRatio > 4.5 ? (
            <Lucide icon="Palette" className="w-5 h-5 text-white" />
          ) : (
            <Lucide icon="Palette" className="w-5 h-5 text-black" />
          )}
        </div>

        {/* Color Input */}
        <FormInput
          id="color-input"
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className={clsx(
            "flex-1 font-mono",
            !isValid && "border-red-500 focus:border-red-500",
          )}
        />

        {/* Random Color Button */}
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={generateRandomColor}
          className="px-3"
        >
          <Lucide icon="Shuffle" className="w-4 h-4" />
        </Button>
      </div>

      {/* Validation Message */}
      {!isValid && (
        <p className="text-red-500 text-sm">
          Por favor, insira uma cor hexadecimal válida (ex: #3b82f6)
        </p>
      )}

      {/* Color Information */}
      {isValid && inputValue !== "" && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Contraste com branco: {contrastRatio.toFixed(2)}:1
          {contrastRatio >= 4.5 ? (
            <span className="text-green-600 ml-2">✓ Acessível</span>
          ) : (
            <span className="text-orange-600 ml-2">⚠ Baixo contraste</span>
          )}
        </div>
      )}

      {/* Color Palette Dropdown */}
      {showPalette && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
          {/* Generated Palette */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Paleta Gerada</h4>
            <div className="grid grid-cols-10 gap-1">
              {Object.entries(palette).map(([shade, color]) => (
                <button
                  key={shade}
                  className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  title={`${shade}: ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Color Suggestions */}
          <div>
            <h4 className="text-sm font-medium mb-2">Sugestões de Cores</h4>
            <div className="space-y-2">
              {colorSuggestions.map((suggestion, index) => (
                <div key={index}>
                  <button
                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-1"
                    onClick={() =>
                      setSelectedSuggestion(
                        selectedSuggestion === index ? null : index,
                      )
                    }
                  >
                    {suggestion.name}{" "}
                    {selectedSuggestion === index ? "▼" : "▶"}
                  </button>

                  {selectedSuggestion === index && (
                    <div className="grid grid-cols-5 gap-1 mb-2">
                      {suggestion.colors.map((color, colorIndex) => (
                        <button
                          key={colorIndex}
                          className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelect(color)}
                          title={color}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setShowPalette(false)}
              className="w-full"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
