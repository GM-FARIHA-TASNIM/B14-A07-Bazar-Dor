import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="product-details-page">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">হোম</Link>
          <span> / </span>
          <span>{product.name}</span>
        </div>

        <div className="product-details">
          <div className="product-details-image">
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="product-image-placeholder">
                {product.emoji ?? "🛒"}
              </div>
            )}
          </div>

          <div className="product-details-info">
            <p className="product-category">{product.category}</p>
            <h1>{product.name}</h1>

            <p className="product-price">
              {product.price} টাকা
              <span> / {product.unit}</span>
            </p>

            {product.previousPrice > product.price ? (
              <p className="previous-price">
                আগের দাম: {product.previousPrice} টাকা
              </p>
            ) : null}

            <div className="product-description">
              <h2>পণ্যের বিবরণ</h2>
              <p>
                {product.description || "এই পণ্যের বিস্তারিত তথ্য পাওয়া যায়নি।"}
              </p>
            </div>

            <Link href="/" className="btn btn-primary">
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
