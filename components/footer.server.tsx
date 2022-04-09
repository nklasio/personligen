import { BsTwitter, BsGithub } from "react-icons/bs";
export default function Footer() {
  return (
    <div className="flex flex-row items-center justify-between w-full p-4 text-sm bg-indigo-700 text-indigo-50">
      <span className="w-full pt-2 text-center">
        © {new Date().getFullYear()} Niklas Stambor · All rights reserved.
      </span>
      <span className="w-full pt-2 text-center">
        Developed with<span className="mx-1 mr-2">❤️</span>in Bochum
      </span>
      <div className="flex items-center justify-center w-full p-4 space-x-4 text-xl ">
        <a href="https://twitter.com/@nklasio">
          <BsTwitter />
        </a>
        <a href="https://github.com/nklasio">
          <BsGithub />
        </a>
      </div>
    </div>
  );
}
