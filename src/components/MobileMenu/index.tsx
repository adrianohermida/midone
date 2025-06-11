import "@/assets/css/vendors/simplebar.css";
import "@/assets/css/components/mobile-menu.css";
import { Transition } from "react-transition-group";
import { useState, useEffect, createRef, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toRaw } from "@/utils/helper";
import { selectMenu } from "@/stores/menuSlice";
import { selectTheme } from "@/stores/themeSlice";
import { useAppSelector } from "@/stores/hooks";
import { FormattedMenu, linkTo, nestedMenu, enter, leave } from "./mobile-menu";
import Lucide from "@/components/Base/Lucide";
import justiceScaleUrl from "@/assets/images/justice-scale.svg";
import clsx from "clsx";
import SimpleBar from "simplebar";

// Component for third-level menu items with ref handling
function ThirdLevelMenu({
  subMenu,
  formattedMenu,
  setFormattedMenu,
  navigate,
  setActiveMobileMenu,
}: {
  subMenu: FormattedMenu;
  formattedMenu: Array<FormattedMenu | "divider">;
  setFormattedMenu: React.Dispatch<
    React.SetStateAction<Array<FormattedMenu | "divider">>
  >;
  navigate: any;
  setActiveMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const thirdLevelRef = useRef<HTMLUListElement>(null);

  if (!subMenu.subMenu) return null;

  return (
    <Transition
      nodeRef={thirdLevelRef}
      in={subMenu.activeDropdown}
      onEnter={enter}
      onExit={leave}
      timeout={300}
    >
      <ul
        ref={thirdLevelRef}
        className={clsx({
          "menu__sub-open": subMenu.activeDropdown,
        })}
      >
        {subMenu.subMenu.map((lastSubMenu, lastSubMenuKey) => (
          <li key={lastSubMenuKey}>
            <a
              href={lastSubMenu.subMenu ? "#" : lastSubMenu.pathname}
              className={clsx([
                lastSubMenu.active ? "menu menu--active" : "menu",
              ])}
              onClick={(event) => {
                event.preventDefault();
                linkTo(lastSubMenu, navigate, setActiveMobileMenu);
                setFormattedMenu([...formattedMenu]);
              }}
            >
              <div className="menu__icon">
                <Lucide icon={lastSubMenu.icon || "Zap"} />
              </div>
              <div className="menu__title">{lastSubMenu.title}</div>
            </a>
          </li>
        ))}
      </ul>
    </Transition>
  );
}

// Component for second-level menu items with ref handling
function SecondLevelMenu({
  menu,
  formattedMenu,
  setFormattedMenu,
  navigate,
  setActiveMobileMenu,
}: {
  menu: FormattedMenu;
  formattedMenu: Array<FormattedMenu | "divider">;
  setFormattedMenu: React.Dispatch<
    React.SetStateAction<Array<FormattedMenu | "divider">>
  >;
  navigate: any;
  setActiveMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const secondLevelRef = useRef<HTMLUListElement>(null);

  if (!menu.subMenu) return null;

  return (
    <Transition
      nodeRef={secondLevelRef}
      in={menu.activeDropdown}
      onEnter={enter}
      onExit={leave}
      timeout={300}
    >
      <ul
        ref={secondLevelRef}
        className={clsx({
          "menu__sub-open": menu.activeDropdown,
        })}
      >
        {menu.subMenu.map((subMenu, subMenuKey) => (
          <li key={subMenuKey}>
            <a
              href={subMenu.subMenu ? "#" : subMenu.pathname}
              className={clsx([subMenu.active ? "menu menu--active" : "menu"])}
              onClick={(event) => {
                event.preventDefault();
                linkTo(subMenu, navigate, setActiveMobileMenu);
                setFormattedMenu([...formattedMenu]);
              }}
            >
              <div className="menu__icon">
                <Lucide icon={subMenu.icon} />
              </div>
              <div className="menu__title">
                {subMenu.title}
                {subMenu.subMenu && (
                  <div
                    className={clsx([
                      "menu__sub-icon",
                      subMenu.activeDropdown && "transform rotate-180",
                    ])}
                  >
                    <Lucide icon="ChevronDown" />
                  </div>
                )}
              </div>
            </a>
            {/* BEGIN: Third Child */}
            {subMenu.subMenu && (
              <ThirdLevelMenu
                subMenu={subMenu}
                formattedMenu={formattedMenu}
                setFormattedMenu={setFormattedMenu}
                navigate={navigate}
                setActiveMobileMenu={setActiveMobileMenu}
              />
            )}
            {/* END: Third Child */}
          </li>
        ))}
      </ul>
    </Transition>
  );
}

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | "divider">
  >([]);
  const themeStore = useAppSelector(selectTheme);
  const menuStore = useAppSelector(selectMenu(themeStore.layout));
  const menu = () => nestedMenu(toRaw(menuStore), location);
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const scrollableRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (scrollableRef.current) {
      new SimpleBar(scrollableRef.current);
    }
    setFormattedMenu(menu());
  }, [menuStore, location.pathname]);

  return (
    <>
      {/* BEGIN: Mobile Menu */}
      <div
        className={clsx([
          "mobile-menu group top-0 inset-x-0 fixed bg-theme-1/90 z-[60] border-b border-white/[0.08] dark:bg-darkmode-800/90 md:hidden",
          "before:content-[''] before:w-full before:h-screen before:z-10 before:fixed before:inset-x-0 before:bg-black/90 before:transition-opacity before:duration-200 before:ease-in-out",
          "before:invisible before:opacity-0",
          "[&.mobile-menu--active]:before:visible [&.mobile-menu--active]:before:opacity-100",
          activeMobileMenu && "mobile-menu--active",
        ])}
      >
        <div className="h-[70px] px-3 sm:px-8 flex items-center">
          <a href="" className="flex mr-auto items-center">
            <img
              alt="Lawdesk Legal Management System"
              className="w-6 h-6 justice-scale-icon justice-scale-white mr-3"
              src={justiceScaleUrl}
            />
            <span className="text-lg font-semibold text-white">Lawdesk</span>
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <Lucide
              icon="BarChart2"
              className="w-8 h-8 text-white transform -rotate-90"
              onClick={() => {
                setActiveMobileMenu(!activeMobileMenu);
              }}
            />
          </a>
        </div>
        <div
          ref={scrollableRef}
          className={clsx([
            "h-screen z-20 top-0 left-0 w-[270px] -ml-[100%] bg-primary transition-all duration-300 ease-in-out dark:bg-darkmode-800",
            "[&[data-simplebar]]:fixed [&_.simplebar-scrollbar]:before:bg-black/50",
            "group-[.mobile-menu--active]:ml-0",
          ])}
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className={clsx([
              "fixed top-0 right-0 mt-4 mr-4 transition-opacity duration-200 ease-in-out",
              "invisible opacity-0",
              "group-[.mobile-menu--active]:visible group-[.mobile-menu--active]:opacity-100",
            ])}
          >
            <Lucide
              icon="XCircle"
              className="w-8 h-8 text-white transform -rotate-90"
              onClick={() => {
                setActiveMobileMenu(!activeMobileMenu);
              }}
            />
          </a>
          <div className="flex items-center px-5 pt-6 pb-4 border-b border-white/10">
            <img
              alt="Lawdesk Legal Management System"
              className="w-8 h-8 justice-scale-icon justice-scale-white mr-3"
              src={justiceScaleUrl}
            />
            <span className="text-xl font-bold text-white">Lawdesk</span>
          </div>
          <ul className="py-2">
            {/* BEGIN: First Child */}
            {formattedMenu.map((menu, menuKey) =>
              menu == "divider" ? (
                <li className="my-6 menu__divider" key={menuKey}></li>
              ) : (
                <li key={menuKey}>
                  <a
                    href={menu.subMenu ? "#" : menu.pathname}
                    className={clsx([
                      menu.active ? "menu menu--active" : "menu",
                    ])}
                    onClick={(event) => {
                      event.preventDefault();
                      linkTo(menu, navigate, setActiveMobileMenu);
                      setFormattedMenu([...formattedMenu]);
                    }}
                  >
                    <div className="menu__icon">
                      <Lucide icon={menu.icon} />
                    </div>
                    <div className="menu__title">
                      {menu.title}
                      {menu.subMenu && (
                        <div
                          className={clsx([
                            "menu__sub-icon",
                            menu.activeDropdown && "transform rotate-180",
                          ])}
                        >
                          <Lucide icon="ChevronDown" />
                        </div>
                      )}
                    </div>
                  </a>
                  {/* BEGIN: Second Child */}
                  {menu.subMenu && (
                    <SecondLevelMenu
                      menu={menu}
                      formattedMenu={formattedMenu}
                      setFormattedMenu={setFormattedMenu}
                      navigate={navigate}
                      setActiveMobileMenu={setActiveMobileMenu}
                    />
                  )}
                  {/* END: Second Child */}
                </li>
              ),
            )}
            {/* END: First Child */}
          </ul>
        </div>
      </div>
      {/* END: Mobile Menu */}
    </>
  );
}

export default Main;
