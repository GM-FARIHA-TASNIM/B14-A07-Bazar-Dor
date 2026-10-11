const API_URL =
  process.env.BAZARDOR_API_URL ||
  "https://openapi.programming-hero.com/api/bazardor";

async function request(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`,
      );
    }

    const result = await response.json();

    if (result?.success === false) {
      throw new Error(
        result.message || "API returned an unsuccessful response",
      );
    }

    return result;
  } catch (error) {
    console.error(`Bazar-Dor API error (${endpoint}):`, error);
    return null;
  }
}

function getPayload(result) {
  let data = result;

  for (let i = 0; i < 3; i++) {
    if (data && !Array.isArray(data) && typeof data === "object") {
      if (data.data !== undefined) {
        data = data.data;
        continue;
      }
    }

    break;
  }

  return data;
}

function extractList(result, keys = []) {
  const data = getPayload(result);

  if (Array.isArray(data)) {
    return data;
  }

  if (!data || typeof data !== "object") {
    return [];
  }

  for (const key of keys) {
    if (Array.isArray(data[key])) {
      return data[key];
    }
  }

  return [];
}

function getImage(product) {
  const image =
    product.image ??
    product.imageUrl ??
    product.image_url ??
    product.thumbnail ??
    product.photo ??
    product.picture ??
    product.img ??
    product.images?.[0] ??
    "";

  if (typeof image === "string") {
    return image;
  }

  if (image && typeof image === "object") {
    return image.url ?? image.src ?? image.secure_url ?? "";
  }

  return "";
}

function getCategory(product) {
  const category =
    product.category ??
    product.categoryName ??
    product.category_name ??
    product.categoryId ??
    product.category_id ??
    "";

  if (typeof category === "object" && category !== null) {
    return (
      category.name ?? category.title ?? category.slug ?? category.id ?? ""
    );
  }

  return String(category);
}

export function normalizeProduct(product = {}) {
  const id =
    product.id ??
    product._id ??
    product.slug ??
    product.productId ??
    product.product_id ??
    "";

  const name =
    product.name ??
    product.title ??
    product.productName ??
    product.product_name ??
    "Unnamed product";

  const price = Number(
    product.price ??
      product.currentPrice ??
      product.current_price ??
      product.salePrice ??
      product.sale_price ??
      0,
  );

  const previousPrice = Number(
    product.previousPrice ??
      product.previous_price ??
      product.oldPrice ??
      product.old_price ??
      product.originalPrice ??
      product.original_price ??
      price,
  );

  return {
    ...product,
    id: String(id),
    slug: String(product.slug ?? id),
    name,
    image: getImage(product),
    price: Number.isFinite(price) ? price : 0,
    previousPrice: Number.isFinite(previousPrice) ? previousPrice : price,
    unit:
      product.unit ??
      product.unitName ??
      product.unit_name ??
      product.measurement ??
      "kg",
    category: getCategory(product),
    description:
      product.description ??
      product.details ??
      product.productDescription ??
      "",
    emoji: product.emoji ?? "🛒",
  };
}

export async function getProducts(category = "") {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";

  const result = await request(`/products${query}`);
  const products = extractList(result, [
    "products",
    "items",
    "results",
    "data",
  ]);

  return products.map(normalizeProduct);
}

export async function getProduct(slug) {
  if (!slug) {
    return null;
  }

  const result = await request(`/products/${encodeURIComponent(String(slug))}`);

  const data = getPayload(result);

  if (!data || typeof data !== "object") {
    return null;
  }

  const product = data.product ?? data.item ?? data.result ?? data;

  if (!product || typeof product !== "object" || Array.isArray(product)) {
    return null;
  }

  return normalizeProduct(product);
}

export async function getCategories() {
  const result = await request("/categories");
  const categories = extractList(result, ["categories", "items", "results"]);

  return categories.map((category) => {
    if (typeof category === "string") {
      return {
        id: category,
        slug: category,
        name: category,
      };
    }

    return {
      ...category,
      id: String(category.id ?? category._id ?? category.slug ?? ""),
      slug: String(category.slug ?? category.id ?? category._id ?? ""),
      name:
        category.name ??
        category.title ??
        category.categoryName ??
        category.category_name ??
        "Unnamed category",
    };
  });
}
