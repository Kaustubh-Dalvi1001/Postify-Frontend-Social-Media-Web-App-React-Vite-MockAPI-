import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import MyRoutes from "./components/MyRoutes";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { useLocation } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/" || location.pathname === "/login";
  useEffect(() => {
    Aos.init({
      duration: 1000, //animation duration
      once: true, // whether animation should happen only once
    });
    Aos.refresh();
  }, [location.pathname]);
  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <SideBar />}
      <MyRoutes />
    </>
  );
}

export default App;
