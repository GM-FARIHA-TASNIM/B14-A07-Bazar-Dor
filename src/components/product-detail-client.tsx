"use client";

import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { authClient } from "@/lib/auth-client";

export function ProductDetailClient({ product }: { product: Product }) {
  const { data: session, isPending } = authClient.useSession();
  const user = !!session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      toast("বিস্তারিত বাজারদর দেখতে সাইন ইন করুন।", {
        icon: "🔒",
      });
    }
  }, [isPending, user]);

  return (
    <>
      <div className="detail-grid">
        <section className="panel">
          <div className="detail-hero">
            <div className="detail-emoji">{product.emoji}</div>

            <div>
              <h1 className="page-title" style={{ fontSize: 29 }}>
                {product.name}
              </h1>
              <p className="page-subtitle">{product.description}</p>
              <span className="tag">{product.category}</span>{" "}
              <span className="tag">{product.unit}</span>
            </div>
          </div>

          <div
            style={{
              padding: "16px 0 0",
              borderTop: "1px solid #e7ece4",
            }}
          >
            <span className="small-muted">আজকের গড় দাম</span>

            <div
              style={{
                fontSize: 31,
                fontWeight: 900,
                marginTop: 6,
              }}
            >
              {formatPrice(product.averagePrice || product.price)}
            </div>

            <span className="small-muted">সর্বশেষ বাজারদরের সারাংশ</span>
          </div>
        </section>

        <section className="panel">
          <h2 style={{ fontSize: 20, margin: "0 0 18px" }}>দামের সারসংক্ষেপ</h2>

          <div className="stat-grid">
            <div className="stat">
              <span>সর্বনিম্ন দাম</span>
              <strong>{formatPrice(product.minPrice || product.price)}</strong>
            </div>

            <div className="stat">
              <span>সর্বোচ্চ দাম</span>
              <strong>{formatPrice(product.maxPrice || product.price)}</strong>
            </div>

            <div className="stat">
              <span>গড় দাম</span>
              <strong>
                {formatPrice(product.averagePrice || product.price)}
              </strong>
            </div>
          </div>
        </section>
      </div>

      <section className="panel" style={{ marginTop: 18 }}>
        <div className="section-head">
          <div>
            <h2 style={{ fontSize: 22, margin: "0 0 6px" }}>
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="page-subtitle">
              বিভিন্ন বাজারে {product.name} এর দাম তুলনা করুন।
            </p>
          </div>

          <span className="tag">আজকের দর</span>
        </div>

        {isPending ? (
          <div className="empty" style={{ padding: 35 }}>
            <p className="page-subtitle">Login status যাচাই হচ্ছে…</p>
          </div>
        ) : user ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>বাজারের নাম</th>
                  <th>এলাকা</th>
                  <th>একক</th>
                  <th>আজকের দাম</th>
                  <th>আপডেট</th>
                </tr>
              </thead>

              <tbody>
                {(product.markets.length
                  ? product.markets
                  : [
                      {
                        name: "স্থানীয় বাজার",
                        area: "বাংলাদেশ",
                        price: product.price,
                        updated: "আজ",
                      },
                    ]
                ).map((market, index) => (
                  <tr key={`${market.name}-${index}`}>
                    <td style={{ fontWeight: 700 }}>{market.name}</td>

                    <td>{market.area || "—"}</td>

                    <td>{product.unit}</td>

                    <td
                      style={{
                        fontWeight: 800,
                        color: "#236b43",
                      }}
                    >
                      {formatPrice(market.price)}
                    </td>

                    <td>{market.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty" style={{ padding: 35 }}>
            <div style={{ fontSize: 35 }}>🔒</div>

            <h3>বাজারভিত্তিক দাম দেখতে সাইন ইন করুন</h3>

            <p className="page-subtitle">
              সাইন ইন করলে বিস্তারিত বাজারদরের তথ্য দেখতে পারবেন।
            </p>

            <Link
              className="btn btn-primary"
              href="/signin"
              style={{ marginTop: 15 }}
            >
              সাইন ইন করুন
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
