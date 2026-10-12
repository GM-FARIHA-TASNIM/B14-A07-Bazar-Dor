import Link from "next/link";
import {notFound} from "next/navigation";
import {getProducts} from "@/lib/products";
import {ProductGrid} from "@/components/product-grid";
import {CategoryControls} from "@/components/category-controls";
const categoryMap:Record<string,string>={chal:"চাল",shobji:"সবজি",dal:"ডাল",tel:"তেল",mach:"মাছ",moshla:"মসলা",dim:"ডিম",onnanno:"অন্যান্য"};
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:`${categoryMap[slug]||"বিভাগ"} | বাজার দর`};}
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const category=categoryMap[slug];if(!category)notFound();
 const products=(await getProducts()).filter(p=>p.category===category);
 return <main className="container section"><div className="section-head"><div><div className="small-muted" style={{marginBottom:10}}><Link href="/">হোম</Link> / {category}</div><h1 className="page-title">{({চাল:"🍚",সবজি:"🥬",ডাল:"🫘",তেল:"🫙",মাছ:"🐟",মসলা:"🌶️",ডিম:"🥚",অন্যান্য:"🧺"} as Record<string,string>)[category]} {category}</h1><p className="page-subtitle">এই বিভাগের পণ্যের আজকের বাজারদর দেখুন।</p></div></div>{products.length?<CategoryControls products={products}/>:<div className="empty"><div style={{fontSize:42}}>🧺</div><h2>এই বিভাগে কোনো পণ্য পাওয়া যায়নি</h2><p className="page-subtitle">অন্য বিভাগ থেকে পণ্য দেখুন অথবা হোম পেজে ফিরে যান।</p><Link href="/" className="btn btn-primary" style={{marginTop:20}}>হোম পেজে ফিরে যান</Link></div>}</main>
}