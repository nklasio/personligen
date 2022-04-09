import { ReactElement, useState } from "react";
import Layout from "../components/layout";
import { BsGithub, BsTwitter } from "react-icons/bs";

export default function Page() {
  return (
    <div className="px-20 py-8 bg-white">
      <div className="flex flex-col w-full p-8 text-xl font-semibold bg-indigo-200 rounded-lg shadow-lg ">
        <div className="flex flex-col p-4 m-1 overflow-hidden bg-white shadow-sm rounded-xl">
          <span className="mb-2 text-3xl">Hi there! I am Niklas Stambor.</span>
          <span>A Software Engineering from Bochum, Germany.</span>

          <div className="flex flex-row p-4">
            <a
              href="https://twitter.com/@nklasio"
              className="flex flex-row items-center "
            >
              <BsTwitter className="h-6 w-6 text-[#00acee]" />
              <span className="text-gray-600">@nklasio</span>
            </a>
            <a
              href="https://twitter.com/@nklasio"
              className="flex flex-row items-center ml-4"
            >
              <BsGithub className="h-6 w-6 text-[#171515]" />
              <span className="text-gray-600">@nklasio</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
