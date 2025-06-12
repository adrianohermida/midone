import React from "react";
import { createLucideIcon } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { twMerge } from "tailwind-merge";

export interface LucideProps extends React.SVGAttributes<SVGElement> {
  icon: keyof typeof icons | string | any; // Allow any type to handle edge cases
  title?: string;
}

const icons = {
  "360": dynamicIconImports["360"],
  Activity: dynamicIconImports.activity,
  Airplay: dynamicIconImports.airplay,
  AlertCircle: dynamicIconImports["alert-circle"],
  AlertOctagon: dynamicIconImports["alert-octagon"],
  AlertTriangle: dynamicIconImports["alert-triangle"],
  AlignCenter: dynamicIconImports["align-center"],
  AlignJustify: dynamicIconImports["align-justify"],
  AlignLeft: dynamicIconImports["align-left"],
  AlignRight: dynamicIconImports["align-right"],
  Archive: dynamicIconImports.archive,
  ArrowDown: dynamicIconImports["arrow-down"],
  ArrowDownCircle: dynamicIconImports["arrow-down-circle"],
  ArrowLeft: dynamicIconImports["arrow-left"],
  ArrowLeftCircle: dynamicIconImports["arrow-left-circle"],
  ArrowRight: dynamicIconImports["arrow-right"],
  ArrowRightCircle: dynamicIconImports["arrow-right-circle"],
  ArrowUp: dynamicIconImports["arrow-up"],
  ArrowUpCircle: dynamicIconImports["arrow-up-circle"],
  BarChart: dynamicIconImports["bar-chart"],
  BarChart2: dynamicIconImports["bar-chart-2"],
  BarChart3: dynamicIconImports["bar-chart-3"],
  Battery: dynamicIconImports.battery,
  BatteryCharging: dynamicIconImports["battery-charging"],
  Bell: dynamicIconImports.bell,
  BellOff: dynamicIconImports["bell-off"],
  Bluetooth: dynamicIconImports.bluetooth,
  Bold: dynamicIconImports.bold,
  Book: dynamicIconImports.book,
  BookOpen: dynamicIconImports["book-open"],
  Bookmark: dynamicIconImports.bookmark,
  Box: dynamicIconImports.box,
  Briefcase: dynamicIconImports.briefcase,
  Building: dynamicIconImports.building,
  Building2: dynamicIconImports["building-2"],
  Calendar: dynamicIconImports.calendar,
  Camera: dynamicIconImports.camera,
  CameraOff: dynamicIconImports["camera-off"],
  Car: dynamicIconImports.car,
  Cast: dynamicIconImports.cast,
  Check: dynamicIconImports.check,
  CheckCircle: dynamicIconImports["check-circle"],
  CheckCircle2: dynamicIconImports["check-circle-2"],
  CheckSquare: dynamicIconImports["check-square"],
  ChevronDown: dynamicIconImports["chevron-down"],
  ChevronLeft: dynamicIconImports["chevron-left"],
  ChevronRight: dynamicIconImports["chevron-right"],
  ChevronUp: dynamicIconImports["chevron-up"],
  ChevronsDown: dynamicIconImports["chevrons-down"],
  ChevronsLeft: dynamicIconImports["chevrons-left"],
  ChevronsRight: dynamicIconImports["chevrons-right"],
  ChevronsUp: dynamicIconImports["chevrons-up"],
  Chrome: dynamicIconImports.chrome,
  Circle: dynamicIconImports.circle,
  Clipboard: dynamicIconImports.clipboard,
  Clock: dynamicIconImports.clock,
  Cloud: dynamicIconImports.cloud,
  CloudDrizzle: dynamicIconImports["cloud-drizzle"],
  CloudLightning: dynamicIconImports["cloud-lightning"],
  CloudOff: dynamicIconImports["cloud-off"],
  CloudRain: dynamicIconImports["cloud-rain"],
  CloudSnow: dynamicIconImports["cloud-snow"],
  Code: dynamicIconImports.code,
  Code2: dynamicIconImports["code-2"],
  Coffee: dynamicIconImports.coffee,
  Cog: dynamicIconImports.cog,
  Columns: dynamicIconImports.columns,
  Command: dynamicIconImports.command,
  Compass: dynamicIconImports.compass,
  Copy: dynamicIconImports.copy,
  CornerDownLeft: dynamicIconImports["corner-down-left"],
  CornerDownRight: dynamicIconImports["corner-down-right"],
  CornerLeftDown: dynamicIconImports["corner-left-down"],
  CornerLeftUp: dynamicIconImports["corner-left-up"],
  CornerRightDown: dynamicIconImports["corner-right-down"],
  CornerRightUp: dynamicIconImports["corner-right-up"],
  CornerUpLeft: dynamicIconImports["corner-up-left"],
  CornerUpRight: dynamicIconImports["corner-up-right"],
  Cpu: dynamicIconImports.cpu,
  CreditCard: dynamicIconImports["credit-card"],
  Crop: dynamicIconImports.crop,
  Crosshair: dynamicIconImports.crosshair,
  Database: dynamicIconImports.database,
  Delete: dynamicIconImports.trash,
  Disc: dynamicIconImports.disc,
  DollarSign: dynamicIconImports["dollar-sign"],
  Download: dynamicIconImports.download,
  DownloadCloud: dynamicIconImports["download-cloud"],
  Dribbble: dynamicIconImports.dribbble,
  Droplet: dynamicIconImports.droplet,
  Edit: dynamicIconImports["pen-tool"],
  Edit2: dynamicIconImports["edit-2"] || dynamicIconImports["edit"],
  Edit3: dynamicIconImports["edit-3"] || dynamicIconImports["edit"],
  ExternalLink: dynamicIconImports["external-link"],
  Eye: dynamicIconImports.eye,
  EyeOff: dynamicIconImports["eye-off"],
  Facebook: dynamicIconImports.facebook,
  FastForward: dynamicIconImports["fast-forward"],
  Feather: dynamicIconImports.feather,
  File: dynamicIconImports.file,
  FileMinus: dynamicIconImports["file-minus"],
  FilePenLine: dynamicIconImports["file-pen-line"],
  FilePlus: dynamicIconImports["file-plus"],
  FileText: dynamicIconImports["file-text"],
  Film: dynamicIconImports.film,
  Filter: dynamicIconImports.filter,
  Flag: dynamicIconImports.flag,
  Folder: dynamicIconImports.folder,
  FolderMinus: dynamicIconImports["folder-minus"],
  FolderPlus: dynamicIconImports["folder-plus"],
  Framer: dynamicIconImports.framer,
  Frown: dynamicIconImports.frown,
  Gift: dynamicIconImports.gift,
  GitBranch: dynamicIconImports["git-branch"],
  GitCommit:
    dynamicIconImports["git-commit"] || dynamicIconImports["git-branch"],
  GitMerge: dynamicIconImports["git-merge"],
  GitPullRequest: dynamicIconImports["git-pull-request"],
  Github: dynamicIconImports.github,
  Gitlab: dynamicIconImports.gitlab,
  Globe: dynamicIconImports.globe,
  Grid: dynamicIconImports.grid,
  HardDrive: dynamicIconImports["hard-drive"],
  Hash: dynamicIconImports.hash,
  Headphones: dynamicIconImports.headphones,
  Heart: dynamicIconImports.heart,
  HelpCircle: dynamicIconImports["help-circle"],
  Home: dynamicIconImports.home,
  Image: dynamicIconImports.image,
  Inbox: dynamicIconImports.inbox,
  Info: dynamicIconImports.info,
  Instagram: dynamicIconImports.instagram,
  Italic: dynamicIconImports.italic,
  Key: dynamicIconImports.key,
  Layers: dynamicIconImports.layers,
  Layout: dynamicIconImports.layout,
  LifeBuoy: dynamicIconImports["life-buoy"],
  Link: dynamicIconImports.link,
  Link2: dynamicIconImports["link-2"],
  Linkedin: dynamicIconImports.linkedin,
  List: dynamicIconImports.list,
  Loader: dynamicIconImports.loader,
  Lock: dynamicIconImports.lock,
  LogIn: dynamicIconImports["log-in"],
  LogOut: dynamicIconImports["log-out"],
  Mail: dynamicIconImports.mail,
  Map: dynamicIconImports.map,
  MapPin: dynamicIconImports["map-pin"],
  Maximize: dynamicIconImports.maximize,
  Maximize2: dynamicIconImports["maximize-2"],
  Meh: dynamicIconImports.meh,
  Menu: dynamicIconImports.menu,
  MessageCircle: dynamicIconImports["message-circle"],
  MessageSquare: dynamicIconImports["message-square"],
  Mic: dynamicIconImports.mic,
  MicOff: dynamicIconImports["mic-off"],
  Minimize: dynamicIconImports.minimize,
  Minimize2: dynamicIconImports["minimize-2"],
  Minus: dynamicIconImports.minus,
  MinusCircle: dynamicIconImports["minus-circle"],
  MinusSquare: dynamicIconImports["minus-square"],
  Monitor: dynamicIconImports.monitor,
  Moon: dynamicIconImports.moon,
  MoreHorizontal: dynamicIconImports["more-horizontal"],
  MoreVertical: dynamicIconImports["more-vertical"],
  Move: dynamicIconImports.move,
  Music: dynamicIconImports.music,
  Navigation: dynamicIconImports.navigation,
  Navigation2: dynamicIconImports["navigation-2"],
  Octagon: dynamicIconImports.octagon,
  Package: dynamicIconImports.package,
  Paperclip: dynamicIconImports.paperclip,
  Pause: dynamicIconImports.pause,
  PauseCircle: dynamicIconImports["pause-circle"],
  PenTool: dynamicIconImports["pen-tool"],
  Percent: dynamicIconImports.percent,
  Phone: dynamicIconImports.phone,
  PhoneCall: dynamicIconImports["phone-call"],
  PhoneForwarded: dynamicIconImports["phone-forwarded"],
  PhoneIncoming: dynamicIconImports["phone-incoming"],
  PhoneMissed: dynamicIconImports["phone-missed"],
  PhoneOff: dynamicIconImports["phone-off"],
  PhoneOutgoing: dynamicIconImports["phone-outgoing"],
  PieChart: dynamicIconImports["pie-chart"],
  Play: dynamicIconImports.play,
  PlayCircle: dynamicIconImports["play-circle"],
  Plus: dynamicIconImports.plus,
  PlusCircle: dynamicIconImports["plus-circle"],
  PlusSquare: dynamicIconImports["plus-square"],
  Pocket: dynamicIconImports.pocket,
  Power: dynamicIconImports.power,
  Printer: dynamicIconImports.printer,
  Radio: dynamicIconImports.radio,
  RefreshCcw: dynamicIconImports["refresh-ccw"],
  RefreshCw: dynamicIconImports["refresh-cw"],
  Repeat: dynamicIconImports.repeat,
  Rewind: dynamicIconImports.rewind,
  RotateCcw: dynamicIconImports["rotate-ccw"],
  RotateCw: dynamicIconImports["rotate-cw"],
  Rss: dynamicIconImports.rss,
  Save: dynamicIconImports.save,
  Scissors: dynamicIconImports.scissors,
  Search: dynamicIconImports.search,
  Send: dynamicIconImports.send,
  Server: dynamicIconImports.server,
  Settings: dynamicIconImports.settings,
  Share: dynamicIconImports.share,
  Share2: dynamicIconImports["share-2"],
  Shield: dynamicIconImports.shield,
  ShieldOff: dynamicIconImports["shield-off"],
  ShoppingBag: dynamicIconImports["shopping-bag"],
  ShoppingCart: dynamicIconImports["shopping-cart"],
  Shuffle: dynamicIconImports.shuffle,
  Sidebar:
    dynamicIconImports["sidebar-open"] ||
    dynamicIconImports["sidebar"] ||
    dynamicIconImports["panel-left"],
  SkipBack: dynamicIconImports["skip-back"],
  SkipForward: dynamicIconImports["skip-forward"],
  Slack: dynamicIconImports.slack,
  Slash: dynamicIconImports.slash,
  Sliders: dynamicIconImports.sliders,
  Smartphone: dynamicIconImports.smartphone,
  Smile: dynamicIconImports.smile,
  Speaker: dynamicIconImports.speaker,
  Square: dynamicIconImports.square,
  Star: dynamicIconImports.star,
  StopCircle: dynamicIconImports["stop-circle"],
  Sun: dynamicIconImports.sun,
  Sunrise: dynamicIconImports.sunrise,
  Sunset: dynamicIconImports.sunset,
  Tablet: dynamicIconImports.tablet,
  Tag: dynamicIconImports.tag,
  Target: dynamicIconImports.target,
  Terminal: dynamicIconImports.terminal,
  Thermometer: dynamicIconImports.thermometer,
  ThumbsDown: dynamicIconImports["thumbs-down"],
  ThumbsUp: dynamicIconImports["thumbs-up"],
  ToggleLeft: dynamicIconImports["toggle-left"],
  ToggleRight: dynamicIconImports["toggle-right"],
  Tool: dynamicIconImports.tool,
  Trash: dynamicIconImports.trash,
  Trash2: dynamicIconImports["trash-2"],
  Triangle: dynamicIconImports.triangle,
  Truck: dynamicIconImports.truck,
  Tv: dynamicIconImports.tv,
  Twitch: dynamicIconImports.twitch,
  Twitter: dynamicIconImports.twitter,
  Type: dynamicIconImports.type,
  Umbrella: dynamicIconImports.umbrella,
  Underline: dynamicIconImports.underline,
  Unlock: dynamicIconImports.unlock,
  Upload: dynamicIconImports.upload,
  UploadCloud: dynamicIconImports["upload-cloud"],
  User: dynamicIconImports.user,
  UserCheck: dynamicIconImports["user-check"],
  UserMinus: dynamicIconImports["user-minus"],
  UserPlus: dynamicIconImports["user-plus"],
  UserX: dynamicIconImports["user-x"],
  Users: dynamicIconImports.users,
  Video: dynamicIconImports.video,
  VideoOff: dynamicIconImports["video-off"],
  Voicemail: dynamicIconImports.voicemail,
  Volume: dynamicIconImports.volume,
  Volume1: dynamicIconImports["volume-1"],
  Volume2: dynamicIconImports["volume-2"],
  VolumeX: dynamicIconImports["volume-x"],
  Watch: dynamicIconImports.watch,
  Wifi: dynamicIconImports.wifi,
  WifiOff: dynamicIconImports["wifi-off"],
  Wind: dynamicIconImports.wind,
  X: dynamicIconImports.x,
  XCircle: dynamicIconImports["x-circle"],
  XSquare: dynamicIconImports["x-square"],
  Youtube: dynamicIconImports.youtube,
  Zap: dynamicIconImports.zap,
  ZapOff: dynamicIconImports["zap-off"],
  ZoomIn: dynamicIconImports["zoom-in"],
  ZoomOut: dynamicIconImports["zoom-out"],
};

