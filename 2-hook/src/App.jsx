import CartPage from "./pages/CartPage"
import ProductPage from "./pages/ProductPages"
import OrderPage from "./pages/OrderPage"

import MyReact from "./lib/MyReact"
import React from "react"
import * as MyForm from "./lib/MyForm"

import * as MyRouter from "./lib/MyRouter"
import * as MyLayout from "./lib/MyLayout";

const App = () => (
     <MyLayout.Layout>
       <MyRouter.Router>
         <MyRouter.Routes>
           <MyRouter.Route path="/cart" element={<CartPage />} />
           <MyRouter.Route path="/order" element={<OrderPage />} />
           <MyRouter.Route path="/" element={<ProductPage />} />
         </MyRouter.Routes>
       </MyRouter.Router>
     </MyLayout.Layout>
 )
// export default App

const LoginForm = () => {
  const validate = values => {
    const errors = {
      email : "",
      password : ""
    }

    if(!values.email){
      errors.email = "이메일을 입력하세요."
    }
    if(!values.password){
      errors.password = "비밀번호를 입력하세요."
    }

    return errors
  }


const {values, touched, errors, handleChange, handleBlur, handleSubmit} = MyForm.useForm({
  initialValues : {email : "", password : ""}, validate, onSubmit : (values) => {
      console.log("Submitted", values) }
})
  
  return (
    <form noValidate onSubmit={handleSubmit}>
      <input type = "text" 
        name ="email" 
        placeholder="Email" autoFocus 
        value={values.email} 
        onChange={handleChange}
        onBlur = {handleBlur}/>
        {touched.email && errors.email && <span>{errors.email} </span> }

  <input type = "password" 
    name ="password" 
    placeholder="Password" 
    value={values.password} 
    onChange={handleChange}
    onBlur = {handleBlur}/>
      {touched.password && errors.password && <span>{errors.password}</span> }
      <button>Login</button>

     </form>
  )

  }

  
export default LoginForm


// export default () => {
//   const ref1 = MyReact.useRef(1)
//   const ref2 = MyReact.useRef(2)
  
//     const [state, setState] = React.useState(0)

//   if(state > 2) {
//     ref1.current = ref1.current + 1
//   }
  
//   return (
//     <>
//       <button onClick={() => setState(state + 1)}>state 증가 (state : {state})</button>
//       <div>{ref1.current}</div>
//       <input ref = {ref2}/>
//       <button onClick = {()=> console.log('input value', ref2.current.value)}>ref2 조회</button>
//     </>
//   )
// }


// const Counter = () => {
//   MyReact.resetCursor();
  
//   const [count, setCount] = React.useState(0)
//   const [name, setName] = React.useState(localStorage.getItem("name") || "")

//   const handleClick = () => setCount(count + 1)

//   const handleChangeName = e => setName(e.target.value);

//   MyReact.useEffect(()=>{
//     document.title = `count : ${count} | name : ${name}`;
//     console.log("effect1 cleansup")

//     return function cleanup(){
//       document.title = ""
//     }
//   }, [count, name])

//   MyReact.useEffect(()=>{
//     localStorage.setItem("name", name)
//     console.log("effect2")
//   }, [name])

//   MyReact.useEffect(() => {
//     setName(localStorage.getItem("name") || "")
//   }, [])
  
//   console.log("Counter rendered")
  
//   return <>
//     <button onClick={handleClick}>더하기</button>
//     <input value = {name} onChange = {handleChangeName} />
//     </>

// }

// export default () => {
//  const [mounted, setMounted] = React.useState(false)

//    const handleToggle = () => {
//      const nextMounted = !mounted
//      if(!nextMounted) MyReact.cleanupEffects();
//      setMounted(nextMounted)
//    }

//      return<>
//      <button onClick = {handleToggle}>컴포넌트 토글</button>
//        {mounted && <Counter />}
//      </>


// }

