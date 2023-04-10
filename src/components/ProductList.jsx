import { ProductCard } from "./ProductCard";

export const ProductList = ({ loading, products, error }) => {
  if (loading) {
    return <>Loading...</>
  }

  if (error) {
    return 'Произошла ошибка 😅'
  }

  if (!products) {
    return null
  }

  console.log(products)
  const { allo, rozetka } = products;

  return <div className="flex">
    <div className="w-1/2 pr-3 my-5">
      <h2>Rozetka</h2>
      {rozetka.map((item, index) => <ProductCard key={index} {...item} />)}
    </div>
    <div className="w-1/2 pl-3 my-5">
      <h2>Allo</h2>
      {allo.map((item, index) => <ProductCard key={index} {...item} />)}
    </div>
  </div>
}
