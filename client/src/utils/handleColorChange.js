export default function handleColorChange(currentPrice, newPrice) {
    if (currentPrice < newPrice) {
        return "green"
    } else if (currentPrice > newPrice) {
        return "red"
    } else {
        return ""
    }
}