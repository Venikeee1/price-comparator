export const ProductCard = ({ title = '--', price = '--' }) => {
  return <div className="my-3 p-4 border rounded-md">
    <h2 className="h:2.2">{title}</h2>
    <span>{price}</span>
  </div>
}
