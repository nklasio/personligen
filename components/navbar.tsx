import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
const navigation = [
  { name: "Posts", href: "/posts", current: false },
  { name: "Projects", href: "#", current: false },
];
export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-indigo-700">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-2">
            <div className="relative flex items-center justify-between h-16">
              <div className="inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-indigo-400 rounded-md hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-between flex-1 align-baseline sm:items-stretch">
                <Link href={"/"}>
                  <a className="px-3 py-2">
                    <div className="flex items-center flex-shrink-0">
                      <span className="text-xl font-medium text-white select-none">
                        Niklas Stambor
                      </span>
                    </div>
                  </a>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={`${
                            item.current
                              ? "bg-indigo-800 text-white"
                              : "text-indigo-50 hover:bg-indigo-500 hover:text-white"
                          } rounded-md px-3  py-2 text-sm font-medium`}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={`${
                    item.current
                      ? "bg-indigo-800 text-white"
                      : "text-gray-300 hover:bg-indigo-500 hover:text-white"
                  } "block font-medium" rounded-md px-3 py-2 text-base`}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
