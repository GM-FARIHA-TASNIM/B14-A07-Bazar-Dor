import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import PriceTicker from "@/components/PriceTicker";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  const tickerItems = products.slice(0, 6).map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    unit: product.unit,
  }));

  return (
    <>
      <PriceTicker items={tickerItems} />
      <Hero />
      <ProductGrid products={products} title="জনপ্রিয় পণ্য" showViewAll />
    </>
  );
}
