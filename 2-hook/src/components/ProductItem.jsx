import Button from "./Button"

const ProductItem = ({product, onClick}) => {
console.log(product)
  const {name, price, thumbnail} = product

  return (
    <div className="ProductItem">
      <div className="description">
        <h2>{name}</h2>
        <div>{price.toLocaleString()}</div>

        {onClick && (
             <Button styleType={"brand"} onClick = {onClick}>주문하기</Button>
        )}
  
      </div>
      <div className="thumbnail">
        <img src={thumbnail} alt={`${name} ${price.toLocaleString()}원`} />
      </div>
    </div>
  )

  
}

export default ProductItem