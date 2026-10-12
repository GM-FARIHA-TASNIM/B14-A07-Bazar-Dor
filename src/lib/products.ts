export type Product = {
  id: string; slug: string; name: string; emoji: string; category: string;
  unit: string; price: number; change: number; description: string;
  minPrice: number; maxPrice: number; averagePrice: number;
  markets: { name: string; area: string; price: number; updated: string }[];
};

export const API_URL = (process.env.NEXT_PUBLIC_BAZARDOR_API || "https://openapi.programming-hero.com/api/bazardor").replace(/\/$/, "");

const defaults: Product[] = [
  {id:"rice-swarnamashi",slug:"swarnamashi-rice",name:"স্বর্ণমাছি চাল",emoji:"🍚",category:"চাল",unit:"প্রতি কেজি",price:78,change:2.1,description:"পরিবারের প্রতিদিনের রান্নার জন্য জনপ্রিয় চাল।",minPrice:72,maxPrice:84,averagePrice:78,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:78,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:75,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:84,updated:"আজ"}]},
  {id:"miniket-rice",slug:"miniket-rice",name:"মিনিকেট চাল",emoji:"🍚",category:"চাল",unit:"প্রতি কেজি",price:72,change:-1.4,description:"দৈনন্দিন ব্যবহারের পরিচিত সরু চাল।",minPrice:66,maxPrice:78,averagePrice:72,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:72,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:68,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:78,updated:"আজ"}]},
  {id:"potato",slug:"alu",name:"আলু",emoji:"🥔",category:"সবজি",unit:"প্রতি কেজি",price:35,change:-2.9,description:"প্রতিদিনের রান্নার প্রয়োজনীয় সবজি।",minPrice:30,maxPrice:40,averagePrice:35,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:35,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:32,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:40,updated:"আজ"}]},
  {id:"onion",slug:"peyaj",name:"পেঁয়াজ",emoji:"🧅",category:"সবজি",unit:"প্রতি কেজি",price:65,change:3.2,description:"রান্নায় ব্যবহৃত নিত্যপ্রয়োজনীয় পণ্য।",minPrice:58,maxPrice:72,averagePrice:65,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:65,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:60,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:72,updated:"আজ"}]},
  {id:"green-chili",slug:"kacha-morich",name:"কাঁচা মরিচ",emoji:"🌶️",category:"সবজি",unit:"প্রতি কেজি",price:90,change:5.1,description:"ঝাল ও স্বাদের জন্য ব্যবহৃত তাজা মরিচ।",minPrice:75,maxPrice:110,averagePrice:90,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:90,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:80,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:110,updated:"আজ"}]},
  {id:"okra",slug:"dherosh",name:"ঢেঁড়স",emoji:"🥬",category:"সবজি",unit:"প্রতি কেজি",price:48,change:-1.8,description:"তাজা মৌসুমি সবজি।",minPrice:40,maxPrice:55,averagePrice:48,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:48,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:43,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:55,updated:"আজ"}]},
  {id:"lentil",slug:"mosur-dal",name:"মসুর ডাল",emoji:"🫘",category:"ডাল",unit:"প্রতি কেজি",price:125,change:1.6,description:"প্রোটিনসমৃদ্ধ পরিচিত ডাল।",minPrice:115,maxPrice:135,averagePrice:125,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:125,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:120,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:135,updated:"আজ"}]},
  {id:"soybean-oil",slug:"soybean-oil",name:"সয়াবিন তেল",emoji:"🫙",category:"তেল",unit:"প্রতি লিটার",price:168,change:0,description:"রান্নার বহুল ব্যবহৃত ভোজ্যতেল।",minPrice:160,maxPrice:175,averagePrice:168,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:168,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:165,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:175,updated:"আজ"}]},
  {id:"hilsa",slug:"ilish-mach",name:"ইলিশ মাছ",emoji:"🐟",category:"মাছ",unit:"প্রতি কেজি",price:1850,change:2.8,description:"বাংলাদেশের জনপ্রিয় জাতীয় মাছ।",minPrice:1600,maxPrice:2200,averagePrice:1850,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:1850,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:1750,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:2200,updated:"আজ"}]},
  {id:"eggs",slug:"dim",name:"ডিম",emoji:"🥚",category:"ডিম",unit:"প্রতি ডজন",price:150,change:-0.8,description:"প্রোটিনের সহজলভ্য উৎস।",minPrice:140,maxPrice:160,averagePrice:150,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:150,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:145,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:160,updated:"আজ"}]},
  {id:"garlic",slug:"roshun",name:"রসুন",emoji:"🧄",category:"মসলা",unit:"প্রতি কেজি",price:220,change:0,description:"রান্নার সুগন্ধ বাড়াতে ব্যবহৃত মসলা।",minPrice:200,maxPrice:240,averagePrice:220,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:220,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:210,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:240,updated:"আজ"}]},
  {id:"ginger",slug:"ada",name:"আদা",emoji:"🫚",category:"মসলা",unit:"প্রতি কেজি",price:240,change:-1.2,description:"রান্না ও পানীয়তে ব্যবহৃত সুগন্ধি মসলা।",minPrice:220,maxPrice:260,averagePrice:240,markets:[{name:"কাঁচাবাজার",area:"ঢাকা",price:240,updated:"আজ"},{name:"টাউন বাজার",area:"কুমিল্লা",price:230,updated:"আজ"},{name:"সদর বাজার",area:"চট্টগ্রাম",price:260,updated:"আজ"}]}
];