const FallbackIcon: React.FC<LucideProps> = ({ className, ...props }) => (
  <svg
    {...props}
    className={twMerge(["stroke-1.5 w-5 h-5", className])}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const Lucide: React.FC<LucideProps> = ({ icon, className, ...props }) => {
  // Get icon value, supporting both string and direct icon references
  const iconValue = typeof icon === "string" ? icon : icon?.toString?.() || "";

  // Remove ref and other non-SVG props
  const { ref, ...computedProps } = props as any;

  // Check if icon is valid
  if (!iconValue || typeof iconValue !== "string" || iconValue.trim() === "") {
    console.warn(`Invalid icon prop passed to Lucide component:`, {
      icon: iconValue,
      type: typeof iconValue,
    });
    return <FallbackIcon className={className} {...computedProps} />;
  }

  // Check if icon exists in our icons object
  const safeIconKey = iconValue as keyof typeof icons;
  if (!icons[safeIconKey]) {
    console.warn(
      `Icon "${iconValue}" not found in icons object. Using fallback.`,
    );
    return <FallbackIcon className={className} {...computedProps} />;
  }

  try {
    // Create component using the dynamic import directly
    const IconComponent = React.lazy(icons[safeIconKey]);

    return (
      <React.Suspense
        fallback={<FallbackIcon className={className} {...computedProps} />}
      >
        <IconComponent
          {...computedProps}
          className={twMerge(["stroke-1.5 w-5 h-5", className])}
        />
      </React.Suspense>
    );
  } catch (error) {
    console.warn("Error loading Lucide icon:", error);
    return <FallbackIcon className={className} {...computedProps} />;
  }
};

export default Lucide;
