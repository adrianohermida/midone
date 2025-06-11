import "@/assets/css/themes/rubick/top-nav.css";
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
} from "./simple-menu";
import SecondLevelMenuItems from "@/components/Base/SideMenuItems";
import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";
import justiceScaleUrl from "@/assets/images/justice-scale.svg";
import clsx from "clsx";
import TopBar from "@/components/Themes/Rubick/TopBar";
import MobileMenu from "@/components/MobileMenu";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | "divider">
  >([]);
  const menuStore = useAppSelector(selectMenu("simple-menu"));
  const menu = () => nestedMenu(menuStore, location);

  useEffect(() => {
    setFormattedMenu(menu());
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
          {/* BEGIN: Simple Menu */}
          <nav className="side-nav side-nav--simple pr-5 pb-16 overflow-x-hidden hidden md:block w-[80px]">
            <Link to="/" className="flex items-center pt-4 pl-5 intro-x">
              <img
                alt="Lawdesk Legal Management System"
                className="w-6 h-6 justice-scale-icon justice-scale-white"
                src={justiceScaleUrl}
              />
            </Link>
            <div className="my-6 side-nav__divider"></div>
            <ul>
              {/* BEGIN: First Child */}
              {formattedMenu.map((menu, menuKey) =>
                menu == "divider" ? (
                  <li className="my-6 side-nav__divider" key={menuKey}></li>
                ) : (
                  <li key={menuKey}>
                    <Tippy
                      as="a"
                      content={menu.title}
                      options={{
                        placement: "left",
                      }}
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
                        <Lucide icon={menu.icon || "Home"} />
                      </div>
                      <div className="side-menu__title">
                        {menu.title}
                        {menu.subMenu && (
                          <div
                            className={clsx([
                              "side-menu__sub-icon",
                              menu.activeDropdown && "transform rotate-180",
                            ])}
                          >
                            <Lucide icon="ChevronDown" />
                          </div>
                        )}
                      </div>
                    </Tippy>
                    {/* BEGIN: Second Child */}
                    {menu.subMenu && (
                      <SecondLevelMenuItems
                        menu={menu}
                        formattedMenu={formattedMenu}
                        setFormattedMenu={setFormattedMenu}
                        windowWidth={1260}
                        linkTo={linkTo}
                        enter={enter}
                        leave={leave}
                      />
                    )}
                    {/* END: Second Child */}
                  </li>
                ),
              )}
              {/* END: First Child */}
            </ul>
          </nav>
          {/* END: Simple Menu */}
          {/* BEGIN: Content */}
          <div className="rounded-[30px] min-w-0 min-h-screen flex-1 pb-10 bg-slate-100 dark:bg-darkmode-700 px-4 md:px-[22px] max-w-full md:max-w-auto before:content-[''] before:w-full before:h-px before:block">
            <TopBar />
            <Outlet />
          </div>
          {/* END: Content */}
        </div>
      </div>
    </forceActiveMenuContext.Provider>
  );
}

export default Main;
