import {
  X,
  Info,
  Palette,
  Layout,
  Check,
  Plus,
  Save,
  Star,
  Edit,
  Trash,
  Undo,
  RefreshCw,
  Circle,
  Settings,
  Monitor,
  Sun,
  Moon,
  RotateCcw,
  Bell,
  User,
  Search,
  Menu,
  Home,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Calendar,
  Users,
  FileText,
  Activity,
  Upload,
  Trash2,
  Brush,
  PieChart,
  ArrowRight,
  ChevronUp,
  MapPin,
  CheckSquare,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

// Map safe icons
export const icons = {
  X,
  Info,
  Palette,
  Layout,
  Check,
  Plus,
  Save,
  Star,
  Edit,
  Trash,
  Undo,
  RefreshCw,
  Circle,
  Settings,
  Monitor,
  Sun,
  Moon,
  RotateCcw,
  Bell,
  User,
  Search,
  Menu,
  Home,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Calendar,
  Users,
  FileText,
  Activity,
  Upload,
  Trash2,
  Brush,
  PieChart,
  ArrowRight,
  ChevronUp,
  MapPin,
  CheckSquare,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
};

interface LucideProps extends React.ComponentPropsWithoutRef<"svg"> {
  icon: keyof typeof icons;
  title?: string;
}

function Lucide(props: LucideProps) {
  const { icon, className, ...computedProps } = props;
  const Component = icons[props.icon];

  // Handle missing icons gracefully
  if (!Component) {
    console.warn(`Lucide icon "${props.icon}" not found in safe icons list`);
    // Return a fallback icon (Circle)
    return (
      <Circle
        {...computedProps}
        className={twMerge(["stroke-1.5 w-5 h-5", props.className])}
      />
    );
  }

  return (
    <Component
      {...computedProps}
      className={twMerge(["stroke-1.5 w-5 h-5", props.className])}
    />
  );
}

export default Lucide;
