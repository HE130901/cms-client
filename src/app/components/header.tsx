import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
}

export default Header;
