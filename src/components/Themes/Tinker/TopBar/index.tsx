import { Fragment } from "react";
import { Link } from "react-router-dom";
import Lucide from "@/components/Base/Lucide";
import lawdeskLogoUrl from "@/assets/images/lawdesk-logo.svg";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { Popover } from "@/components/Base/Headless";
import UserProfileMenu from "@/components/Base/UserProfileMenu";
import HeaderSearch from "@/components/Base/HeaderSearch";
import fakerData from "@/utils/faker";
import _ from "lodash";
import clsx from "clsx";

function Main() {
  return (
    <>
      {/* BEGIN: Top Bar - removida posição fixa, agora rola com a página */}
      <div className="relative z-[51] flex h-[67px] items-center border-b border-slate-200 dark:border-slate-700 mt-8 mb-8">
        {/* BEGIN: Logo */}
        <Link to="/" className="hidden -intro-x md:flex items-center mr-6">
          <img
            alt="Lawdesk Legal Management System"
            className="w-6 h-6 lawdesk-logo"
            src={lawdeskLogoUrl}
          />
          <span className="ml-3 text-lg font-semibold text-slate-800 dark:text-slate-200 lawdesk-title">
            Lawdesk
          </span>
        </Link>
        {/* END: Logo */}
        {/* BEGIN: Breadcrumb */}
        <Breadcrumb className="hidden mr-auto -intro-x sm:flex">
          <Breadcrumb.Link to="/">Application</Breadcrumb.Link>
          <Breadcrumb.Link to="/" active={true}>
            Dashboard
          </Breadcrumb.Link>
        </Breadcrumb>
        {/* END: Breadcrumb */}
        {/* BEGIN: Search */}
        <HeaderSearch className="mr-3 intro-x sm:mr-6" />
        {/* END: Search */}
        {/* BEGIN: Notifications */}
        <Popover className="mr-auto intro-x sm:mr-6">
          <Popover.Button
            className="
              relative text-slate-600 dark:text-slate-400 outline-none block
              before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger
            "
          >
            <Lucide
              icon="Bell"
              className="w-5 h-5 text-slate-600 dark:text-slate-400"
            />
          </Popover.Button>
          <Popover.Panel className="w-[280px] sm:w-[350px] p-5 mt-2">
            <div className="mb-5 font-medium">Notifications</div>
            {_.take(fakerData, 5).map((faker, fakerKey) => (
              <div
                key={fakerKey}
                className={clsx([
                  "cursor-pointer relative flex items-center",
                  { "mt-5": fakerKey },
                ])}
              >
                <div className="relative flex-none w-12 h-12 mr-1 image-fit">
                  <img
                    alt="Lawdesk User"
                    className="rounded-full"
                    src={faker.photos[0]}
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600"></div>
                </div>
                <div className="ml-2 overflow-hidden">
                  <div className="flex items-center">
                    <a href="" className="mr-5 font-medium truncate">
                      {faker.users[0].name}
                    </a>
                    <div className="ml-auto text-xs text-slate-400 whitespace-nowrap">
                      {faker.times[0]}
                    </div>
                  </div>
                  <div className="w-full truncate text-slate-500 mt-0.5">
                    {faker.news[0].shortContent}
                  </div>
                </div>
              </div>
            ))}
          </Popover.Panel>
        </Popover>
        {/* END: Notifications */}
        {/* BEGIN: Account Menu */}
        <UserProfileMenu />
        {/* END: Account Menu */}
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
