
"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";

type Props = {
  products: Product[];
};

export function AllProductsControls({ products }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("সব");
  const [sort, setSort] = useState("default");
  const [priceChange, setPriceChange] = useState("all");

  const categories = useMemo(
    () => ["সব", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        category === "সব" || product.category === category;

      const matchesChange =
        priceChange === "all" ||
        (priceChange === "up" && product.change > 0) ||
        (priceChange === "down" && product.change < 0) ||
        (priceChange === "same" && product.change === 0);

      return matchesSearch && matchesCategory && matchesChange;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name, "bn"));
    }

    return result;
  }, [products, search, category, sort, priceChange]);

  return (
    <div>
      <div className="panel" style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 14,
          }}
        >
          <label>
            <span style={{ display: "block", marginBottom: 7, fontWeight: 700 }}>
              পণ্য খুঁজুন
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="যেমন: চাল, আলু, পেঁয়াজ"
              aria-label="পণ্যের নাম দিয়ে খুঁজুন"
              style={{
                width: "100%",
                minWidth: 0,
                padding: "11px 12px",
                border: "1px solid #dce4d7",
                borderRadius: 10,
                background: "#fff",
                color: "#222",
              }}
            />
          </label>

          <label>
            <span style={{ display: "block", marginBottom: 7, fontWeight: 700 }}>
              ক্যাটাগরি
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                border: "1px solid #dce4d7",
                borderRadius: 10,
                background: "#fff",
                color: "#222",
              }}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "সব" ? "সব ক্যাটাগরি" : item}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span style={{ display: "block", marginBottom: 7, fontWeight: 700 }}>
              দাম অনুযায়ী সাজান
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                border: "1px solid #dce4d7",
                borderRadius: 10,
                background: "#fff",
                color: "#222",
              }}
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
              <option value="name">নাম অনুযায়ী</option>
            </select>
          </label>

          <label>
            <span style={{ display: "block", marginBottom: 7, fontWeight: 700 }}>
              দামের পরিবর্তন
            </span>
            <select
              value={priceChange}
              onChange={(e) => setPriceChange(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                border: "1px solid #dce4d7",
                borderRadius: 10,
                background: "#fff",
                color: "#222",
              }}
            >
              <option value="all">সব পরিবর্তন</option>
              <option value="up">↑ দাম বেড়েছে</option>
              <option value="down">↓ দাম কমেছে</option>
              <option value="same">→ দাম অপরিবর্তিত</option>
            </select>
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 16,
          }}
        >
          <span className="small-muted">
            {filteredProducts.length}টি পণ্য পাওয়া গেছে
          </span>

          <button
            type="button"
            className="btn btn-soft"
            onClick={() => {
              setSearch("");
              setCategory("সব");
              setSort("default");
              setPriceChange("all");
            }}
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="empty">
          <h3>কোনো পণ্য পাওয়া যায়নি</h3>
          <p className="page-subtitle">
            অন্য নাম বা ক্যাটাগরি দিয়ে খুঁজে দেখুন।
          </p>
        </div>
      )}
    </div>
  );
}
