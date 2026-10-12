import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";
import { AllProductsControls } from "@/components/all-products-controls";

export const revalidate = 300;

export default async function HomePage() {
  const products = await getProducts();

  const risers = [...products]
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">✦ বাংলাদেশের বাজারদর, এক জায়গায়</span>

            <h1>
              বাজারের সঠিক দাম,
              <br />
              <span>সিদ্ধান্ত হোক সহজ।</span>
            </h1>

            <p>
              চাল, ডাল, তেল, মাছ, সবজিসহ নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম জানুন।
              বাজারে যাওয়ার আগে থাকুন এক ধাপ এগিয়ে।
            </p>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 22,
              }}
            >
              <a className="btn btn-primary" href="#সব-পণ্য">
                সব পণ্য দেখুন <span>→</span>
              </a>

              <Link className="btn btn-soft" href="/category/shobji">
                বাজারদর ঘুরে দেখুন
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                gap: 22,
                marginTop: 28,
                flexWrap: "wrap",
              }}
            >
              <span className="small-muted">✓ সহজে দাম তুলনা</span>
              <span className="small-muted">✓ বাংলা ভাষায় তথ্য</span>
              <span className="small-muted">✓ বাজারভিত্তিক দর</span>
            </div>
          </div>

          <div className="hero-art">
            <Image
              src="/bazar-hero.png"
              alt="বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের বাজার"
              fill
              priority
              sizes="(max-width: 650px) 100vw, 45vw"
              style={{ objectFit: "contain", padding: 12 }}
            />
          </div>
        </div>
      </section>

      <section className="section rise-section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>
                আজ দাম বেড়েছে <span style={{ color: "#27794b" }}>▲</span>
              </h2>
              <p>যেসব পণ্যের দামে আজ ঊর্ধ্বগতি দেখা যাচ্ছে</p>
            </div>

            <span className="small-muted">শীর্ষ {risers.length} পণ্য</span>
          </div>

          {risers.length > 0 ? (
            <ProductGrid products={risers} />
          ) : (
            <p className="small-muted">আজ দাম বৃদ্ধির তথ্য নেই।</p>
          )}
        </div>
      </section>

      <section
        className="section"
        id="সব-পণ্য"
        style={{ background: "#f1f5eb", scrollMarginTop: 15 }}
      >
        <div className="container">
          <div className="section-head">
            <div>
              <h2>সব পণ্য</h2>
              <p>আপনার প্রয়োজনীয় পণ্যের আজকের দাম, এক জায়গায়।</p>
            </div>

            <span className="small-muted">মোট {products.length}টি পণ্য</span>
          </div>

          <AllProductsControls products={products} />
        </div>
      </section>
    </main>
  );
}

