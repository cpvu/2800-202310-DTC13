export default function roundPrice(price) {
    let roundedPrice = price;

    if (price > 1) {
      roundedPrice = (Math.floor(price * 100) / 100).toFixed(2);
    }
    return roundedPrice;
}