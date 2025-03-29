import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-400 max-sm:flex-col max-sm:gap-2">
      <Link href="/">
        <h2 className="hidden sm:block font-bold text-white">MANAGE BOOKS</h2>
      </Link>
      <nav className="w-full sm:w-auto">
        <ul className="flex justify-center sm:justify-start">
          <Link href="/new">
            <li className="px-4 py-2 outline-none rounded-md bg-blue-700 text-white w-full sm:w-auto text-center">
              + Add New
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
