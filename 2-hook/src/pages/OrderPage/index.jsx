import Navbar from "../../components/Navbar"
import Page from "../../components/Page"
import Title from "../../components/Title"
import OrderApi from 'shared/api/OrderApi'
import React from "react"
import OrderDeliveryCard from "./OrderDeliveryCard"
import OrderPaymentCard from "./OrderPaymentCard"
import OrderStatusCard from "./OrderStatusCard"
import * as MyLayout from "../../lib/MyLayout"
import ErrorDialog from "../../components/ErrorDialog"

const OrderPage = () => {

  const [order, setOrder] = React.useState();
    const {openDialog} = MyLayout.useDialog();
    const {startLoading, finishLoading} = MyLayout.useLoading();
    
  const fetch = async () => {
      startLoading("주문 정보 로딩중")
        try {
            const order = await OrderApi.fetchMyOrder()
            setOrder(order)
        } catch(e){
            openDialog(<ErrorDialog/>)
            //gpt에게 질문
            return;
        }
        finishLoading();
      
    }
    React.useEffect(() => {
        fetch()
    }, [])

    return (
         <div className="OrderPage">
            <Page header = {<Title>주문내역</Title>} footer={<Navbar/>}> 


                    {order && (
              <>
                     <OrderStatusCard order= {order}/> <OrderPaymentCard order= {order}/> <OrderDeliveryCard order = {order}/>
              </>
                    )}
              </Page>
          </div>
    )
}



export default OrderPage