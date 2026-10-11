import Link from "next/link";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products = [],
  title = "জনপ্রিয় পণ্য",
  showViewAll = false,
}) {
  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="section-subtitle">বাজারদর এক নজরে</span>
            <h2>{title}</h2>
          </div>

          {showViewAll ? (
            <Link href="/category/chal" className="view-all-link">
              সব পণ্য দেখুন →
            </Link>
          ) : null}
        </div>

        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard
                key={product.id ?? product.slug ?? index}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="empty-products">
            <span>🛍️</span>
            <h3>এখনো কোনো পণ্য পাওয়া যায়নি</h3>
            <p>পণ্যের তথ্য লোড হলে এখানে দেখা যাবে।</p>
          </div>
        )}
      </div>
    </section>
  );
}
