import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import Button from "../Loginform/Button";
import NavLinks from "./NavLinks";
import HamburgerIcon from "../../assets/hamburger.png";
import CloseIcon from "../../assets/x.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Fungsi untuk menutup navbar saat tautan diklik di tampilan mobile
  const closeNavbar = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Menambahkan event listener untuk menutup navbar setelah mengklik tautan
    const navItems = document.querySelectorAll("#nav-items li");
    navItems.forEach((item) => {
      item.addEventListener("click", closeNavbar);
    });

    // Membersihkan event listener saat komponen unmount
    return () => {
      navItems.forEach((item) => {
        item.removeEventListener("click", closeNavbar);
      });
    };
  }, []);

  return (
    <nav className="bg-white ">
      <div className="flex items-center justify-around font-poppins ">
        <div className="z-30 flex justify-between w-full p-5 md:w-auto">
          <div className="flex">
            <img src={Logo} alt="logo" className="md:cursor-pointer h-14" />
            <h1
              id="Stubting-text"
              className="pl-3 m-auto text-3xl font-poppins "
            >
              Stunting
            </h1>
          </div>
          <div
            className="flex items-center text-3xl md:hidden"
            onClick={() => setOpen(!open)}
          >
            <img
              src={open ? CloseIcon : HamburgerIcon}
              alt={open ? "Close" : "Menu"}
              className="w-10 transition-transform rounded-lg cursor-pointer h-9 bg-secondary transform-gpu hover:scale-110"
            />
          </div>
        </div>
        <ul
          id="nav-items"
          className="md:flex hidden uppercase items-center gap-8 font-[Poppins]"
        >
          <li className="relative group">
            <Link
              to="/"
              className="inline-block px-3 py-7 text-black1 hover:scale-110"
              onClick={closeNavbar}
            >
              Home
              <div className="line"></div>
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/about"
              className="inline-block px-3 py-7 text-black1 hover:scale-110"
              onClick={closeNavbar}
            >
              About
              <div className="line"></div>
            </Link>
          </li>
          <NavLinks onClick={closeNavbar} className="hover:scale-110 " />
          <li className="relative group">
            <Link
              to="/contact"
              className="inline-block px-3 py-7 text-black1 hover:scale-110"
              onClick={closeNavbar}
            >
              Dashboard
              <div className="line"></div>
            </Link>
          </li>
        </ul>
        <div className="justify-between hidden space-x-4 md:block ">
          <Link to="/login">
            <Button className={"bg-secondary text-primary"} />
          </Link>

          <Link to="/register">
            <button className="px-3 py-2 rounded-lg bg-[#E9E3FF] hover:scale-110 text-primary">
              Sign up
            </button>
          </Link>
        </div>
        {/* Mobile nav */}
        <ul
          className={` z-20
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          <li>
            <Link
              to="/"
              className="inline-block px-3 py-7"
              onClick={closeNavbar}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="inline-block px-3 py-7"
              onClick={closeNavbar}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="inline-block px-3 py-7"
              onClick={closeNavbar}
            >
              Dashboard
            </Link>
          </li>
          <div className="cursor-pointer bg">
            <NavLinks />
          </div>
          <div className="justify-between py-5 space-x-4">
            <Link to="/login" onClick={closeNavbar}>
              <Button className={"bg-gradiasi-1 text-secondary"} />
            </Link>
            <Link to="/register">
              <button className="px-3 py-2 rounded-lg bg-[#E9E3FF] hover:scale-110 text-primary">
                Sign up
              </button>
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
