import Hero from "@/components/Hero";
import PriceTicker from "@/components/PriceTicker";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  const rising = products.filter(
    (product) => product.price > product.previousPrice,
  );

  const falling = products.filter(
    (product) => product.price < product.previousPrice,
  );

  return (
    <>
      <PriceTicker products={products} />
      <Hero />

      <section className="container section">
        <p className="eyebrow">আজকের বাজার</p>
        <h2>দাম বেড়েছে</h2>
        {rising.length ? (
          <ProductGrid products={rising} />
        ) : (
          <p>এই মুহূর্তে দাম বৃদ্ধির তথ্য পাওয়া যায়নি।</p>
        )}
      </section>

      <section className="container section">
        <p className="eyebrow">সাশ্রয়ের সুযোগ</p>
        <h2>দাম কমেছে</h2>
        {falling.length ? (
          <ProductGrid products={falling} />
        ) : (
          <p>এই মুহূর্তে দাম কমার তথ্য পাওয়া যায়নি।</p>
        )}
      </section>

      <ProductGrid products={products} />
    </>
  );
}
