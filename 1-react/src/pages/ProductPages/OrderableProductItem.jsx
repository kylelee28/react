import ProductItem from "../../components/ProductItem"

const OrderableProductItem = ({product}) => {
  const handleClick = () => {
    console.log("주문하기 클릭")
  }

  return <ProductItem product={product} onClick = {handleClick} />
}

export default OrderableProductItem