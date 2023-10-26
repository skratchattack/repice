"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GiSlicedBread } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="flex space-x-6">
      <Link href="/">
        <GiSlicedBread size={30} />
      </Link>
      <ul className="flex space-x-6">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/recipes/new">New Recipe</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
