export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    console.log('Item:', item);
    const productPrice = item.productId.price || 0;
    console.log(`Calculating: ${productPrice} * ${item.quantity}`);
    return total + (productPrice * item.quantity);
  }, 0);
};
