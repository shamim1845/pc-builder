export const currencyFormat = (amount: number) => {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  })
    .format(amount)
    .slice(3);
  return price + "৳";
};
