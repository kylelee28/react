import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../components/Backdrop";
import Dialog from "../components/Dialog";
import { getComponentName } from "./utils";

export const layoutContext = React.createContext({});
layoutContext.displayName = "LayoutContext";

export const Layout = ({children}) =>{
  const [dialog, setDialog] = React.useState();


    return (
      <layoutContext.Provider value={{dialog, setDialog}}>
        {children}
      </layoutContext.Provider>
    );

}

export const useDialog = () => {
  const {dialog, setDialog} = React.useContext(layoutContext)

  const openDialog = (element) => {
    setDialog(element)
  }
  const closeDialog = () => {
    setDialog(null)
  }
  return {
    dialog, openDialog, closeDialog
  }
}

export const useLoading = () => {
  const {openDialog, closeDialog : finishLoading} = useDialog()
  const startLoading = (msg) => openDialog(<Dialog>{msg}</Dialog>)

  return{
    startLoading, finishLoading
  }

  
}
// export const useOpenDialog = () => {
//   const {setDialog} = React.useContext(layoutContext)
//   const openDialog = setDialog;
//   return openDialog
// }

// export const useCloseDialog = () => {
//   const {setDialog} = React.useContext(layoutContext)
//   const closeDialog = () => setDialog(null);
//   return closeDialog
// }

// export const useStartLoading = () => {
//   const {setDialog} = React.useContext(layoutContext)
//   const startLoading = (message) =>
//     setDialog(<Dialog>{message}</Dialog>)
//   return startLoading
// }


export const DialogContainer = () => {
  const {dialog} = useDialog()

    return (
      <>
        {(dialog) && ReactDOM.createPortal(
          <Backdrop>{dialog}</Backdrop>,
          document.querySelector("#dialog"))}
      </>
    )
}