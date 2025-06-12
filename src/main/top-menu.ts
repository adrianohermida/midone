import { type Menu } from "@/stores/menuSlice";
import { topMenuConfig } from "./unified-menu";

const menu: Array<Menu | "divider"> = topMenuConfig;

export default menu;
