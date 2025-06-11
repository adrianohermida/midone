const lucide = require("lucide-react");
const icons = Object.keys(lucide.icons);
const problematicIcons = [
  "Type",
  "Heart",
  "Layers",
  "Trash2",
  "RotateCcw",
  "Sparkles",
  "Droplet",
  "Shuffle",
];

console.log("Checking icons...");
problematicIcons.forEach((icon) => {
  if (icons.includes(icon)) {
    console.log("✓", icon, "exists");
  } else {
    console.log("✗", icon, "NOT FOUND");
    // Find similar icons
    const similar = icons.filter(
      (i) =>
        i.toLowerCase().includes(icon.toLowerCase()) ||
        icon.toLowerCase().includes(i.toLowerCase()),
    );
    if (similar.length > 0) {
      console.log("  Similar:", similar.slice(0, 5));
    }
  }
});

console.log("\nAvailable icons sample:", icons.slice(0, 30));
