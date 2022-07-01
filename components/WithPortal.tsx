import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface WithPortalProps {
  children: JSX.Element;
  target: string;
}

export default function WithPortal({ children, target }: WithPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [target]);

  //if component has been inserted into the dom - create a portal
  return mounted
    ? createPortal(children, document.getElementById(target)!)
    : null;
}
