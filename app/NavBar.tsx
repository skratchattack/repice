"use client";

import classnames from "classnames";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { GiSlicedBread } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 h-14 py-3">
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href="/">
            <GiSlicedBread size={30} />
          </Link>
            <NavLinks />
        </Flex>
      </Flex>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "New Recipe", href: "/recipes/new"},
    { label: "My Recipes", href: "/recipes" },
  ];
  const currentPath = usePathname();

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
