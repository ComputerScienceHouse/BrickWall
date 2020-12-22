export const formatMoney = (moneyValue: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0,
    //maximumFractionDigits: 0,
  }).format(moneyValue);
