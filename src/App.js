// import logo from "./logo.svg";
import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
import { router } from "./routes/Routes";
import { RouterProvider } from "react-router-dom";
import { useEffect, useRef } from "react";

function App() {
  const currentVersion = useRef(null);
  // 🔹 Auto-update page when version.json changes
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await fetch("/version.json", { cache: "no-cache" }); // ✅ root path

        const data = await response.json();

        console.log(data, currentVersion.current, "version");

        if (currentVersion.current && currentVersion.current !== data.version) {
          // 🔹 Clear browser caches (for service workers / cache API)
          if ("caches" in window) {
            caches.keys().then((names) => {
              for (let name of names) {
                caches.delete(name);
              }
            });
          }
          window.location.reload(true); // force reload
        }

        currentVersion.current = data.version;
      } catch (err) {
        console.error("Error checking version.json:", err);
      }
    };

    checkVersion();
    const interval = setInterval(checkVersion, 30000); // check every 30 sec
    return () => clearInterval(interval);
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
