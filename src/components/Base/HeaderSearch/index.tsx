import { useState, Fragment, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { Transition } from "@headlessui/react";
import fakerData from "@/utils/faker";
import _ from "lodash";

interface HeaderSearchProps {
  className?: string;
}

function HeaderSearch({ className }: HeaderSearchProps) {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };

  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real application, you would implement search functionality here
      console.log("Searching for:", searchQuery);
      hideSearchDropdown();
    }
  };

  const quickSearchPages = [
    {
      title: "Dashboard",
      icon: "Home",
      path: "/",
      color: "bg-success/20 dark:bg-success/10 text-success",
    },
    {
      title: "Users & Permissions",
      icon: "Users",
      path: "/users-layout-1",
      color: "bg-pending/10 text-pending",
    },
    {
      title: "Transactions Report",
      icon: "CreditCard",
      path: "/transaction-list",
      color: "bg-primary/10 dark:bg-primary/20 text-primary/80",
    },
    {
      title: "Settings",
      icon: "Settings",
      path: "/update-profile",
      color: "bg-warning/10 text-warning",
    },
    {
      title: "File Manager",
      icon: "HardDrive",
      path: "/file-manager",
      color: "bg-info/10 text-info",
    },
  ];

  const filteredPages = quickSearchPages.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredUsers = _.take(fakerData, 4).filter((faker) =>
    faker.users[0].name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredProducts = _.take(fakerData, 4).filter((faker) =>
    faker.products[0].name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        showSearchDropdown();
      }
      if (e.key === "Escape") {
        hideSearchDropdown();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative hidden sm:block">
        <form onSubmit={handleSearch}>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-transparent w-56 shadow-none rounded-full bg-slate-200 pr-8 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-72 dark:bg-darkmode-400 px-4 py-2 text-sm"
            placeholder="Search... (Ctrl+K)"
            onFocus={showSearchDropdown}
            onBlur={(e) => {
              // Delay hiding to allow clicking on dropdown items
              setTimeout(() => hideSearchDropdown(), 150);
            }}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <Lucide
              icon="Search"
              className="w-5 h-5 text-slate-600 dark:text-slate-500"
            />
          </button>
        </form>
      </div>
      <button
        className="relative text-white/70 sm:hidden"
        onClick={() => {
          showSearchDropdown();
          setTimeout(() => searchInputRef.current?.focus(), 100);
        }}
      >
        <Lucide icon="Search" className="w-5 h-5 dark:text-slate-500" />
      </button>
      <Transition
        as={Fragment}
        show={searchDropdown}
        enter="transition-all ease-linear duration-150"
        enterFrom="mt-5 invisible opacity-0 translate-y-1"
        enterTo="mt-[3px] visible opacity-100 translate-y-0"
        leave="transition-all ease-linear duration-150"
        leaveFrom="mt-[3px] visible opacity-100 translate-y-0"
        leaveTo="mt-5 invisible opacity-0 translate-y-1"
      >
        <div className="absolute right-0 z-10 mt-[3px]">
          <div className="w-[450px] p-5 box">
            {/* Pages Section */}
            <div className="mb-2 font-medium">Pages</div>
            <div className="mb-5">
              {(searchQuery ? filteredPages : quickSearchPages).map(
                (page, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(page.path);
                      hideSearchDropdown();
                      setSearchQuery("");
                    }}
                    className="flex items-center w-full text-left hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded"
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${page.color}`}
                    >
                      <Lucide
                        icon={page.icon || "Activity"}
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="ml-3">{page.title}</div>
                  </button>
                ),
              )}
              {searchQuery && filteredPages.length === 0 && (
                <div className="text-slate-500 text-sm py-2">
                  No pages found
                </div>
              )}
            </div>

            {/* Users Section */}
            <div className="mb-2 font-medium">Users</div>
            <div className="mb-5">
              {(searchQuery ? filteredUsers : _.take(fakerData, 4)).map(
                (faker, fakerKey) => (
                  <button
                    key={fakerKey}
                    onClick={() => {
                      navigate("/users-layout-1");
                      hideSearchDropdown();
                      setSearchQuery("");
                    }}
                    className="flex items-center mt-2 w-full text-left hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded"
                  >
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Lawdesk User"
                        className="rounded-full"
                        src={faker.photos[0]}
                      />
                    </div>
                    <div className="ml-3">{faker.users[0].name}</div>
                    <div className="w-48 ml-auto text-xs text-right truncate text-slate-500">
                      {faker.users[0].email}
                    </div>
                  </button>
                ),
              )}
              {searchQuery && filteredUsers.length === 0 && (
                <div className="text-slate-500 text-sm py-2">
                  No users found
                </div>
              )}
            </div>

            {/* Products Section */}
            <div className="mb-2 font-medium">Products</div>
            {(searchQuery ? filteredProducts : _.take(fakerData, 4)).map(
              (faker, fakerKey) => (
                <button
                  key={fakerKey}
                  onClick={() => {
                    navigate("/product-list");
                    hideSearchDropdown();
                    setSearchQuery("");
                  }}
                  className="flex items-center mt-2 w-full text-left hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded"
                >
                  <div className="w-8 h-8 image-fit">
                    <img
                      alt="Lawdesk Product"
                      className="rounded-full"
                      src={faker.images[0]}
                    />
                  </div>
                  <div className="ml-3">{faker.products[0].name}</div>
                  <div className="w-48 ml-auto text-xs text-right truncate text-slate-500">
                    {faker.products[0].category}
                  </div>
                </button>
              ),
            )}
            {searchQuery && filteredProducts.length === 0 && (
              <div className="text-slate-500 text-sm py-2">
                No products found
              </div>
            )}
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default HeaderSearch;
