import Page from "../../components/Page"
import Title from "../../components/Title"
import PaymentButton from "./PaymentButton"
import ProductItem from "../../components/ProductItem"
import OrderForm from "./OrderForm"
import React from "react"
import ProductApi from 'shared/api/ProductApi'
import OrderApi from "shared/api/OrderApi"


import * as MyRouter from "../../lib/MyRouter"
import * as MyLayout from "../../lib/MyLayout"
import PaymentSuccessDialog from "./PaymentSuccessDialog"
import ErrorDialog from "../../components/ErrorDialog"

const CartPage = () => {
  const {openDialog, dialog, closeDialog} = MyLayout.useDialog()
  const {startLoading, finishLoading} = MyLayout.useLoading()

 
  // const closeDialog = MyLayout.useCloseDialog();
  // const navigate = MyRouter.useNavigate();

  const params = MyRouter.useParams();
   const productId = params.productId
  const [product, setProduct] = React.useState(null)

  const handleSubmit = async (values) => {
    startLoading("결제중...")

    try {
      await OrderApi.createOrder(values)
    } catch(e) {
      finishLoading()
      openDialog(<ErrorDialog/>)
      return;
    } 
    finishLoading()
    openDialog(<PaymentSuccessDialog/>)
    
  }
  const fetch = async (productId) => {
     startLoading("장바구니에 담는중...")
     try {
        const product = await ProductApi.fetchProduct(productId)
        setProduct(product)
     } catch(e){
       openDialog(<ErrorDialog/>)
       return;
     }
    finishLoading();
   }

  React.useEffect(() => {
    if(productId) fetch(productId);
  }, [productId])

  return (
    <div className="CartPage">
      <Page
        header={<Title backUrl="/">장바구니</Title>}
        footer={<PaymentButton />}
      >
        {product && (
        <ProductItem product={product} />
        )}


       <OrderForm onSubmit={handleSubmit}/>
        </Page>


    </div>
  )
}

 



export default CartPage