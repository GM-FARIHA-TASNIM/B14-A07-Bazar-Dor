export default function PriceTicker({ products = [] }) {
  if (!products.length) return null;

  const items = [...products, ...products];

  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((product, index) => {
          const rising = product.price >= product.previousPrice;

          return (
            <span className="ticker-item" key={`${product.id}-${index}`}>
              {product.emoji} {product.name}: ৳{product.price}/{product.unit}
              <span className={rising ? "up" : "down"}>
                {rising ? " ▲" : " ▼"}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
