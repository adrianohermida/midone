import { useRef } from "react";
import { Transition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import Tippy from "@/components/Base/Tippy";
import Lucide from "@/components/Base/Lucide";
import clsx from "clsx";
import { FormattedMenu, linkTo, enter, leave } from "./side-menu";

// Third level menu component
function ThirdLevelMenuItems({
  subMenu,
  formattedMenu,
  setFormattedMenu,
  windowWidth,
}: {
  subMenu: FormattedMenu;
  formattedMenu: Array<FormattedMenu | "divider">;
  setFormattedMenu: React.Dispatch<
    React.SetStateAction<Array<FormattedMenu | "divider">>
  >;
  windowWidth: number;
}) {
  const navigate = useNavigate();
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
          "side-menu__sub-open": subMenu.activeDropdown,
        })}
      >
        {subMenu.subMenu.map((lastSubMenu, lastSubMenuKey) => (
          <li key={lastSubMenuKey}>
            <Tippy
              as="a"
              content={lastSubMenu.title}
              options={{
                placement: "right",
              }}
              disable={windowWidth > 1260}
              href={lastSubMenu.subMenu ? "#" : lastSubMenu.pathname}
              onClick={(event: React.MouseEvent) => {
                event.preventDefault();
                linkTo(lastSubMenu, navigate);
                setFormattedMenu([...formattedMenu]);
              }}
              className={clsx([
                lastSubMenu.active
                  ? "side-menu side-menu--active"
                  : "side-menu",
              ])}
            >
              <div className="side-menu__icon">
                <Lucide icon={lastSubMenu.icon} />
              </div>
              <div className="side-menu__title">{lastSubMenu.title}</div>
            </Tippy>
          </li>
        ))}
      </ul>
    </Transition>
  );
}

// Second level menu component
function SecondLevelMenuItems({
  menu,
  formattedMenu,
  setFormattedMenu,
  windowWidth,
}: {
  menu: FormattedMenu;
  formattedMenu: Array<FormattedMenu | "divider">;
  setFormattedMenu: React.Dispatch<
    React.SetStateAction<Array<FormattedMenu | "divider">>
  >;
  windowWidth: number;
}) {
  const navigate = useNavigate();
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
          "side-menu__sub-open": menu.activeDropdown,
        })}
      >
        {menu.subMenu.map((subMenu, subMenuKey) => (
          <li key={subMenuKey}>
            <Tippy
              as="a"
              content={subMenu.title}
              options={{
                placement: "right",
              }}
              disable={windowWidth > 1260}
              href={subMenu.subMenu ? "#" : subMenu.pathname}
              onClick={(event: React.MouseEvent) => {
                event.preventDefault();
                linkTo(subMenu, navigate);
                setFormattedMenu([...formattedMenu]);
              }}
              className={clsx([
                subMenu.active ? "side-menu side-menu--active" : "side-menu",
              ])}
            >
              <div className="side-menu__icon">
                <Lucide icon={subMenu.icon} />
              </div>
              <div className="side-menu__title">
                {subMenu.title}
                {subMenu.subMenu && (
                  <div
                    className={clsx([
                      "side-menu__sub-icon",
                      { "transform rotate-180": subMenu.activeDropdown },
                    ])}
                  >
                    <Lucide icon="ChevronDown" />
                  </div>
                )}
              </div>
            </Tippy>
            {/* BEGIN: Third Child */}
            {subMenu.subMenu && (
              <ThirdLevelMenuItems
                subMenu={subMenu}
                formattedMenu={formattedMenu}
                setFormattedMenu={setFormattedMenu}
                windowWidth={windowWidth}
              />
            )}
            {/* END: Third Child */}
          </li>
        ))}
      </ul>
    </Transition>
  );
}

export default SecondLevelMenuItems;
