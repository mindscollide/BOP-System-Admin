// import logo from "./logo.svg";
import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import "@fontsource/roboto";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { useMqtt } from "./context/MQTTContext";
import { Loader } from "./components/elements";

function App() {
  const { isConnected, lastMessages } = useMqtt();
  console.log(lastMessages, isConnected, "lastMessageslastMessages");
  console.log("App component rendered", isConnected);

  return (
    <>
      <Loader />
    </>
  );
}

export default App;
