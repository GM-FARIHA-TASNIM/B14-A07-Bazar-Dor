import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getCategories, getProducts } from "@/lib/api";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const category = categories.find(
    (item) =>
      item.slug.toLowerCase() === slug.toLowerCase() ||
      item.id.toLowerCase() === slug.toLowerCase(),
  );

  const matchingProducts = allProducts.filter((product) => {
    const productCategory = String(product.category).toLowerCase();

    return (
      productCategory === slug.toLowerCase() ||
      productCategory === category?.name?.toLowerCase() ||
      productCategory === category?.slug?.toLowerCase()
    );
  });

  if (!category && matchingProducts.length === 0) {
    notFound();
  }

  return (
    <section className="category-page">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">হোম</Link>
          <span> / </span>
          <span>{category?.name ?? slug}</span>
        </div>

        <ProductGrid
          products={matchingProducts}
          title={`${category?.name ?? slug} বিভাগের পণ্য`}
        />
      </div>
    </section>
  );
}
