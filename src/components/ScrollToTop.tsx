import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    //forces the window to scroll to the top-left corner
    window.scrollTo(0, 0);
  }, [pathname]); //

  return null;
};

export default ScrollToTop;