import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <section className="container product-detail">
      <div className="detail-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span>{product.emoji}</span>
        )}
      </div>

      <div>
        <p className="eyebrow">পণ্যের বিস্তারিত</p>
        <h1>{product.name}</h1>
        <p className="detail-price">
          ৳{product.price} / {product.unit}
        </p>
        <p>{product.description || "এই পণ্যের অতিরিক্ত তথ্য পাওয়া যায়নি।"}</p>
      </div>
    </section>
  );
}
