"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const categories = [
  { name: "সব পণ্য", href: "/" },
  { name: "চাল", href: "/category/chal" },
  { name: "ডাল", href: "/category/dal" },
  { name: "তেল", href: "/category/tel" },
  { name: "সবজি", href: "/category/sobji" },
  { name: "মাছ ও মাংস", href: "/category/mach-mangsho" },
  { name: "মসলা", href: "/category/mosla" },
];

export default function Navbar() {
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    setBanglaDate(
      new Intl.DateTimeFormat("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date()),
    );
  }, []);

  return (
    <header className="site-header">
      <div className="container">
        <div className="nav-wrap">
          <Link href="/" className="brand">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={42}
              height={42}
              priority
            />

            <span>
              বাজার দর
              <span className="date-text" style={{ display: "block" }}>
                {banglaDate}
              </span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="প্রধান নেভিগেশন">
            {categories.map((category) => (
              <Link key={category.href} href={category.href}>
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link href="/signin" className="btn btn-outline">
              সাইন ইন
            </Link>

            <Link href="/signup" className="btn btn-primary">
              সাইন আপ
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
