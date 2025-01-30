//총결제금액:totalPrice
//결제방법:paymentMethod

//productPrice
//deliveryPrice
//discountPrice
import Card from "../../components/Card"

const OrderPaymentCard = (({order}) => {

  const {totalPrice, paymentMethod, productPrice, deliveryPrice, discountPrice} = order


  const data = [
    {"term" : "메뉴가격", "description": productPrice},
    {"term" : "배달료", "description" : deliveryPrice},
    {"term" : "할인 가격", "description" : discountPrice},

]

    return(
      <Card header = {
        <>
          {/* 총 결제 금액 : `${totalPrice}`<br/>결제 방법 : `${paymentMethod}` */}

     총 결제 금액 : {totalPrice.toLocaleString()} <br/>결제 방법 : {paymentMethod}

          
      </>} 
        
        data = {data}/>
    )
}

)

export default OrderPaymentCard