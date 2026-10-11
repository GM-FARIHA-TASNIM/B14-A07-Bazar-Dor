import Link from "next/link";

export default function ProductCard({ product }) {
  const rising = product.price >= product.previousPrice;

  return (
    <article className="product-card">
      <Link href={`/product/${product.slug}`} className="product-link">
        <div className="product-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <span className="product-emoji">{product.emoji}</span>
          )}
        </div>

        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-price">
            ৳{product.price} <span>/ {product.unit}</span>
          </p>
          <p className={rising ? "up" : "down"}>
            {rising ? "▲ দাম বেড়েছে" : "▼ দাম কমেছে"}
          </p>
        </div>
      </Link>
    </article>
  );
}
