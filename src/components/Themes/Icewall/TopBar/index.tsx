import { Fragment } from "react";
import Lucide from "@/components/Base/Lucide";
import justiceScaleUrl from "@/assets/images/justice-scale.svg";
import { Link } from "react-router-dom";
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
      {/* BEGIN: Top Bar */}
      <div className="top-bar-boxed relative z-[51] -mx-5 mb-12 mt-12 h-[70px] border-b border-white/[0.08] px-3 sm:-mx-8 sm:px-8 md:-mt-5 md:pt-0">
        <div className="flex items-center h-full">
          {/* BEGIN: Logo */}
          <Link to="/" className="hidden -intro-x md:flex items-center">
            <img
              alt="Lawdesk Legal Management System"
              className="w-6 h-6"
              src={justiceScaleUrl}
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="ml-3 text-lg font-semibold text-white">
              Lawdesk
            </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <Breadcrumb
            light
            className="h-full md:ml-10 md:pl-10 md:border-l border-white/[0.08] mr-auto -intro-x"
          >
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
          <Popover className="mr-4 intro-x sm:mr-6">
            <Popover.Button
              className="
              relative text-white/70 outline-none block
              before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger
            "
            >
              <Lucide icon="Bell" className="w-5 h-5 dark:text-slate-500" />
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
                      alt="Midone Tailwind HTML Admin Template"
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
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
