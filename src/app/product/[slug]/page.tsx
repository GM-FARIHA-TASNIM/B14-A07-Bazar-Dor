import Link from "next/link";
import {notFound,redirect} from "next/navigation";
import {getProducts,formatPrice} from "@/lib/products";
import {ProductDetailClient} from "@/components/product-detail-client";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:`পণ্যের বিবরণ | বাজার দর`};}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const product=(await getProducts()).find(p=>p.slug===decodeURIComponent(slug)||p.id===decodeURIComponent(slug));if(!product)notFound();
 return <main className="container section"><div className="small-muted" style={{marginBottom:18}}><Link href="/">হোম</Link> / <Link href={`/category/${encodeURIComponent(product.category==="সবজি"?"shobji":product.category==="চাল"?"chal":product.category==="ডাল"?"dal":product.category==="তেল"?"tel":product.category==="মাছ"?"mach":"moshla")}`}>{product.category}</Link> / {product.name}</div><ProductDetailClient product={product}/><div className="small-muted" style={{marginTop:18}}>পণ্যের বিস্তারিত দেখতে সাইন ইন প্রয়োজন। <Link href="/signin" style={{color:"#236b43",fontWeight:700}}>সাইন ইন করুন →</Link></div></main>
}