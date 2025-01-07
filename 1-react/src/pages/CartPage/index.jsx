import Page from "../../components/Page"
import Title from "../../components/Title"
import PaymentButton from "./PaymentButton"
import ProductItem from "../../components/ProductItem"
import OrderForm from "./OrderForm"
import React from "react"
import ProductApi from 'shared/api/ProductApi'


 class CartPage extends React.Component{
   constructor(props){
     super(props)
     this.state = {
       product : null
     }
   }

   async fetch(){
     try {
        const product = await ProductApi.fetchProduct("CACDA422")
        this.setState({product})
     } catch(e){
       console.error(e)
     }
   }

   componentDidMount(){
     this.fetch()

   }

   
   render(){
     const {product} = this.state
     
      return (
        <div className="CartPage">
          <Page
            header={<Title backUrl="/">장바구니</Title>}
            footer={<PaymentButton />}
          >
            {product && (
            <ProductItem product={product} />
            )}

        
           <OrderForm/>
            </Page>

          
        </div>
      )
   }

}



export default CartPage