"use client";

export default function PriceTicker({ items = [] }) {
  if (!items.length) {
    return (
      <div className="price-ticker">
        <div className="container ticker-content">
          <span className="ticker-label">আজকের বাজারদর</span>
          <span>বাজারদরের তথ্য লোড হচ্ছে...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="price-ticker">
      <div className="container ticker-content">
        <span className="ticker-label">আজকের বাজারদর</span>

        <div className="ticker-items">
          {items.map((item, index) => (
            <span className="ticker-item" key={item.id ?? index}>
              <strong>{item.name ?? item.title ?? "পণ্য"}</strong>
              <span>
                {item.price != null ? `${item.price} টাকা` : "দর পাওয়া যায়নি"}
              </span>
              {item.unit ? <span> / {item.unit}</span> : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
