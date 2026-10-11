export default function Loading() {
  return (
    <div className="container section">
      <div className="loading-title" />
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton-image" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </div>
        ))}
      </div>
    </div>
  );
}
