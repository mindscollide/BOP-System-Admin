import logo from "./logo.svg";
import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import { Header } from "./components/layout";
import { Sidebar2 } from "./components/layout";
import PropertyType from "./container/Admin/Setups/PropertyType/PropertyType";

function App() {
  return (
    <>
      <Sidebar2 />
      <Header />
      <PropertyType />
    </>
  );
}

export default App;
