import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { nestedMenu, FormattedMenu, linkTo, enter, leave } from "./side-menu";
import Lucide from "@/components/Base/Lucide";
import logoUrl from "@/assets/images/logo.svg";
import clsx from "clsx";

interface MenuProps {
  className?: string;
}

function Menu({ className }: MenuProps) {
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | "divider">
  >([]);

  const toggleSubMenu = (menu: FormattedMenu) => {
    const newFormattedMenu = [...formattedMenu];
    const menuIndex = newFormattedMenu.findIndex(
      (item) => typeof item !== "string" && item.pageName === menu.pageName,
    );

    if (menuIndex !== -1 && typeof newFormattedMenu[menuIndex] !== "string") {
      (newFormattedMenu[menuIndex] as FormattedMenu).activeDropdown = !(
        newFormattedMenu[menuIndex] as FormattedMenu
      ).activeDropdown;
      setFormattedMenu(newFormattedMenu);
    }
  };

  useEffect(() => {
    setFormattedMenu(nestedMenu($("div"), location));
  }, [location.pathname]);

  return (
    <nav className={clsx(["py-2 side-nav", className])}>
      {/* BEGIN: Brand */}
      <Link to="/" className="intro-x flex items-center pl-5 pt-4">
        <img
          alt="Midone - ReactJS Admin Dashboard Starter Kit"
          className="w-6"
          src={logoUrl}
        />
        <span className="hidden xl:block text-white text-lg ml-3">
          {" "}
          Enigma{" "}
        </span>
      </Link>
      {/* END: Brand */}

      <div className="divider my-6"></div>

      {/* BEGIN: Navigation */}
      <ul>
        {formattedMenu.map((menu, menuKey) =>
          typeof menu == "string" ? (
            <li className="nav-divider my-6" key={menuKey}>
              <div className="divider"></div>
            </li>
          ) : (
            <li key={menuKey}>
              <MenuLink
                className={clsx({
                  "nav-link": true,
                  "nav-link--active": menu.active,
                  "nav-link--open": menu.activeDropdown,
                })}
                menu={menu}
                level="first"
                toggleSubMenu={(menu: FormattedMenu) => {
                  toggleSubMenu(menu);
                }}
              />
              {/* BEGIN: Second Child */}
              {menu.subMenu && (
                <Transition
                  show={menu.activeDropdown}
                  enter="transition-all ease-linear duration-150"
                  enterFrom="mt-0 max-h-0 overflow-hidden"
                  enterTo="mt-1 max-h-screen overflow-hidden"
                  leave="transition-all ease-linear duration-150"
                  leaveFrom="mt-1 max-h-screen overflow-hidden"
                  leaveTo="mt-0 max-h-0 overflow-hidden"
                >
                  <ul className="nav-submenu">
                    {menu.subMenu.map((subMenu, subMenuKey) => (
                      <li key={subMenuKey}>
                        <MenuLink
                          className={clsx({
                            "nav-link": true,
                            "nav-link--active": subMenu.active,
                            "nav-link--open": subMenu.activeDropdown,
                          })}
                          menu={subMenu}
                          level="second"
                          toggleSubMenu={(subMenu: FormattedMenu) => {
                            toggleSubMenu(subMenu);
                          }}
                        />
                        {/* BEGIN: Third Child */}
                        {subMenu.subMenu && (
                          <Transition
                            show={subMenu.activeDropdown}
                            enter="transition-all ease-linear duration-150"
                            enterFrom="mt-0 max-h-0 overflow-hidden"
                            enterTo="mt-1 max-h-screen overflow-hidden"
                            leave="transition-all ease-linear duration-150"
                            leaveFrom="mt-1 max-h-screen overflow-hidden"
                            leaveTo="mt-0 max-h-0 overflow-hidden"
                          >
                            <ul className="nav-submenu">
                              {subMenu.subMenu.map(
                                (lastSubMenu, lastSubMenuKey) => (
                                  <li key={lastSubMenuKey}>
                                    <MenuLink
                                      className={clsx({
                                        "nav-link": true,
                                        "nav-link--active": lastSubMenu.active,
                                        "nav-link--open":
                                          lastSubMenu.activeDropdown,
                                      })}
                                      menu={lastSubMenu}
                                      level="third"
                                      toggleSubMenu={(
                                        lastSubMenu: FormattedMenu,
                                      ) => {
                                        toggleSubMenu(lastSubMenu);
                                      }}
                                    />
                                  </li>
                                ),
                              )}
                            </ul>
                          </Transition>
                        )}
                        {/* END: Third Child */}
                      </li>
                    ))}
                  </ul>
                </Transition>
              )}
              {/* END: Second Child */}
            </li>
          ),
        )}
      </ul>
      {/* END: Navigation */}
    </nav>
  );
}

interface MenuLinkProps {
  className?: string;
  menu: FormattedMenu;
  level: "first" | "second" | "third";
  toggleSubMenu: (menu: FormattedMenu) => void;
}

function MenuLink({ className, menu, level, toggleSubMenu }: MenuLinkProps) {
  const Component = menu.subMenu ? "a" : Link;

  return (
    <Component
      {...(menu.subMenu
        ? {
            href: "#",
            onClick: (event: React.MouseEvent) => {
              event.preventDefault();
              toggleSubMenu(menu);
            },
          }
        : {
            to: menu.pathname,
          })}
      className={clsx([
        "h-[50px] flex items-center text-white/70 pl-5 text-left",
        {
          "text-white/70": !menu.active,
          "text-white font-medium": menu.active,
          "bg-white/10": menu.active,
          "hover:bg-white/5": !menu.active,
          "rounded-full mx-3": level === "first",
          "rounded-full ml-8 mr-3": level === "second",
          "rounded-full ml-11 mr-3": level === "third",
        },
        className,
      ])}
    >
      <div className="w-4 h-4 mr-3">
        <Lucide icon={menu.icon} />
      </div>
      <div className="flex-1 mr-3">{menu.title}</div>
      {menu.subMenu && (
        <div
          className={clsx([
            "transition ease-in duration-100 ml-auto mr-5 text-white/70",
            { "rotate-180": menu.activeDropdown },
          ])}
        >
          <Lucide icon="ChevronDown" className="w-4 h-4" />
        </div>
      )}
      {menu.active && level === "first" && (
        <div className="absolute right-5 w-2 h-2 bg-white rounded-full"></div>
      )}
    </Component>
  );
}

export default Menu;
