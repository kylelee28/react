import React from "react";
import {getComponentName} from './utils'

export const routerContext = React.createContext({});
routerContext.displayName = "RouterContext"


export const Router = ({children}) => {

  const [path, setpath] = React.useState(window.location.pathname)


  const changePath = (path) => {
    setpath(path)
    window.history.pushState({path}, "", path)
  }

  const handlePopstate = (event) => {
    const nextPath = event.state && event.state.path
    if(!nextPath) return;
    setpath(nextPath)
  }

    React.useEffect(()=> {
    window.addEventListener('popstate', handlePopstate)
    window.history.replaceState({path}, "")

      return () => {
        window.removeEventListener('popstate', handlePopstate)
      }
  }, [path])



    const contextValue = {
      path,
      changePath 
    }


    return <routerContext.Provider value = {contextValue}>
      {children}
    </routerContext.Provider>
  }

export const Routes = ({children}) => {
  const {path} = React.useContext(routerContext)

  let selectedRoute = null
  React.Children.map(children, child => {

        // 리액트 엘리먼트인지 검사한다
          if (!React.isValidElement(child)) return

          // 프레그먼트인지 검사한다
          if (child.type === React.Fragment) return

          // Route 컴포넌트인지 검사한다. 덕 타이핑
          if (!child.props.path || !child.props.element) return

          // Route에 등록된 컴포넌트가 요청한 경로에 해당하는지 검사한다.
          // 요청 경로에서 쿼리 문자열을 제거하고 비교한다.
          if (child.props.path !== path.replace(/\?.*$/, "")) return

          // 엘리먼트를 찾았다.
          selectedRoute = child.props.element
        })

       return selectedRoute

};


export const Route = () => null


export const Link = ({to, ...rest})=> {

  const {path, changePath} = React.useContext(routerContext)

    const handleClick = (e) => {
      e.preventDefault();
      if (to !== path) changePath(to)
    }
    return <a {...rest} href = {to} onClick={handleClick}/>

}

export const useNavigate = () => {
  const {path, changePath} = React.useContext(routerContext)
  const navigate = (nextPath) => {
    if(path !== nextPath) changePath(nextPath)
  }
  return navigate 
}

export const useMatch = () => {

  const {path} = React.useContext(routerContext)
  const match = comparedPath => (path === comparedPath) 
  
  return match;
}

export const useParams = () => {
  // TODO : useMemo 사용해야
    const {path} = React.useContext(routerContext)
    const params = new URLSearchParams(window.location.search)
    const paramsObject = {};
    for (const [key, value] of params){
      paramsObject[key] = value;
    }
    return paramsObject

}


// export const withRouter = WrappedComponent => {

//   const WithRouter = props => (

//     <routerContext.Consumer>
//       {({ path, changePath }) => {

//       const navigate = nextPath => {
//         if(path !== nextPath) changePath(nextPath)
//       }

//       const match = comparedPath => {
//         return path === comparedPath
//       }

//       const params = () => {
//         const params = new URLSearchParams(window.location.search)
//         const paramsObject = {};
//         for (const [key, value] of params){
//           paramsObject[key] = value;
//         }
//         return paramsObject
//       }
//       const enhancedProps = {
//         navigate,
//         match,
//         params
//       }

//         return <WrappedComponent {...props} {...enhancedProps}/>
//       }

//       }
//     </routerContext.Consumer>
//   )
//   WithRouter.displayName = `WithRouter${getComponentName(WrappedComponent)}`

//   return WithRouter
// }