const slugify = (s: string) => s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}-]/gu, "");
const numberValue = (v: unknown): number => {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return 0;
  const bn = v.replace(/[০-৯]/g, d => String("০১২৩৪৫৬৭৮৯".indexOf(d))).replace(/,/g, "");
  return Number(bn.replace(/[^\d.-]/g, "")) || 0;
};
function normalizeProduct(raw: Record<string, unknown>, index: number): Product | null {
  const name = String(raw.name ?? raw.product_name ?? raw.title ?? raw.productName ?? "");
  if (!name) return null;
  const price = numberValue(raw.price ?? raw.current_price ?? raw.today_price ?? raw.average_price ?? raw.averagePrice);
  const change = numberValue(raw.change ?? raw.price_change ?? raw.change_percentage ?? raw.percentage ?? raw.changePercentage);
  const slug = String(raw.slug ?? slugify(name));
  const category = String(raw.category ?? raw.category_name ?? "অন্যান্য");
  const unit = String(raw.unit ?? raw.unit_name ?? "প্রতি কেজি");
  const emoji = String(raw.emoji ?? raw.icon ?? (category.includes("চাল") ? "🍚" : category.includes("মাছ") ? "🐟" : category.includes("মসলা") ? "🧄" : "🥬"));
  const marketsRaw = raw.markets ?? raw.market_prices ?? raw.bazars;
  const markets = Array.isArray(marketsRaw) ? marketsRaw.map((m, i) => {
    const item = m as Record<string, unknown>;
    return {name:String(item.name ?? item.bazar_name ?? `বাজার ${i+1}`),area:String(item.area ?? item.location ?? ""),price:numberValue(item.price ?? item.current_price),updated:String(item.updated ?? item.date ?? "আজ")};
  }) : [];
  return {id:String(raw.id ?? raw._id ?? slug ?? index),slug,name,emoji,category,unit,price,change,description:String(raw.description ?? raw.summary ?? `${name} এর সর্বশেষ বাজারদর এক নজরে দেখুন।`),minPrice:numberValue(raw.min_price ?? raw.minPrice) || price, maxPrice:numberValue(raw.max_price ?? raw.maxPrice) || price,averagePrice:numberValue(raw.average_price ?? raw.averagePrice) || price,markets};
}
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error("API unavailable");
    const json: unknown = await response.json();
    const root = json as Record<string, unknown>;
    const body = (root.data ?? root.products ?? root) as unknown;
    const items = Array.isArray(body) ? body : (body && typeof body === "object" ? Object.values(body as Record<string, unknown>).find(Array.isArray) : null);
    if (Array.isArray(items)) {
      const parsed = items.map((p, i) => normalizeProduct(p as Record<string, unknown>, i)).filter((p): p is Product => p !== null);
      if (parsed.length) return parsed;
    }
  } catch (error) {
    console.warn("BazarDor API unavailable; using local fallback data.", error instanceof Error ? error.message : "");
  }
  return defaults;
}
export const fallbackProducts = defaults;
export const formatBengali = (n: number) => Math.round(n).toLocaleString("bn-BD");
export const formatPrice = (n: number) => `${formatBengali(n)} টাকা`;
export const getChangeClass = (n: number) => n > 0 ? "up" : n < 0 ? "down" : "flat";
export const getChangeLabel = (n: number) => n > 0 ? `▲ ${Math.abs(n).toLocaleString("bn-BD",{maximumFractionDigits:1})}%` : n < 0 ? `▼ ${Math.abs(n).toLocaleString("bn-BD",{maximumFractionDigits:1})}%` : "— ০.০%";