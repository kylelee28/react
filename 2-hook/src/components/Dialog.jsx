import React from "react";
import MyReact from "../lib/MyReact";

const Dialog = ({ header, children, footer }) => {
  // const footerRef = MyReact.useRef();

const ref = React.useCallback((node) => {

  if (!node) return;
    const buttons = Array.from(
      node.querySelectorAll("button")
    );

  if (buttons.length === 0) return;
  const activeButton = buttons[buttons.length - 1];
  activeButton.focus();
}, [])




  return (
    <div className="Dialog">
      {header && <header>{header}</header>}
      <main>{children}</main>
      {footer && <footer ref = {ref}>{footer}</footer>}
    </div>
  );
}


export default Dialog;