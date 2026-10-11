"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date()),
    );
  }, []);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand">
          <img src="/logo-icon.png" alt="Bazar Dor logo" />
          <span>বাজার দর</span>
        </Link>

        <nav className="nav-links">
          <Link href="/">হোম</Link>
          <Link href="/category/chal">চাল</Link>
          <Link href="/category/shobji">সবজি</Link>
          <Link href="/category/mach">মাছ</Link>
        </nav>

        <div className="nav-actions">
          <span className="date-text">{date}</span>
          {session?.user ? (
            <>
              <Link href="/profile" className="btn btn-outline">
                প্রোফাইল
              </Link>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  await authClient.signOut();
                  window.location.href = "/";
                }}
              >
                লগআউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-outline">
                লগইন
              </Link>
              <Link href="/signup" className="btn btn-primary">
                রেজিস্টার
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
