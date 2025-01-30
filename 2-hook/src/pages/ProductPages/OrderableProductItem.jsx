import ProductItem from "../../components/ProductItem"
import * as MyRouter from "../../lib/MyRouter"

const OrderableProductItem = ({product}) => {
  const navigate = MyRouter.useNavigate(); // ✅ useNavigate()는 컴포넌트 내부에서 호출해야 함

  const handleClick = () => {
    navigate(`/cart?productId=${product.id}`); // ✅ useNavigate()에서 반환된 함수 사용
  };

  return <ProductItem product={product} onClick = {handleClick} />
}

export default OrderableProductItem

