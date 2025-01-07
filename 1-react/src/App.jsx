import ProductPage from './pages/ProductPages'
import OrderPage from './pages/OrderPage'
import CartPage from './pages/CartPage';
import createEventEmitter from 'shared/lib/EventEmitter';

// <ProductPage/>
// <OrderPage/>

// const App = () => (

//   <CartPage/>
// )
  
// export default App;

import MyReact from "./lib/MyReact"
import React from "react"

const countContext = MyReact.createContext({
  count : 0,
  setCount : () => {},
})

class CountProvider extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count : 0
    }
  }

  render(){
    const value = {
      count : this.state.count,
      setCount : nextValue => this.setState({
        count : nextValue
      })
    }
    return <countContext.Provider value = {value}>
      {this.props.children}
    </countContext.Provider>
  }
}

// const eventEmitter = createEventEmitter(0)
// const logger = value => console.log(value)

// eventEmitter.on(logger)
// console.log(eventEmitter.get())
// eventEmitter.set(1)

const Count = () => {
  return <countContext.Consumer>
    {(value) => <div>{value.count}</div>}
  </countContext.Consumer>
}

const PlusButton = () => {
  return (
    <countContext.Consumer>
      {(value) => (
      <button onClick = {()=> value.setCount(value.count + 1)}>+ 카운트 올리기</button>
      )}
    </countContext.Consumer>
  )
}

export default () => (
  <CountProvider>
  <Count/>
    <PlusButton/>
  </CountProvider>
)