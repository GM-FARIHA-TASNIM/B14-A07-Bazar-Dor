"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fallbackProducts, formatPrice, getChangeLabel } from "@/lib/products";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "সব পণ্য", slug: "", icon: "◈" },
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "সবজি", slug: "shobji", icon: "🥬" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🫙" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মসলা", slug: "moshla", icon: "🌶️" },
];

const bnDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

export function SiteHeader() {
  const path = usePathname();
  const router = useRouter();
  const [date, setDate] = useState("আজকের বাজারদর");
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setDate(bnDate());
  }, []);

  const tickers = [...fallbackProducts, ...fallbackProducts];

  async function handleSignOut() {
    await authClient.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <header className="header">
      <div className="container" style={{ paddingTop: 14, paddingBottom: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={44}
              height={44}
              priority
              style={{ width: 44, height: 44, objectFit: "contain" }}
            />
            <span>
              <span className="brand">বাজার দর</span>
              <span
                className="small-muted"
                style={{ display: "block", marginTop: 3 }}
              >
                {date}
              </span>
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {!isPending &&
              (user ? (
                <>
                  <Link className="btn btn-soft" href="/profile">
                    👤 {user.name || "আমার প্রোফাইল"}
                  </Link>
                  <button className="btn" onClick={handleSignOut}>
                    সাইন আউট
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn" href="/signin">
                    সাইন ইন
                  </Link>
                  <Link className="btn btn-primary" href="/signup">
                    সাইন আপ
                  </Link>
                </>
              ))}
          </div>
        </div>

        <nav className="navlinks" style={{ paddingTop: 14 }}>
          {categories.map((category) => {
            const href = category.slug
              ? `/category/${category.slug}`
              : "/#সব-পণ্য";

            const active = category.slug
              ? path === `/category/${category.slug}`
              : path === "/";

            return (
              <Link
                key={category.name}
                href={href}
                className={`navlink ${active ? "active" : ""}`}
              >
                {category.icon} {category.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="ticker" aria-label="চলমান বাজারদর">
        <div className="ticker-track">
          {tickers.map((product, index) => (
            <span className="ticker-item" key={`${product.id}-${index}`}>
              {product.emoji} {product.name} · {formatPrice(product.price)} /{" "}
              {product.unit.replace("প্রতি ", "")} ·{" "}
              <span className="ticker-change">
                {getChangeLabel(product.change)}
              </span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
