"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useState } from "react";

const items = [
  <Link key="wallet" href="/">
    Wallet
  </Link>,
  <Link key="token" href="/token">
    Token
  </Link>,
  <Link key="transactions" href="/transactions">
    Transactions
  </Link>,
  <Link key="nfts" href="/">
    Nfts
  </Link>,
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const DesktopNav = () => {
    return (
      <div className="hidden items-center gap-x-4 font-bold text-blue-400 md:flex">
        {items}
      </div>
    );
  };

  const MobileNav = () => {
    return (
      <div
        className={`fixed top-0 left-0 z-30 h-full w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col space-y-4 p-5 pt-16 font-semibold text-blue-500">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            &times;
          </button>

          {items.map((item, index) => (
            <div
              key={index}
              onClick={toggleMenu}
              className="rounded p-2 hover:bg-gray-100"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const HamburgerIcon = () => {
    return (
      <button
        className="p-2 text-2xl text-blue-400 md:hidden"
        onClick={toggleMenu}
        aria-label="Open menu"
      >
        &#9776;
      </button>
    );
  };

  return (
    <>
      <div className="sticky top-0 z-20 flex items-center justify-between bg-white px-5 py-2 shadow">
        <HamburgerIcon />

        <DesktopNav />

        <ConnectButton />
      </div>

      <MobileNav />

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-25 bg-black opacity-30 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
