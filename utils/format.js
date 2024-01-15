export const formatPriceToUSD = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0, // No muestra decimales
      maximumFractionDigits: 0,
    }).format(price);
  };