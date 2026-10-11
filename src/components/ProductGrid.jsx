"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, sort]);

  return (
    <section id="products" className="container section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">বাজারের তালিকা</p>
          <h2>সব পণ্য</h2>
        </div>

        <div className="grid-controls">
          <input
            type="search"
            placeholder="পণ্য খুঁজুন..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="পণ্য খুঁজুন"
          />

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="দাম অনুযায়ী সাজান"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">কম দাম আগে</option>
            <option value="high">বেশি দাম আগে</option>
          </select>
        </div>
      </div>

      {filteredProducts.length ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="empty-state">কোনো পণ্য পাওয়া যায়নি।</p>
      )}
    </section>
  );
}
