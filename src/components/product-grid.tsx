import type {Product} from "@/lib/products";
import {ProductCard} from "@/components/product-card";
export function ProductGrid({products}:{products:Product[]}){return <div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>}