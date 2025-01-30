import Page from "../../components/Page"
import ProductApi from 'shared/api/ProductApi'
import OrderableProductItem from "./OrderableProductItem"
import Navbar from "../../components/Navbar"
import React from "react"
import Title from "../../components/Title"
import FormControl from "../../components/FormControl"
import * as MyLayout from "../../lib/MyLayout"
import ErrorDialog from "../../components/ErrorDialog"


const ProductPage = () => {
  const {startLoading, finishLoading} = MyLayout.useLoading()
  const {openDialog, closeDialog} = MyLayout.useDialog();

  
  const [productList, setProductList] = React.useState([])

  const fetch = async () => {
    startLoading("메뉴 목록 로딩중");
    try{
      const productList = await ProductApi.fetchProductList() 
      setProductList(productList)
    } catch(e){

      openDialog(<ErrorDialog/>)
      return ; 
    }
    finishLoading();
  } 

  React.useEffect(()=> {
    fetch();
  }, [])
  console.log(productList)

  
  return (
    <div className="ProductPage">
      <Page header = {<Title>메뉴 목록</Title>} footer = {<Navbar/>}>
          <ul>
            {productList.map(product => (
              <li key = {product.id}>
                <OrderableProductItem product={product}/>
              </li>
            ))}

          </ul>

      </Page>

      </div>
  )
}
export default ProductPage