//배달주소 서울특별시 송파구 잠실동 1번지
//전화번호 

import Card from "../../components/Card"


const OrderDeliveryCard = (({order}) => {
   
  const {deliveryAddress, deliveryContact, messageToShop, messageToRider} = order


  const data = [
    {"term"  : "배달주소", "description" : deliveryAddress},
    {"term" : "전화번호", "description" : deliveryContact},
    {"term" : "가게 사장님께", "description" : messageToShop},
    {"term" : "라이더님께", "description" :  messageToRider}
]
   
    return(
      
      <Card 
      data = {data}/>
    )
}
  
)

export default OrderDeliveryCard 