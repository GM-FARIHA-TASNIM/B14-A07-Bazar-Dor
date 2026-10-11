import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getCategories, getProducts } from "@/lib/api";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug),
  ]);

  const category = categories.find(
    (item) =>
      String(item.slug ?? item.id ?? item._id) === slug ||
      String(item.name ?? "").toLowerCase() === slug.toLowerCase(),
  );

  if (!category && !products.length) notFound();

  return (
    <div className="container page-section">
      <p className="eyebrow">ক্যাটাগরি</p>
      <h1>{category?.name ?? category?.title ?? slug}</h1>
      <ProductGrid products={products} />
    </div>
  );
}
