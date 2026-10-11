import Link from "next/link";

export default function ProductCard({ product }) {
  if (!product) return null;

  const name = product.name ?? product.title ?? "পণ্যের নাম";
  const slug = product.slug ?? product.id;
  const price = product.price;
  const unit = product.unit ?? "কেজি";
  const image = product.image ?? product.imageUrl;

  return (
    <article className="product-card">
      <Link
        href={slug ? `/product/${slug}` : "#products"}
        className="product-image-wrap"
      >
        {image ? (
          <img src={image} alt={name} className="product-image" />
        ) : (
          <div className="product-image-placeholder">🛒</div>
        )}
      </Link>

      <div className="product-info">
        <h3 className="product-name">
          {slug ? <Link href={`/product/${slug}`}>{name}</Link> : name}
        </h3>

        <p className="product-price">
          {price != null ? `${price} টাকা` : "দাম পাওয়া যায়নি"}
          {price != null ? <span> / {unit}</span> : null}
        </p>

        {product.category ? (
          <p className="product-category">{product.category}</p>
        ) : null}

        {slug ? (
          <Link href={`/product/${slug}`} className="product-details-link">
            বিস্তারিত দেখুন →
          </Link>
        ) : null}
      </div>
    </article>
  );
}
