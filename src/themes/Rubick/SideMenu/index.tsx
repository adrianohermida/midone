import "@/assets/css/themes/rubick/side-nav.css";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectMenu } from "@/stores/menuSlice";
import { useAppSelector } from "@/stores/hooks";
import {
  FormattedMenu,
  linkTo,
  nestedMenu,
  enter,
  leave,
  forceActiveMenuContext,
  forceActiveMenu,
} from "./side-menu";
import SecondLevelMenuItems from "@/components/Base/SideMenuItems";
import Tippy from "@/components/Base/Tippy";
import Lucide from "@/components/Base/Lucide";
import lawdeskLogoUrl from "@/assets/images/lawdesk-logo.svg";
import clsx from "clsx";
import TopBar from "@/components/Themes/Rubick/TopBar";
import MobileMenu from "@/components/MobileMenu";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | "divider">
  >([]);
  const menuStore = useAppSelector(selectMenu("side-menu"));
  const menu = () => nestedMenu(menuStore, location);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setFormattedMenu(menu());

    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, [menuStore, location.pathname]);

  return (
    <forceActiveMenuContext.Provider
      value={{
        forceActiveMenu: (pathname) => {
          forceActiveMenu(location, pathname);
          setFormattedMenu(menu());
        },
      }}
    >
      <div
        className={clsx([
          "rubick px-5 sm:px-8 py-5",
          "before:content-[''] before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 dark:before:from-darkmode-800 dark:before:to-darkmode-800 before:fixed before:inset-0 before:z-[-1]",
        ])}
      >
        <MobileMenu />
        <div className="flex mt-[4.7rem] md:mt-0">
          <nav className="side-nav hidden w-[80px] overflow-x-hidden pb-16 pr-5 md:block xl:w-[230px]">
            <Link to="/" className="flex items-center pt-4 pl-5 intro-x">
              <img
                alt="Lawdesk Legal Management System"
                className="w-6 h-6 lawdesk-logo"
                src={lawdeskLogoUrl}
              />
              <span className="hidden ml-3 text-lg font-semibold text-white xl:block lawdesk-title">
                Lawdesk
              </span>
            </Link>
            <div className="my-6 side-nav__divider"></div>
            <ul>
              {formattedMenu.map((menu, menuKey) =>
                menu == "divider" ? (
                  <li className="my-6 side-nav__divider" key={menuKey}></li>
                ) : (
                  <li key={menuKey}>
                    <Tippy
                      as="a"
                      content={menu.title}
                      options={{
                        placement: "right",
                      }}
                      disable={windowWidth > 1260}
                      href={menu.subMenu ? "#" : menu.pathname}
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        linkTo(menu, navigate);
                        setFormattedMenu([...formattedMenu]);
                      }}
                      className={clsx([
                        menu.active
                          ? "side-menu side-menu--active"
                          : "side-menu",
                      ])}
                    >
                      <div className="side-menu__icon">
                        <Lucide icon={menu.icon} />
                      </div>
                      <div className="side-menu__title">
                        {menu.title}
                        {menu.subMenu && (
                          <div
                            className={clsx([
                              "side-menu__sub-icon",
                              { "transform rotate-180": menu.activeDropdown },
                            ])}
                          >
                            <Lucide icon="ChevronDown" />
                          </div>
                        )}
                      </div>
                    </Tippy>
                    {menu.subMenu && (
                      <SecondLevelMenuItems
                        menu={menu}
                        formattedMenu={formattedMenu}
                        setFormattedMenu={setFormattedMenu}
                        windowWidth={windowWidth}
                        linkTo={linkTo}
                        enter={enter}
                        leave={leave}
                      />
                    )}
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[30px] bg-slate-100 px-4 pb-10 before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
            <TopBar />
            <Outlet />
          </div>
        </div>
      </div>
    </forceActiveMenuContext.Provider>
  );
}

export default Main;
